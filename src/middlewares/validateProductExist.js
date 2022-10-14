const { validadeProduct } = require('../services/validations/validationsInputValues');

module.exports = async (req, res, next) => {
  const sales = req.body;
  const validProduct = await Promise.all(sales.map((sale) => validadeProduct(sale.productId)));
  if (validProduct.includes(false)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};