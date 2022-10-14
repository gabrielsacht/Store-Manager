module.exports = (req, res, next) => {
  const sales = req.body;
  const product = sales.every((sale) => sale.productId);

  if (product === false) return res.status(400).json({ message: '"productId" is required' });

  next();
};