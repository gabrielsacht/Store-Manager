const express = require('express');
const productController = require('../controllers/product.controller');
const validateProductId = require('../middlewares/validateProductId');

const router = express.Router();

router.get('/',
  productController.listProducts);

router.get('/:id',
  validateProductId,
  productController.getProduct);

module.exports = router;