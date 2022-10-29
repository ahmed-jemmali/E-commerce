const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roleSchema =  new Schema({
    role: {
        type: String,
        default: 'basic',
        // enum: ["basic", "supervisor", "admin"]
    },
});

const role = mongoose.model('Role', roleSchema);

module.exports = role;