const Joi = require('joi');

const validateId = Joi.number().integer().min(1).required();

const validateNewProduct = Joi.string().min(5).required().messages({
  'string.min': '{#label} length must be at least 5 characters long',
  'string.empty': '{#label} is required',
})
  .label('name');

const salesSchema = Joi.object({
  productId: Joi.number().min(1).positive().required()
.label('productId'),
  quantity: Joi.number().min(1).positive().required()
.label('quantity'),
});

const salesArraySchema = Joi.array().items(salesSchema);

module.exports = {
  validateId,
  validateNewProduct,
  salesSchema,
  salesArraySchema,

};