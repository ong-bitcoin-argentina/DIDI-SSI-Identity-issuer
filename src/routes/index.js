const express = require('express');

const vusRoutes = require('./vusRoutes');
const userRoutes = require('./userRoutes');

const router = new express.Router();

router.use('/vuSecurity', vusRoutes);
router.use('/vuSecurity', userRoutes);

module.exports = router;
