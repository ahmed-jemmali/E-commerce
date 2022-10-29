const mongoose = require('mongoose');
const factureAchatSchema = mongoose.Schema({
    uuid: String,
    name: String,
    address:String,
    contactNumber: String,
    email: String,
    supplierCategory:String,
    total:Number,
    productDetails: JSON,
});

const factureAchat = mongoose.model('FactureAchat', factureAchatSchema);

module.exports = factureAchat;