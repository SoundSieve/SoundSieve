/* Index.js */
// Imports
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

/** Setting App */
const app = express();

/** Setting bodyparser */
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(bodyParser.json());

/** CORS */
app.use( cors() );

/** Public Dir */
app.use( express.static('public'));

// Database connection
dbConnection();

// Routes
app.use( '/api/v1/auth', require('./routes/auth') );

app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT } 🚀. Click on 'http://localhost:4000'. Documentation on 'http://localhost:4000/api/v1/docs'📝`);
}); 