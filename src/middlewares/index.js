const validateProductId = require('./validateProductId');
const validateProductName = require('./validateProductName');
const validateProducts = require('./validateProducts');
const validateProductExist = require('./validateProductExist');
const validateQuantity = require('./validateQuantity');
const validateSaleExist = require('./validateSaleExist');

module.exports = {
  validateProductId,
  validateProductName,
  validateProducts,
  validateProductExist,
  validateQuantity,
  validateSaleExist,
};