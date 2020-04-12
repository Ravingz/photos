const express = require('express');
const router = express.Router();
const { getRestaurantsAll, getRestaurant, getRestaurantImages, create, update, remove } = require('../controller/restaurant');

router.get('/', getRestaurantsAll);
router.get('/restaurantid', getRestaurant);
router.get('/:restaurantid/images', getRestaurantImages);
router.post('/', create);
router.put('/:restaurantid', update);
router.delete('/:restaurantid', remove);

module.exports = router;