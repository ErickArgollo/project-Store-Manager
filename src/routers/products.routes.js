const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/search', productsController.getQueryProducts);
router.get('/:id', productsController.getProduct);
router.get('/', productsController.getAllProducts);
router.post('/', productsController.insertNewProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;