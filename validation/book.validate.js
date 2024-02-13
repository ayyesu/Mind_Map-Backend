const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().allow(''),
    description: Joi.string().allow(''),
    category: Joi.string().required(),
    imageUrl: Joi.string(),
    fileUrl: Joi.string(),
    imageName: Joi.string(),
    fileName: Joi.string(),
    price: Joi.string(),
    createdAt: Joi.date(),
});

module.exports = bookSchema;
