const express = require('express');

const vusRoutes = require('./vusRoutes');

const router = new express.Router();

router.use('', vusRoutes);

module.exports = router;
