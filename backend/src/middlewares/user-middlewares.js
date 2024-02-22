const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateAuthenticationRequest(req, res, next) {
    if(!req.body.email) {
        ErrorResponse.msg = 'Something went wrong';
        ErrorResponse.error = new AppError('email is not found in the request body', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.password) {
        ErrorResponse.msg = 'Something went wrong';
        ErrorResponse.error = new AppError('password is not found in the request body', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateAuthenticationRequest
}