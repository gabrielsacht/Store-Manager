const { idSchema, nameSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) return { type: 'INVALID_VALUE', message: '"name" must be a string and max 30 char' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
};