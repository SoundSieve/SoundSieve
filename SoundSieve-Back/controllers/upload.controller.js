/** Upload Controller */

// Imports
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../utilities/uploadFile");

const uploadImage = async (req, res = response) => {
  try {
    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ["sheets", "users"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        ok: false,
        msg: "File type not valid",
      });
    }

    if (!req.files || Object.keys(req.files).lenght === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No files were upload",
      });
    }

    // Process the file
    const file = req.files.image;

    const splitName = file.name.split(".");
    const fileExtension = splitName[splitName.length - 1];

    // Valid extensions
    let validExtension = ["png", "jpg", "jpeg", "gif"];

    if (!validExtension.includes(fileExtension)) {
      return res.status(400).json({
        ok: false,
        msg: "File extension not valid",
      });
    }

    // Generate file name
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Save upload path
    const path = `./uploads/image/${type}/${fileName}`;

    // Move the file to the folder
    file.mv(path, (err) => {
      if (err) {
        console.log(error);
        return res.status(500).json({
          ok: false,
          msg: "Error moving the file",
        });
      }
    });

    // Update database
    updateImage(type, id, fileName);

    return res.status(200).json({
      ok: true,
      msg: "File uploaded",
      file_name: fileName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

const uploadPdf = async (req, res = response) => {
  try {
    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ["sheets"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        ok: false,
        msg: "File type not valid",
      });
    }

    if (!req.files || Object.keys(req.files).lenght === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No files were upload",
      });
    }

    // Process the file
    const file = req.files.file;

    const splitName = file.name.split(".");
    const fileExtension = splitName[splitName.length - 1];

    // Valid extensions
    let validExtension = ["pdf", "doc"];

    if (!validExtension.includes(fileExtension)) {
      return res.status(400).json({
        ok: false,
        msg: "File extension not valid",
      });
    }

    // Generate file name
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Save upload path
    const path = `./uploads/pdf/${type}/${fileName}`;

    // Move the file to the folder
    file.mv(path, (err) => {
      if (err) {
        console.log(error);
        return res.status(500).json({
          ok: false,
          msg: "Error moving the file",
        });
      }
    });

    // Update database
    updatePdf(type, id, fileName);

    return res.status(200).json({
      ok: true,
      msg: "File uploaded",
      file_name: fileName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

const getImage = (req, res = response) => {
  const type = req.params.type;
  const image = req.params.image;

  const filePath = path.join(__dirname, `../uploads/image/${type}/${image}`);

  // Default image
  if (!fs.existsSync(filePath)) {
    switch (type) {
      case "users": {
        const filePath = path.join(
          __dirname,
          `../uploads/image/${type}/no-user-image.gif`
        );
        res.sendFile(filePath);
        break;
      }
      case "sheets": {
        const filePath = path.join(
          __dirname,
          `../uploads/image/${type}/no-sheets-image.png`
        );
        res.sendFile(filePath);
        break;
      }
    }
  } else {
    res.sendFile(filePath);
  }
};

const getPdf = (req, res = response) => {
  const type = req.params.type;
  const file = req.params.file;

  const filePath = path.join(__dirname, `../uploads/pdf/${type}/${file}`);

  // Default image
  if (!fs.existsSync(filePath)) {
    switch (type) {
      case "sheets": {
        const filePath = path.join(
          __dirname,
          `../uploads/pdf/${type}/no-sheets-image.png`
        );
        res.sendFile(filePath);
        break;
      }
    }
  } else {
    res.sendFile(filePath);
  }
};

module.exports = {
  uploadImage,
  getImage,
  uploadPdf,
  getPdf,
};
