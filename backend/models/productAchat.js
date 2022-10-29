const mongoose = require('mongoose');
const productAchatSchema = mongoose.Schema({
    name: String,
    quantity: Number,
    description: String,
    status: Boolean,
    categoryId: String,
});

const productAchat = mongoose.model('ProductAchat', productAchatSchema);

module.exports = productAchat;