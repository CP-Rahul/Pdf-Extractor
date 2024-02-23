const express = require('express');

const { FileController } = require('../../controllers');
const { UploadMiddlewares, UserMiddlewares, FileMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', 
      UserMiddlewares.checkAuth,
      FileMiddlewares.validateCreateFileRequest,
      UploadMiddlewares.uploadFiles.single('file'),
      FileController.createFile);

router.get('/',
      UserMiddlewares.checkAuth,
      FileController.getFiles);

router.post('/merge',
      UserMiddlewares.checkAuth,
      FileMiddlewares.validateMergeRequest,
      FileController.mergeFile);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
module.exports = router;