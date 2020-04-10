const express = require('express');
const router = express.Router();
const { restaurantImages } = require('../controller/image');

router.get('/:id/images', restaurantImages)

module.exports = router;