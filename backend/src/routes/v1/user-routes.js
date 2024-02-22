const express = require('express');

const { UserController } = require('../../controllers');
const { UserMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/signup', 
      UserMiddlewares.validateAuthenticationRequest,
      UserController.signUp);

module.exports = router;