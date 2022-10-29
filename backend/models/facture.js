const mongoose = require('mongoose');
const factureSchema = mongoose.Schema({
    uuid: String,
    name: String,
    email: String,
    contactNumber: String,
    paymentMethod: String,
    total: Number,
    productDetails: JSON,
    cratedBy: String
});

const facture = mongoose.model('Facture', factureSchema);

module.exports = facture;