const { StatusCodes } = require('http-status-codes');
const { FileService } = require('../services');
const { SucessResponse, ErrorResponse} = require('../utils/common');

async function createFile(req, res) {
    try {
        const file = await FileService.createFile({
            fileName: req.body.fileName,
            path: req.file.filename,
            userId: req.body.userId
        });
        SucessResponse.data = file;
        return res
                .status(StatusCodes.CREATED)
                .json(SucessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getFiles(req, res) {
    try {
        const files = await FileService.getFiles({
            userId: req.body.userId
        });
        SucessResponse.data = files;
        return res
                .status(StatusCodes.OK)
                .json(SucessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function mergeFile(req, res) {
    try {
        const file = await FileService.mergeFile({
            pdf: req.body.pdf,
            pages: req.body.pages,
            fileName: req.body.fileName,
            userId: req.body.userId,
        })
    SucessResponse.data = file;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


module.exports = {
    createFile,
    getFiles,
    mergeFile
}