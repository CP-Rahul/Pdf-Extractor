const express = require('express');

const { FileController } = require('../../controllers');

const router = express.Router();

router.post('/', 
        FileController.createFile);

module.exports = router;