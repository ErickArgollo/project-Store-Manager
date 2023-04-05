const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const response = await productsService.getAllProducts();
  return res.status(200).json(response);
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await productsService.getProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getQueryProducts = async (req, res) => {
  const { q } = req.query;
    const response = await productsService.getQueryProducts(q);
    return res.status(200).json(response);
};

const insertNewProduct = async (req, res, next) => {
  try {
    const response = await productsService.insertNewProduct(req.body);
    return res.status(201).json({ id: response, ...req.body });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await productsService.updateProduct({ id, body: req.body });
    return res.status(200).json({ id, name: req.body.name });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await productsService.deleteProduct(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getQueryProducts,
  deleteProduct,
  insertNewProduct,
  updateProduct,
};