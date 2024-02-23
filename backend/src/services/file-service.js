const { StatusCodes } = require('http-status-codes');
const { FileRepository } = require('../repository');
const AppError = require('../utils/errors/app-error');
const { Merger } = require('../utils/common');

const fileRepository = new FileRepository();

async function createFile(data) {
    try {
        const file = await fileRepository.create(data);
        return file;
    } catch (error) {
        throw new AppError('Cannot create the new file', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFiles(data) {
    try {
        const files = await fileRepository.getFilesByUserId(data.userId);
        return files;
    } catch (error) {
        if(error instanceof AppError) {
            throw error;
        }
        throw new AppError('Cannot get all the files', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function mergeFile(data) {
    try {
        await Merger.mergePdf(data.pdf, data.pages, data.fileName);
        const file = await fileRepository.create({fileName: data.fileName, path: `${data.fileName}.pdf`, userId: data.userId});
        return file;
    } catch (error) {
        console.log(error)
        throw new AppError('Something went wrong while merging', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createFile,
    getFiles,
    mergeFile
}