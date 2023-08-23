const Joi = require('joi');

const bookSchema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().allow(''),
    description: Joi.string().allow(''),
    coverImage: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number(),
    createdAt: Joi.date(),
});

module.exports = bookSchema;
