/** Validate fields */
// Imports
const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {

    let token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token error'
        });
    }

    try {

        const { uid, firstName, lastName } = jwt.verify(token, process.env.SECRET_JWT_SEED );
        req.uid = uid;
        req.firstName = firstName;
        req.lastName = lastName;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }

    next();
}

module.exports = {
    validateJWT
}