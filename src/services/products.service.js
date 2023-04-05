const productsModel = require('../models/products.model');
const { idParam, checkProductExists, validateNameField } = require('./validations/products');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProduct = async (id) => {
  await idParam(id);

  const product = await checkProductExists(id);

  return product[0];
};

const getQueryProducts = async (query) => {
  const allProducts = await getAllProducts();
  if (query) {
    const searchProducts = allProducts
      .filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));
    return searchProducts;
  }
  return allProducts;
};

const insertNewProduct = async ({ name }) => {
  await validateNameField(name);

  const newProductInsertId = await productsModel.insertNewProduct(name);

  return newProductInsertId;
};

const updateProduct = async ({ id, body }) => {
  await idParam(id);

  await validateNameField(body.name);

  await checkProductExists(id);

  return productsModel.updateProduct(id, body);
};

const deleteProduct = async (id) => {
  await idParam(id);

  await checkProductExists(id);

  return productsModel.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProduct,
  getQueryProducts,
  deleteProduct,
  insertNewProduct,
  updateProduct,
};