import config from 'config';
import adminRouter from './Admin.routes';

const apiConfig = config.get('api');

const contextPath = `/api/${apiConfig.version}`;
const gatheringApiRoutes = (app) => {
    app.use(contextPath, adminRouter);
};
module.exports = gatheringApiRoutes;
