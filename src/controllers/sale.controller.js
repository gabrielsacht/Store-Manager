const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await saleService.createSale(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const updateSale = async (req, res) => {
  const sales = req.body;
  const { id } = req.params;
  const { type, message } = await saleService.updateSale(id, sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const findAllSales = async (_req, res) => {
  const { message } = await saleService.findAllSales();
  res.status(200).json(message);
};

const findSale = async (req, res) => {
  const { id } = req.params;
  const { message } = await saleService.findAllSalesbyid(id);
  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.deleteSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json(message);
};

module.exports = {
  createSale,
  findAllSales,
  findSale,
  deleteSale,
  updateSale,
};