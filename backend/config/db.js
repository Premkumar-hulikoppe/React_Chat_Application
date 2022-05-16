const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.dbUrl);
    console.log("Database is successfully connected".yellow.bold);
    console.log(`${connect.connection.host}`.blue.bold);
  } catch (err) {
    console.log(`Error : ${err.message}`.red.bold);
  }
};

module.exports = connectDb;
