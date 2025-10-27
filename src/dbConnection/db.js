import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let dbName;

    switch (process.env.NODE_ENV) {
      case "staging":
        dbName = process.env.STAGING_DB_NAME;
        break;
      case "production":
        dbName = process.env.PROD_DB_NAME;
        break;
      default:
        dbName = process.env.DEV_DB_NAME;
    }

    const conn = await mongoose.connect(`${process.env.MONGO_URL}/${dbName}`);
    console.log(`✅ Connected to ${dbName}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
