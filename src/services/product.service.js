const { productModel } = require('../models');
const { validateId } = require('./validations/validationsInputValues');

const findProduct = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);

  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const findAllProducts = async () => {
  const products = await productModel.findAll();
  if (products) return { type: null, message: products };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findProduct,
  findAllProducts,
};