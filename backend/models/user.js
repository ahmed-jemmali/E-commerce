const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    username: String,
    email: String,
    password: String,
    confirmPwd: String,
    image: String,
    resetLink: { data: String, default: '' },
    active: Boolean,
    role: Object
});

const user = mongoose.model('User', userSchema);

module.exports = user;


// module.exports.getUserById = function(id, callback) {
//     user.findById(id, callback);
// }

