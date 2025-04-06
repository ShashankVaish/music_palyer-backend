import mongoose from "mongoose";
import { dbname } from "../constants.js";

const connectdb = async () => {
  try {
    const dbURL = process.env.MONGODB_URL;  
    if (!dbURL) {
      throw new Error("MONGODB_URL environment variable is not defined.");
    }
    const connectionString = `${dbURL}/${dbname}`;
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Successfully connected to the database: ${dbname}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectdb; 