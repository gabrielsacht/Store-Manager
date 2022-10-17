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

router.put('/:id', validateProductName, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;