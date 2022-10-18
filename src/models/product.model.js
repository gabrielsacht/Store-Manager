const camelize = require('camelize');
const connection = require('./connection');

const findById = async (id) => {
  const [[product]] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE id=${id};`,
  );
  return camelize(product);
};

const findBySearch = async (query) => {
  const [products] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE '%${query}%';`,
  );
  return camelize(products);
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return camelize(result);
};

const insert = async (produto) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)', [produto],
  );

  return insertId;
};

const update = async (id, nameToUpdate) => connection.execute(
    `UPDATE StoreManager.products SET name = '${nameToUpdate}' WHERE id = ${id}`,
);
  
const erase = async (id) => connection.execute(
  `DELETE FROM StoreManager.products WHERE id = ${id};`,
);

module.exports = {
  findById,
  findAll,
  insert,
  update,
  erase,
  findBySearch,
};