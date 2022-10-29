const mongoose = require('mongoose');
const supplierCategorySchema = mongoose.Schema({
    name:String,
});

const supplierCategory = mongoose.model('SupplierCategory', supplierCategorySchema);

module.exports = supplierCategory;