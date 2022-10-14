const { validateQuantity } = require('../services/validations/validationsInputValues');

module.exports = async (req, res, next) => {
  const sales = req.body;
  const quantity = sales.every((sale) => Object.keys(sale).includes('quantity'));
  const validQuantity = sales.every((sale) => validateQuantity(sale.quantity));

  if (quantity === false) return res.status(400).json({ message: '"quantity" is required' });

  if (!validQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};