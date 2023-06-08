const fs = require("fs");

const User = require("../models/User");
const Sheet = require("../models/Sheet");

const deleteOld = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (type, id, fileName) => {
  switch (type) {
    case "sheets": {
      const sheet = await Sheet.findById(id);
      if (!sheet) {
        console.log("Error id doesn`t exist");
        return false;
      }

      const oldPath = `./uploads/image/${type}/${sheet.pdfPreview}`;
      deleteOld(oldPath);

      sheet.pdfPreview = fileName;
      await sheet.save();
      return true;
      break;
    }

    case "users": {
      const user = await User.findById(id);
      if (!user) {
        console.log("Error id doesn`t exist");
        return false;
      }

      const oldPath = `./uploads/image/${type}/${user.img}`;
      deleteOld(oldPath);

      user.img = fileName;
      await user.save();
      return true;
      break;
    }
  }
};
const updatePdf = async (type, id, fileName) => {
  switch (type) {
    case "sheets": {
      const sheet = await Sheet.findById(id);
      if (!sheet) {
        console.log("Error id doesn`t exist");
        return false;
      }

      const oldPath = `./uploads/pdf/${type}/${sheet.pdf}`;
      deleteOld(oldPath);

      sheet.pdf = fileName;
      await sheet.save();
      return true;
      break;
    }
  }
};

module.exports = {
  updateImage,
  updatePdf,
};
