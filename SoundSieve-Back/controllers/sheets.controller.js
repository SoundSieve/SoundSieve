/** Search Controller */
// Imports
const { response } = require("express");
const Sheet = require("../models/Sheet");

const getSheets = async (req, res = response) => {
  const { titulo, autor, genero, instrumento, año, operador } = req.query;

  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 0;

    const [sheets, totalRows] = await Promise.all([
      Sheet.find()
        .populate("author", "firstName lastName img")
        .skip(offset)
        .limit(limit)
        .where("enabled")
        .equals(true),
      Sheet.find().where("enabled").equals(true).count(),
    ]);
    if (sheets) {
      return res.status(200).json({
        ok: true,
        sheets,
        total: totalRows,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "The sheet database is empty",
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

const getSheetById = async (req, res = response) => {
  try {
    const uid = req.params.id;
    const sheet = await Sheet.findById(uid).populate(
      "author",
      "firstName lastName img"
    );
    if (sheet && sheet.enabled === true) {
      return res.status(200).json({
        ok: true,
        Sheet: sheet,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "Sheet doesn`t exist",
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

const addSheet = async (req, res = response) => {
  const uid = req.uid;
  const sheet = new Sheet({
    author: uid,
    ...req.body,
  });

  try {
    const sheetDB = await sheet.save();

    return res.status(200).json({
      ok: true,
      sheet: sheetDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

const updateSheet = async (req, res = response) => {
  try {
    const id = req.params.id;
    const sheet = await Sheet.findById(id);

    if (sheet) {
      const uid = req.body.uid;

      if (!sheet.enabled) {
        return res.status(400).json({
          ok: false,
          msg: "Sheet doesn`t exist",
        });
      }

      if (sheet.author.toString() !== uid) {
        return res.status(400).json({
          ok: false,
          msg: "You're not the owner of this score sheet",
        });
      }

      const data = req.body;
      const update = await Sheet.findByIdAndUpdate(id, data, { new: true });

      return res.status(200).json({
        ok: true,
        sheet: update,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "Sheet doesn`t exist",
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

deleteSheet = async (req, res = response) => {
  const id = req.params.id;
  try {
    const sheet = await Sheet.findById(id);
    if (!sheet) {
      return res.status(404).json({
        ok: false,
        msg: "Sheet doesn`t exist",
      });
    }

    await Sheet.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Sheet deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

module.exports = {
  getSheets,
  getSheetById,
  addSheet,
  updateSheet,
  deleteSheet,
};
