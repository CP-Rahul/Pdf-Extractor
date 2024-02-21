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

module.exports = {
    createFile
}