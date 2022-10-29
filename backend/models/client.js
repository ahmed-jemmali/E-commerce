const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
    name: String,
    address: String,
    contactNumber: String,
    email: String,
});

const client = mongoose.model('Client', clientSchema);

module.exports = client;