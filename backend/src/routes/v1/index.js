const express = require('express');

const fileRoutes = require('./file-routes');
const userRoutes = require('./user-routes');

const router = express.Router();

router.use('/file', fileRoutes);
router.use('/user', userRoutes);

module.exports = router;