const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { SucessResponse, ErrorResponse} = require('../utils/common');

async function signUp(req, res) {
    try {
        const user= await UserService.signUp({
            email: req.body.email,
            password: req.body.password
        });
        SucessResponse.data = user;
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

async function signIn(req, res) {
    try {
        const user= await UserService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        SucessResponse.data = user;
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

module.exports = {
    signUp,
    signIn
}
