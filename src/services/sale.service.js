const { saleModel } = require('../models');

const createSale = async (sales) => {
  const saleId = await saleModel.createSale();

  const salesArray = sales.map((sale) => ({ saleId, ...sale }));
  await Promise.all(await salesArray.map((sale) => saleModel.insert(sale)));

  const result = await saleModel.findSaleById(saleId);

  return { type: null, message: { id: saleId, itemsSold: result } };
};

module.exports = {
  createSale,
};