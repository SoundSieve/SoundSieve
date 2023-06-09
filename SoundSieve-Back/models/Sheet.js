/** Sheet model */
// Imports
const { Schema, model } = require("mongoose");

const SheetSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  license: {
    type: String,
    default: "GPL",
  },
  pdfPreview: {
    type: String,
  },
  pdf: {
    type: String,
  },
  genres: {
    type: Array,
  },
  instruments: {
    type: Array,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

SheetSchema.method("toJSON", function () {
  const { __v, _id, ...Object } = this.toObject();
  Object.id = _id;
  return Object;
});

module.exports = model("Sheet", SheetSchema);
