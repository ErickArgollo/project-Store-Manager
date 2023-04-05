const productsModel = require('../../models/products.model');
const { validateId, validateNewProduct } = require('./schemas');

const idParam = async (id) => {
  const { error } = validateId.validate(id);
  if (error) throw Object({ status: 404, message: error.message });
};

const checkErrorTypeName = (error) => {
  const [{ type, message }] = error.details;
  const status = type === 'string.min' ? 422 : 400;
  throw Object({ status, message });
};

const checkProductExists = async (id) => {
  const product = await productsModel.getProduct(id);

  if (!product.length) throw Object({ status: 404, message: 'Product not found' });
  return product;
};

const validateNameField = (name) => {
const { error } = validateNewProduct.validate(name);
 
  if (error) {
    checkErrorTypeName(error);
  }
};

module.exports = {
  idParam,
  checkErrorTypeName,
  checkProductExists,
  validateNameField,
};