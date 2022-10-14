const { idSchema, nameSchema, quantitySchema } = require('./schemas');
const { productModel } = require('../../models');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateQuantity = (quantity) => {
  const { error } = quantitySchema.validate(quantity);
  if (error) return false; 
  return true;
};

const validadeProduct = async (productId) => {
  const result = await productModel.findById(productId);
  if (!result) return false;
  return true;
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) {
 return {
    type: 'INVALID_NAME', message: '"name" length must be at least 5 characters long',
  }; 
}

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
  validadeProduct,
  validateQuantity,
};