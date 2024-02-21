const express = require('express');

const { FileController } = require('../../controllers');
const { UploadMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', 
      UploadMiddlewares.uploadFiles.single('file'),
      FileController.createFile);

module.exports = router;