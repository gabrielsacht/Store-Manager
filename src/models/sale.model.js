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

const update = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products SET quantity = ${quantity} 
    WHERE sale_id = ${saleId} AND product_id = ${productId}`,
  );
};

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
        s.id AS sale_id,
        s.date,
        sp.product_id,
        sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN
        StoreManager.sales_products as sp
        ON s.id = sp.sale_id
    ORDER BY sale_id, product_id;`,
  );
  return camelize(result);
}; 

const findSaleById = async (id) => {
  const [result] = await connection.execute(
    'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?;', [id],
  );
  return camelize(result);
};

const findAllSalesbyid = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
        s.date,
        sp.product_id,
        sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN
        StoreManager.sales_products as sp
        ON s.id = sp.sale_id
    WHERE s.id = ${id}
    ORDER BY product_id;`,
  );
  return camelize(result);
};

const erase = async (id) => connection.execute(
  `DELETE FROM StoreManager.sales WHERE id = ${id};`,
);

module.exports = {
  findAllSales,
  createSale,
  insert,
  findSaleById,
  findAllSalesbyid,
  erase,
  update,
};