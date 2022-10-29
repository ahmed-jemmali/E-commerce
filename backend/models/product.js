const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    status: Boolean,
    categoryId: String,
});

const product = mongoose.model('Product', productSchema);

module.exports = product;