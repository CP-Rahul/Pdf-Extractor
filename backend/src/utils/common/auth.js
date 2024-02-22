const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../../config');

function comparePassword(password, encryptedpassword) {
    try {
        const match = bcrypt.compareSync(password, encryptedpassword);
        return match;
    } catch (error) {
        throw error;
    }
}

function generateToken(data)  {
    try {
        const token = jwt.sign(data, ServerConfig.JWTSECRET, { expiresIn: ServerConfig.JWTEXPIRY });
        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    comparePassword,
    generateToken
}