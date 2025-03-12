const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.post('/', controller.create);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;