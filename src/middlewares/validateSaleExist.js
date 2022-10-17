const { saleModel } = require('../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const result = await saleModel.findSaleById(id);
  if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });

  next();
};