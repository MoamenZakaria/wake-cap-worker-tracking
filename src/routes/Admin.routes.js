import express from 'express';
import * as schemas from '../validators';
import * as adminController from '../controllers/Admin.controller';
import { validateRequest } from '../utils/Request.utils';

const router = express.Router();

const adminRouteBase = '/admin';

router.get(
    `${adminRouteBase}/:adminID/report`,
    schemas.getSiteReportByAdminIDSchema,
    validateRequest,
    adminController.getSiteReportByAdminID
);

module.exports = router;
