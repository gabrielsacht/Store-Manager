const express = require('express');
const productController = require('../controllers/product.controller');
const { validateProductId, validateProductName } = require('../middlewares');

const router = express.Router();

router.get('/',
  productController.listProducts);

router.get('/:id',
  validateProductId,
  productController.getProduct);

router.post('/',
  validateProductName,
  productController.createProduct);

module.exports = router;