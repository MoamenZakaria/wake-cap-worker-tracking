import { validationResult } from 'express-validator';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({ errors: extractedErrors });
};

const handlerError = (response, errorObject = null) => {
    return response
        .status(500)
        .json(errorObject || { error: 'something went wrong' });
};

module.exports = {
    handlerError,
    validateRequest,
};
