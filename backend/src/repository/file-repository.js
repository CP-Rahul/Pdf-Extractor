const CrudRepository = require('./crud-repository');
const { File } = require('../models');

class FileRepository extends CrudRepository {
    constructor() {
        super(File); // calls the constructor of CrudRepo
    }
}

module.exports = FileRepository;
