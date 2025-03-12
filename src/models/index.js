import mongoose from "mongoose";
import { dbname } from "../constants.js";

const connectdb = async () => {
  try {
    // Ensure that you have the correct MongoDB URL format
    const dbURL = process.env.MONGODB_URL;  // This should be set in your .env file

    if (!dbURL) {
      throw new Error("MONGODB_URL environment variable is not defined.");
    }

    // Ensure the correct format for your connection string
    const connectionString = `${dbURL}/${dbname}`;

    // Connect to MongoDB
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log(`Successfully connected to the database: ${dbname}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectdb;
