import { param } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const getSiteReportByAdminIDSchema = [
    param('adminID')
        .notEmpty()
        .withMessage('admin ID param should not be empty '),
];

// module.exports = {
//     getSiteReportByAdminIDSchema,
// };
