const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }, 
    hash_password: {
        type: String,
        required: true,
     
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date

})
module.exports = mongoose.model("Users", userSchema)