const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repository');
const AppError = require('../utils/errors/app-error');
const { Auth } = require('../utils/common');

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

async function signIn(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if(!user) {
            throw new AppError('User not exists', StatusCodes.BAD_REQUEST);
        }
        const passwordMatch = Auth.comparePassword(data.password, user.password);
        if(!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwtToken = Auth.generateToken({
            id: user.id,
            email: user.email
        })
        return jwtToken;
    } catch (error) {
        if(error instanceof AppError)  throw error;
       throw new AppError('Cannot signin', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError('Cannot find the token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        if(!user) {
            throw new AppError('User not found', StatusCodes.BAD_REQUEST); 
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invelid token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError'){
            throw new AppError('Token expired', StatusCodes.BAD_REQUEST);
        }
       throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    signUp,
    signIn,
    isAuthenticated
}