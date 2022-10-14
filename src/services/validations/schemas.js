const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const nameSchema = Joi.string().min(5).max(30).required();
const quantitySchema = Joi.number().integer().greater(0).required();

module.exports = {
  idSchema,
  nameSchema,
  quantitySchema,
};