const connection = require('./db/connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProduct = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?', [id],
  );
  return result;
};

const insertNewProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)', [name],
  );
  
  return insertId;
};

const updateProduct = async (id, body) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products
     SET name = ?
     WHERE id = ?`, [body.name, id],
  );
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id=?', [id],
  );
  return result;
};

module.exports = {
  deleteProduct,
  getAllProducts,
  getProduct,
  insertNewProduct,
  updateProduct,
};