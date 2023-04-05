const salesModel = require('../models/sales.model');

const { checkArrayOfProducts, idParam, schemaValidation } = require('./validations/sales');

const getSale = async (id) => {
  await idParam(id);
  const sale = await salesModel.getSale(id);
  if (!sale.length) throw Object({ status: 404, message: 'Sale not found' });
  return sale;
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const insertNewSales = async (salesArray) => {
  await schemaValidation(salesArray);
  await checkArrayOfProducts(salesArray);

  const saleId = await salesModel.insertSale();

  await Promise.all(salesArray
    .map((e) => salesModel.insertNewSales(e, saleId)));
  
  return saleId;
};

const updateSale = async (id, body) => {
  await idParam(id);
  await schemaValidation(body);

  await getSale(id);
  await checkArrayOfProducts(body);

  return Promise.all(body
    .map((e) => salesModel.updateSale(id, e)));
};

const deleteSale = async (id) => {
  await idParam(id);

  await getSale(id);

  return salesModel.deleteSale(id);
};

module.exports = {
  deleteSale,
  insertNewSales,
  getAllSales,
  getSale,
  updateSale,
};