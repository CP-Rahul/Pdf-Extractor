const express = require('express');

const { FileController } = require('../../controllers');
const { UploadMiddlewares, UserMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', 
      UserMiddlewares.checkAuth,
      UploadMiddlewares.uploadFiles.single('file'),
      FileController.createFile);

router.get('/',
      UserMiddlewares.checkAuth,
      FileController.getFiles);

router.post('/merge',
      UserMiddlewares.checkAuth,
      FileController.mergeFile);

module.exports = router;