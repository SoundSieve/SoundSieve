/** Auth Controller */
// Imports
const { response } = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../utilities/jwt");
const { googleVerify } = require("../helpers/google-verify");


const newUser = async (req, res = response) => {

    const { email, username, firstName, lastName, password } = req.body;

    try {

        // Verify if the email exists
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'The user already exists'
            });
        } 
        
        // Verify if the username exists
        user = await User.findOne({ username });
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'The username is already taken'
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
            username,
            firstName,
            lastName,
            role: dbUser.role,
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
                msg: 'Email or password are not correct'
            });
        }

        // Verify if the password matches
        const validPassword = bcrypt.compareSync( password, dbUser.password );
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email or password are not correct'
            });
        }

        // Generate JWT
        const token = await generateJWT(dbUser.id, dbUser.firstName, dbUser.lastName);

        // Return succesful response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            username: dbUser.username,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            role: dbUser.role,
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

const googleSignIn = async (req, res = response) => {
    console.log(req.body.token);
    try {
        
        const { email, name, picture } = await googleVerify(req.body.token); 
        const userDb = await User.findOne({ email });
        let user;

        if(!userDb) {
            user = new User({
                email,
                firstName: name,
                lastName: '',
                password: '@@@',
                img: picture,
                google: true,
            })
        } else {
            user = userDb;
            user.google = true;
        }

        // Save user
        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id, user.firstName, user.lastName);
        
        res.json({
            ok: true,
            email,
            name,
            picture,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Google token error'
        });
    }
}

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
    googleSignIn,
    renew
}