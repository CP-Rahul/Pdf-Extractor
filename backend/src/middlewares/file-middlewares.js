const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { FileService} = require('../services');

function validateCreateFileRequest(req, res, next) {
    if(!req.body.fileName) {
        ErrorResponse.msg = 'Something went wrong';
        ErrorResponse.error = new AppError('file name is not found in the request body', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.file.filename) {
        ErrorResponse.msg = 'Something went wrong';
        ErrorResponse.error = new AppError('path is not found in the request body', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

function validateMergeRequest(req, res, next) {
    if(!req.body.pdf) {
        ErrorResponse.msg = 'Something went wrong';
        ErrorResponse.error = new AppError('pdf is not found in the request body', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.file.filename) {
        ErrorResponse.msg = 'Something went wrong';
        ErrorResponse.error = new AppError('file name is not found in the request body', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.file.pages) {
        ErrorResponse.msg = 'Something went wrong';
        ErrorResponse.error = new AppError('pages is not found in the request body', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateFileRequest,
    validateMergeRequest
}