const User= require("../models/User");
const db=require("./db");
const dotenv = require("dotenv");

dotenv.config();

const seedUsers = async () => {
  await db();
  console.log("Seeding users...");
  try {
    await User.deleteMany({email: process.env.admin});
    const users = [
      {
        name: "Admin User",
        email: process.env.admin,
        password: process.env.adminPassword,
        role: "admin"
      }
    ];
    await User.insertMany(users);
    console.log("Users seeded successfully");
    return process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    return process.exit(1);
  }
};

seedUsers();