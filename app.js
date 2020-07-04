import express from 'express';
import bodyParser from 'body-parser';
import log4js from 'log4js';
import config from 'config';
import logger from './src/utils/Logger.util';
import initMongoConnection from './src/utils/MongoConnectionManager.utils';
import gatheringApiRoutes from './src/routes';
import * as adminService from './src/service/Admin.service';

const appConfig = config.get('app');
const app = express();

initMongoConnection(app);

// middle wares
app.use(
    log4js.connectLogger(logger, {
        level: 'info',
        format: (req, res, format) =>
            format(`:remote-addr :method :url ${JSON.stringify(req.body)}`),
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = appConfig.port;

app.on('ready', () => {
    app.listen(PORT, () => {
        logger.info(`Server started at http://localhost:${PORT}`);
    });
    adminService.initReportsCronJobs();
});

gatheringApiRoutes(app);
app.use('/', (req, res) => {
    res.json({ name: 'Wake Cap Worker Tracking System' });
});
