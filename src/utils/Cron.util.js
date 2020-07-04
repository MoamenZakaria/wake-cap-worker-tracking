import { CronosTask, CronosExpression, scheduleTask } from 'cronosjs';
import _ from 'lodash';
import logger from './Logger.util';

/**
 * schedule Task By Midnight every day based on passed timezone
 * @param site
 * @param taskCallback
 */
const scheduleTaskByMidnight = (site, taskCallback) => {
    const { timezone, name: siteName } = site;
    if (_.isEmpty(timezone)) throw Error('invalid timezone for cron Job');

    const expression = CronosExpression.parse('0 0 * * *', {
        timezone,
    });
    const cronTask = new CronosTask(expression);

    cronTask.on('started', () => logger.info(`cronjob started ${siteName}`));
    cronTask.on('stopped', () =>
        logger.info(`cronjob for ${siteName} is completed`)
    );
    cronTask.on('run', () => {
        logger.info(`cronjob is running ${siteName}`);
        taskCallback(site.admin.id);
    });
    cronTask.start();
};

module.exports = {
    scheduleTaskByMidnight,
};
