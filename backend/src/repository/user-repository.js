const CrudRepository = require('./crud-repository');
const { User } = require('../models');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }
    async getUserByEmail(email) {
        try {
            const response = await User.findOne({
                where: {
                    email: email
                }
            });
            return response;
        } catch (error) {
            
        }
    }
}

module.exports = UserRepository;