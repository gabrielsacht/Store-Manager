const camelize = require('camelize');
const connection = require('./connection');

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES();',
  );
  console.log(insertId);
  return insertId;
};

const insert = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity ) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

const findSaleById = async (id) => {
  const [result] = await connection.execute(
    'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?;', [id],
  );
  return camelize(result);
};

module.exports = {
  createSale,
  insert,
  findSaleById,
};