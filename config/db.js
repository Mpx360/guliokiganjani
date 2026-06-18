const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if the environment variable is actually reaching the code
  if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI environment variable is UNDEFINED on Render!");
    process.exit(1); 
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;