/** Search Controller */
// Imports
const { response } = require("express");
const Sheet = require("../models/Sheet");

const getSheets = async (req, res = response) => {
    const { titulo, autor, genero, instrumento, año, operador } = req.query;

    try {
        const sheets = await Sheet.find()
            .populate('author', 'firstName lastName pdf');
        if(sheets) {
            return res.status(200).json({
                ok: true,
                sheets: sheets
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'The sheet database is empty'
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

const getSheetById = async (req, res = response) => {
    try {
        const uid  = req.params.id;
        const sheet = await Sheet.findById(uid)
            .populate('author', 'firstName lastName img');
        if(sheet) {
            return res.status(200).json({
                ok: true,
                Sheet: sheet
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Sheet doesn`t exist'
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
            Sheet: sheetDB
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
}

module.exports = {
    getSheets,
    getSheetById,
    addSheet
}