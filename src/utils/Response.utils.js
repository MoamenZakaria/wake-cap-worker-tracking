/**
 * @param params
 * @returns {any | Promise<any>}
 */
import _ from 'lodash';
import { NoDataFoundError } from '../errros';

const createResponse = (params) => {
    console.log(params);
    const { response, code, message, data = {}, success } = params;

    const res = {
        success,
        message,
        data,
        error: _.get(params, 'error.message', {}),
    };
    return response.status(code).json(res);
};

/**
 *
 * @param response
 * @param message
 * @param data
 * @param code
 * @returns {any|Promise<any>}
 */
const createSuccessResponse = (
    response,
    message = 'Success',
    data = {},
    code = 200
) =>
    createResponse({
        response,
        code,
        success: true,
        message,
        data,
    });

/**
 *
 * @param request
 * @param response
 * @param message
 * @param error
 * @param code
 * @returns {any|Promise<any>}
 */
const createErrorResponse = (
    request,
    response,
    message = 'Server Internal Error',
    error = {},
    code = 500
) => {
    if (error instanceof NoDataFoundError)
        return createResponse({
            response,
            code: 404,
            success: false,
            message,
            error,
        });
    return createResponse({
        response,
        code,
        success: false,
        message,
        error,
    });
};

/**
 *
 * @param request
 * @param response
 * @param error
 * @param message
 * @param code
 * @returns {any|Promise<any>}
 */
const createInvalidParameterResponse = (
    request,
    response,
    error = {},
    message = 'Validation Error',
    code = 400
) => {
    request.log.error({ err: error }, message);

    return createResponse({
        response,
        code,
        success: false,
        message,
        error,
    });
};

module.exports = {
    createResponse,
    createInvalidParameterResponse,
    createSuccessResponse,
    createErrorResponse,
};
