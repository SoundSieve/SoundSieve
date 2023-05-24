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
        ref: 'User',
    },
    description: {
        type: String
    },
    year: {
        type: Number,
        required: true,
    },
    license: {
        type: String,
        default: 'GPL'    
    },
    pdf: {
        type: String,
    },
    genres: {
        type: Array,
    },
});

SheetSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();
    return Object;
})

module.exports = model( 'Sheet', SheetSchema );