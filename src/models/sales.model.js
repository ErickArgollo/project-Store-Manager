const connection = require('./db/connection');

const getSale = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM
    StoreManager.sales s 
    INNER JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
    WHERE sp.sale_id = ?`, [id],
  );
  return result;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.product_id, sp.quantity
    FROM
    StoreManager.sales s 
    INNER JOIN StoreManager.sales_products sp ON sp.sale_id = s.id`,
  );

  return result;
};

const insertSale = async () => {
 const [{ insertId }] = await connection.execute(
  'INSERT INTO StoreManager.sales(date) VALUES(NOW())',
 );
 return insertId;
};

const insertNewSales = async (e, saleId) => {
    const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id,product_id, quantity) VALUES(?, ?, ?)',
    [saleId, e.productId, e.quantity],
  );  
  return insertId;
};

const updateSale = async (id, body) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products
     SET quantity = ?
     WHERE sale_id = ? AND product_id = ?`, [body.quantity, id, body.productId],
  );
  return result;
};

const deleteSale = async (id) => {
  const [result] = await connection.execute(
   'DELETE FROM StoreManager.sales WHERE id = ?', [id],
  );
  return result;
};

module.exports = {
  insertNewSales,
  insertSale,
  deleteSale,
  getSale,
  getAllSales,
  updateSale,
};