const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');

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

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response) {
            req.user = response;
            next();
        }
    } catch (error) {
        ErrorResponse.error= new AppError(error.explanation, StatusCodes.BAD_REQUEST);
        return res
                .status(error.statusCode)
                .json(ErrorResponse); 
    }
}

module.exports = {
    validateAuthenticationRequest,
    checkAuth
}