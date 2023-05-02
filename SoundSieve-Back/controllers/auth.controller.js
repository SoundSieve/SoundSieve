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
        const user = await User.findOne({ email });
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
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
};

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verify if the email exists
        const dbUser = await User.findOne({ email });
        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Username or password are not correct'
            });
        }

        // Verify if the password matches
        const validPassword = bcrypt.compareSync( password, dbUser.password );
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Username or password are not correct'
            });
        }

        // Generate JWT
        const token = await generateJWT(dbUser.id, dbUser.firstName, dbUser.lastName);

        // Return succesful response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            token,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
};

const renew = async (req, res = response) => {


    const { uid, firstName, lastName } = req;



    // Generate JWT
    token = await generateJWT(uid, firstName, lastName);

    // Return succesful response
    return res.status(201).json({
        ok: true,
        uid,
        firstName: firstName,
        lastName: lastName,
        token,
    });
};

module.exports = {
    newUser,
    loginUser,
    renew
}