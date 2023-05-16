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
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    instrument: {
        type: String,
    },
    google: {
        type: Boolean,
    }
});

module.exports = model( 'User', UserSchema );