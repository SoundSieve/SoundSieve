/** Auth Controller */
// Imports
const { response } = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../utilities/jwt");


const newUser = async (req, res = response) => {

    const { email, firstName, lastName, password } = req.body;

    try {

        // Verify if the email exists
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        const dbUser = new User ( req.body );

        // Encrypt the password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt )

        // Generate JWT
        const token = await generateJWT(dbUser.id, firstName, lastName);

        // Create Database user
        await dbUser.save();

        // Return succesful response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            firstName,
            lastName,
            token,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
};

const loginUser = (req, res = response) => {

    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Login usuario /login'
    })
};

const renew = (req, res = response) => {
    
    return res.json({
        ok: true,
        msg: 'Renew token /renew'
    })
};

module.exports = {
    newUser,
    loginUser,
    renew
}