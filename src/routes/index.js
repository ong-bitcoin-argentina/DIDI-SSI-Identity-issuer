const express = require('express');

const vusRoutes = require('./vusRoutes');

const router = new express.Router();

router.use('/vuSecurity', vusRoutes);

module.exports = router;
