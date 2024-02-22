const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repository');
const AppError = require('../utils/errors/app-error');

const userRepository = new UserRepository();

async function signUp(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    signUp
}