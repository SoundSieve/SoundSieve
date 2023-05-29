/** Users Controller */

// Imports
const { response } = require("express");
const User = require("../models/User");

const getUsers = async (req, res = response) => {
    try {
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 0;

        const [users, totalRows ] = await Promise.all([
            User.find({}, 'username firstName lastName email role google img')
                .skip( offset )
                .limit( limit ),
            User.find().count(),
        ])

        if(users) {
            return res.status(200).json({
                ok: true,
                users,
                total: totalRows,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
}

const getUserById = async (req, res = response) => {
    try {
        const uid  = req.params.id;
        const user = await User.findById(uid);
        if(user) {
            return res.status(200).json({
                ok: true,
                user
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'User doesn`t exist'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
}

module.exports = {
    getUsers,
    getUserById
}