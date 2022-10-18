const express = require('express');
const { saleController } = require('../controllers');
const { validateProducts, validateProductExist, validateQuantity,
  validateSaleExist } = require('../middlewares');

const router = express.Router();

router.post('/',
  validateProducts,
  validateProductExist,
  validateQuantity,
  saleController.createSale);

router.put('/:id',
  validateProducts,
  validateProductExist,
  validateQuantity,
  validateSaleExist,
  saleController.updateSale);

router.get('/:id', validateSaleExist, saleController.findSale);
router.get('/', saleController.findAllSales);
router.delete('/:id', saleController.deleteSale);

module.exports = router;