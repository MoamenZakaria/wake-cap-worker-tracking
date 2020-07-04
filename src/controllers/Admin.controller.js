import * as adminService from '../service/Admin.service';
import {
    createErrorResponse,
    createSuccessResponse,
} from '../utils/Response.utils';
import logger from '../utils/Logger.util';

const getSiteReportByAdminID = async (req, res) => {
    const { adminID } = req.params;
    try {
        const { siteMetaData, reportData } = await adminService.fetchReportData(
            adminID
        );
        return createSuccessResponse(
            res,
            `site workers data fetched successfully`,
            {
                siteMetaData,
                reportData,
            }
        );
    } catch (error) {
        logger.error(error);
        return createErrorResponse(
            req,
            res,
            `something went wrong while fetching site worker data!`,
            error
        );
    }
};

module.exports = {
    getSiteReportByAdminID,
};
