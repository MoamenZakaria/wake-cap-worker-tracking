import { configure, getLogger } from 'log4js';
import config from 'config';

const loggingConfig = config.get('logging');

configure({
    appenders: {
        console: { type: 'stdout', layout: { type: 'colored' } },
        dateFile: {
            type: 'dateFile',
            filename: `${loggingConfig.logDir}/${loggingConfig.logFile}`,
            layout: { type: 'basic' },
            compress: true,
            daysToKeep: 14,
            keepFileExt: true,
        },
    },
    categories: {
        default: {
            appenders: ['console', 'dateFile'],
            level: loggingConfig.logLevel,
        },
    },
});
const logger = getLogger();

export default logger;
