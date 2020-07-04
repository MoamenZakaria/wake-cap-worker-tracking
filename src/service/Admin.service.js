import ExcelJS from 'exceljs';
import mongoose from 'mongoose';
import _ from 'lodash';
import moment from 'moment';
import config from 'config';
import * as models from '../models';
import { NoDataFoundError, ServiceError } from '../errros';
import logger from '../utils/Logger.util';
import { scheduleTaskByMidnight } from '../utils/Cron.util';

const { ObjectId } = mongoose.Types;
const { Site } = models;

const reportConfig = config.get('reports');

/**
 * get all admin for all sites
 * @returns {Promise<any>}
 */
const findAllSites = async () => {
    try {
        return await Site.find({});
    } catch (err) {
        throw new ServiceError(
            err,
            'something went wrong while retrieving sites'
        );
    }
};

/**
 * map seconds to hours in report data
 * @param workerActivity  workerActivity data
 * @returns {*} workerActivity after mapping total activity seconds to hours
 */
const mapSecondsToHours = (workerActivity) => {
    // eslint-disable-next-line no-param-reassign
    workerActivity.totalActiveHours = workerActivity.totalActiveSec / 60 / 60;
    // eslint-disable-next-line no-param-reassign
    workerActivity.totalInActiveHours =
        workerActivity.totalInActiveSec / 60 / 60;
    return workerActivity;
};

/**
 * fetch data related workers activity in specific site by admin id
 * @param adminId
 * @returns {Promise<{reportData: any, siteMetaData: {adminName: string, timezone: ({type: StringConstructor, required: [boolean, string]}|{type: StringConstructor | String, required: [boolean, string]}|string), name: *, adminEmail}}>}
 */
const fetchReportData = async (adminId) => {
    const site = await Site.findOne({ 'admin._id': adminId });
    if (_.isEmpty(site)) {
        throw new NoDataFoundError(
            `No sites linked to admin with ID :   ${adminId}`
        );
    }
    if (_.isEmpty(site.workers)) {
        throw new NoDataFoundError(
            `No workers found for site name :   ${site.name}`
        );
    }
    const siteMetaData = {
        name: site.name,
        timezone: site.timezone,
        adminName: site.admin.name,
        adminEmail: site.admin.email,
    };
    const aggregations = [
        { $match: { 'admin._id': new ObjectId(adminId) } },
        {
            $lookup: {
                from: 'workers',
                localField: 'workers',
                foreignField: '_id',
                as: 'workers',
            },
        },
        { $unwind: '$workers' },
        {
            $unwind: {
                path: '$workers.dailyActivity',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: '$workers._id',
                totalActiveSec: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$workers.dailyActivity.isActive', true],
                            },
                            '$workers.dailyActivity.duration',
                            0,
                        ],
                    },
                },
                totalInActiveSec: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$workers.dailyActivity.isActive', false],
                            },
                            '$workers.dailyActivity.duration',
                            0,
                        ],
                    },
                },
                isAbsent: {
                    $first: '$workers.attendance.isAbsent',
                },
                isLate: {
                    $first: '$workers.attendance.isLate',
                },
                name: {
                    $first: '$workers.name',
                },
            },
        },
    ];

    try {
        const reportData = await Site.aggregate(aggregations);
        const processedReportData = reportData.map((workerData) =>
            mapSecondsToHours(workerData)
        );
        return {
            siteMetaData,
            reportData: processedReportData,
        };
    } catch (err) {
        throw new ServiceError(
            `something went wrong while fetching data for site related to admin ${adminId}`,
            err
        );
    }
};

/**
 *
 * @param siteMetaData
 * @param reportData
 * @returns {Promise<void>}
 */
const generateExcelReport = async ({ siteMetaData, reportData }) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Worker Summary Sheet');
        sheet.columns = [
            {
                header: 'worker_name',
                key: 'name',
                width: 32,
            },
            {
                header: 'is Absent',
                key: 'isAbsent',
                width: 32,
            },
            {
                header: 'is Late',
                key: 'isLate',
                width: 32,
            },
            {
                header: 'total Active Hours',
                key: 'totalActiveHours',
                width: 32,
            },
            {
                header: 'total InActive Hours',
                key: 'totalInActiveHours',
                width: 32,
            },
        ];

        reportData.forEach((worker) => {
            sheet.addRow(worker, 'i');
        });

        const workBookName = `${siteMetaData.name}_${moment().format(
            'D-MM-YY'
        )}_${siteMetaData.timezone}.xlsx`;

        await workbook.xlsx.writeFile(`${reportConfig.path}/${workBookName}`);

        logger.info(
            `report ${workBookName} generated successfully for site ${siteMetaData.name}`
        );
    } catch (err) {
        throw new ServiceError(
            `Something went wrong while generating worker summary report for site ${siteMetaData.name}`,
            err
        );
    }
};

/**
 * cron task logic
 * @param adminId  site admin id
 * @returns {Promise<void>}
 */
const reportTaskCallback = async (adminId) => {
    logger.info(`Starting generating report for adminID ${adminId}`);
    const { siteMetaData, reportData } = await fetchReportData(adminId);
    await generateExcelReport({
        siteMetaData,
        reportData,
    });
};

/**
 * init the cron task for all admin in the system
 * @returns {Promise<void>}
 */
const initReportsCronJobs = async () => {
    const sites = await findAllSites();
    if (_.isEmpty(sites)) {
        throw new NoDataFoundError('no sites found in the system');
    }

    sites.forEach((site) => {
        // reportTaskCallback(site.admin.id);
        scheduleTaskByMidnight(site, reportTaskCallback);
    });
};

module.exports = {
    fetchReportData,
    generateExcelReport,
    initReportsCronJobs,
    findAllSites,
};
