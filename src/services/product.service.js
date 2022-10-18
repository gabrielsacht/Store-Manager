const { productModel } = require('../models');
const { validateId, validateName } = require('./validations/validationsInputValues');

const findProduct = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);

  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const findProductByQuery = async (query) => {
  const products = await productModel.findBySearch(query);
  return { type: null, message: products };
};

const findAllProducts = async () => {
  const products = await productModel.findAll();
  if (products) return { type: null, message: products };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insertProduct = async (name) => {
  const error = validateName(name);
  if (error.type) return error;

  const newProductId = await productModel.insert(name);
  const newProduct = await productModel.findById(newProductId);
  
  return { type: null, message: newProduct };
};

const updateProduct = async (id, nameToUpdate) => {
  const error = validateName(nameToUpdate);
  if (error.type) return error;

  const product = await productModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.update(id, nameToUpdate);

  const productUpdated = await productModel.findById(id);
  return { type: null, message: productUpdated };
};

const deleteProduct = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.erase(id);

  return { type: null, message: '' };
};

module.exports = {
  findProduct,
  findAllProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  findProductByQuery,
};