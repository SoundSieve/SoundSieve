/* Database configuration */
// Imports
const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.BD_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database initialized");
  } catch (error) {
    console.log(error);
    throw new Error("Error initialize database");
  }
};

module.exports = {
  dbConnection,
};
