/** Users Controller */

// Imports
const { response } = require("express");
const User = require("../models/User");

const getUsers = async (req, res = response) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 0;

    const [users, totalRows] = await Promise.all([
      User.find({}, "username firstName lastName email role google img")
        .skip(offset)
        .limit(limit)
        .where("enabled")
        .equals(true),
      User.find().where("enabled").equals(true).count(),
    ]);
    console.log(users);

    if (users) {
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
      msg: "Server error",
    });
  }
};

const getUserById = async (req, res = response) => {
  try {
    const uid = req.params.id;
    const user = await User.findById(uid);
    if (user && user.enabled === true) {
      return res.status(200).json({
        ok: true,
        user,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "User doesn`t exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

const updateUser = async (req, res = response) => {
  try {
    const uid = req.params.id;
    const user = await User.findById(uid);

    if (user) {
      const { role, google, password, email, ...data } = req.body;

      if (data.email !== user.email) {
        const emailExists = await User.findOne({ email: data.email });
        if (emailExists) {
          return res.status(400).json({
            ok: false,
            msg: "There is already a user with that email",
          });
        }
      }

      data.email = email;
      const update = await User.findByIdAndUpdate(uid, data, { new: true });

      return res.status(200).json({
        ok: true,
        user: update,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "User doesn`t exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
};
