const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
    },
    fileUrl: {
        type: String,
    },
    imageName: {
        type: String,
    },
    fileName: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Book', bookSchema);
