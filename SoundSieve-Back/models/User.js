/** User model */
// Imports
const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    Intrument: {
        type: String,
    }
});

module.exports = model( 'User', UserSchema );