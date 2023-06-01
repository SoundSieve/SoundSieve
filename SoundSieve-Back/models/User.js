/** User model */
// Imports
const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
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
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
    },
    google: {
        type: Boolean,
        default: false,
    }
});

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;
})

module.exports = model( 'User', UserSchema );