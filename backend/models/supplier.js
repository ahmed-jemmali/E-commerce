const mongoose = require('mongoose');
const supplierSchema = mongoose.Schema({
    name: String,
    address: String,
    contactNumber: String,
    email: String,
    categoryId:String,
});

const supplier = mongoose.model('Supplier', supplierSchema);

module.exports = supplier;