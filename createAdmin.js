import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./src/models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const existingAdmin = await User.findOne({ email: "admin@glamware.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      age: 20, // REQUIRED FIELD ADDED
      email: "admin@glamware.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();