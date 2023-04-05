const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/:id', salesController.getSale);
router.get('/', salesController.getAllSales);
router.post('/', salesController.insertNewSales);
router.delete('/:id', salesController.deleteSale);
router.put('/:id', salesController.updateSale);

module.exports = router;