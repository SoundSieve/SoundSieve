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
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  bio: {
    type: String,
  },
  occupation: {
    type: String,
  },
  location: {
    type: String,
  },
  city: {
    type: String,
  },
  img: {
    type: String,
  },
  instruments: {
    type: Array,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
  creationTime: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.method("toJSON", function () {
  const { __v, _id, password, ...Object } = this.toObject();
  Object.uid = _id;
  return Object;
});

module.exports = model("User", UserSchema);
