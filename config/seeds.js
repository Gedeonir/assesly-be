const User= require("../models/User");
const db=require("./db");
const dotenv = require("dotenv").config();
const seedUsers = async () => {
  try {
    await User.deleteMany({email: "admin@example.com"});
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
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

module.exports = seedUsers;