const express = require('express');
const { saleController } = require('../controllers');
const { validateProducts, validateProductExist, validateQuantity } = require('../middlewares');

const router = express.Router();

router.post('/',
  validateProducts,
  validateProductExist,
  validateQuantity,
  saleController.createSale);

module.exports = router;