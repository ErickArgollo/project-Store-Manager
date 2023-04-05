const { salesArraySchema, validateId } = require('./schemas');
const productsModel = require('../../models/products.model');

const checkType = (type) => {
  if (type === 'any.required') return 400;
  if (type === 'number.min') return 422;
};

const checkIfProductExists = async (id) => {
  const verify = await productsModel.getProduct(id);
  return verify[0].id;
};

const checkArrayOfProducts = async (salesArray) => {
try {
    await Promise.all(salesArray.map((e) => checkIfProductExists(e.productId)));
  } catch (erro) {
    throw Object({ status: 404, message: 'Product not found' });
  }
};

const schemaValidation = async (salesArray) => {
  const { error } = salesArraySchema.validate(salesArray);
  if (error) {
    const [{ type, message }] = error.details;
    const status = checkType(type);
    throw Object({ status, message });
  }
};

const idParam = async (id) => {
  const { error } = validateId.validate(id);
  if (error) throw Object({ status: 400, message: error.message });
};

module.exports = {
  checkArrayOfProducts,
  checkIfProductExists,
  checkType,
  idParam,
  schemaValidation,
};