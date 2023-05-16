/** Search Controller */
// Imports
const { response } = require("express");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../utilities/jwt");

const findAll = async (req, res = response) => {
    const { titulo, autor, genero, instrumento, año, operador } = req.query;
}