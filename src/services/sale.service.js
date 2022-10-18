const { saleModel } = require('../models');

const createSale = async (sales) => {
  const saleId = await saleModel.createSale();

  const salesArray = sales.map((sale) => ({ saleId, ...sale }));
  await Promise.all(await salesArray.map((sale) => saleModel.insert(sale)));

  const result = await saleModel.findSaleById(saleId);

  return { type: null, message: { id: saleId, itemsSold: result } };
};

const updateSale = async (saleId, sales) => {
  console.log(sales);
  const salesArray = sales.map((sale) => ({ saleId, ...sale }));
  await Promise.all(await salesArray.map((sale) => saleModel.update(sale)));

  const result = await saleModel.findSaleById(saleId);

  return { type: null, message: { saleId, itemsUpdated: result } };
};

const findAllSales = async () => {
  const result = await saleModel.findAllSales();
  return { type: null, message: result };
};

const findAllSalesbyid = async (id) => {
  const result = await saleModel.findAllSalesbyid(id);
  return { type: null, message: result };
};

const deleteSale = async (id) => {
  const sale = await saleModel.findSaleById(id);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await saleModel.erase(id);

  return { type: null, message: '' };
};

module.exports = {
  createSale,
  findAllSales,
  findAllSalesbyid,
  deleteSale,
  updateSale,
};