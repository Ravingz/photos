const express = require('express');
const router = express.Router();
const { getAllImages, create, update, remove } = require('../controller/image');

router.get('/', getAllImages);
router.post('/', create);
router.put('/:imageid', update);
router.delete('/:imageid', remove);

module.exports = router;