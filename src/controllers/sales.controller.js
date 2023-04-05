const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
    const response = await salesService.getAllSales();
    return res.status(200).json(response);
};

const getSale = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await salesService.getSale(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const insertNewSales = async (req, res, next) => {
  try {
    const response = await salesService.insertNewSales(req.body);
   return res.status(201).json({ id: response, itemsSold: req.body });
  } catch (error) {
   next(error);
 }
};

const updateSale = async (req, res, next) => {
  const { id } = req.params;
  try {
    await salesService.updateSale(id, req.body);
    return res.status(200).json({ saleId: id, itemsUpdated: req.body });
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  try {
    await salesService.deleteSale(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteSale,
  insertNewSales,
  getAllSales,
  getSale,
  updateSale,
};