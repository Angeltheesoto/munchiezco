const mongoose = require("mongoose");

const connectDB = async () => {
  const url = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(`${url}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
