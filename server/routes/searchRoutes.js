const express = require('express');
const router = express.Router();
const { searchReservationOptions } = require('../controllers/searchController');

router.post('/search', searchReservationOptions);

module.exports = router;
