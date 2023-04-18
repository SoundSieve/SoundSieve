/* Index.js */
// Imports
const express = require('express');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Create the express server/app
const app = express();

// Database connection
dbConnection();

app.get('/', ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Success'
    });
});

app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT } 🚀. Click on 'http://localhost:4000'. Documentation on 'http://localhost:4000/api/v1/docs'📝`);
}); 