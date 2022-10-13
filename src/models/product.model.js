const camelize = require('camelize');
const connection = require('./connection');

const findById = async (id) => {
  const [[product]] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE id=${id};`,
  );
  return camelize(product);
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return camelize(result);
};

module.exports = {
  findById,
  findAll,
};