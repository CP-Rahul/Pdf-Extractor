const CrudRepository = require('./crud-repository');
const { File } = require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class FileRepository extends CrudRepository {
    constructor() {
        super(File); // calls the constructor of CrudRepo
    }
    async getFilesByUserId(id) {
        try {
            const response = await File.findAll({
                where: {
                    userId: id
                }
            });
            if(!response) {
                throw new AppError('No files found', StatusCodes.NOT_FOUND);
            }
            return response;
        } catch (error) {
            throw error
        }
    }
}

module.exports = FileRepository;
