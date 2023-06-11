/** Search Controller */

// Imports
const { response } = require("express");
const User = require("../models/User");
const Sheet = require("../models/Sheet");

const searchAll = async (req, res = response) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 0;
    const search = req.params.search;
    const regex = new RegExp(search, "i");

    const [users, totalUsersRows, sheets, totalSheetsRows] = await Promise.all([
      User.find(
        { firstName: regex },
        "username firstName lastName email img role google"
      )
        .skip(offset)
        .limit(limit),
      User.find({ firstName: regex }).count(),
      Sheet.find(
        { name: regex },
        "name author description year license genres instruments"
      )
        .populate("author", "username firstName lastName email img")
        .skip(offset)
        .limit(limit),
      Sheet.find({ name: regex }).count(),
    ]);

    return res.status(200).json({
      ok: true,
      users,
      sheets,
      total: totalUsersRows + totalSheetsRows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

const searchCollection = async (req, res = response) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 0;
    const search = req.params.search;
    const table = req.params.table;
    const regex = new RegExp(search, "i");

    let data = [];

    switch (table) {
      case "users":
        data = await User.find({ firstName: regex }).skip(offset).limit(limit);
        break;
      case "sheets":
        data = await Sheet.find({ name: regex })
          .populate("author", "username firstName lastName email img")
          .skip(offset)
          .limit(limit);
        break;
      case "interactions":
        break;
      default:
        return res.status(400).json({
          ok: false,
          msg: "The table must be valid",
        });
    }

    return res.status(200).json({
      ok: true,
      results: data,
      total: data.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

module.exports = {
  searchAll,
  searchCollection,
};
