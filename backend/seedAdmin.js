// One-time script to create your first admin user so you can test /api/auth/login.
// Run with:  node seedAdmin.js
// Delete this file (or at least don't run it again) once you have a real admin.

import "dotenv/config";
import mongoose from "mongoose";
import User from "./src/models/User.js";

const run = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  const email = "admin@test.com";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin user already exists:", email);
    process.exit(0);
  }

  const admin = await User.create({
    name: "Test Admin",
    email,
    passwordHash: "Password123!", // gets hashed automatically by the pre('save') hook
    role: "admin",
  });

  console.log("Created admin user:");
  console.log("  email:", admin.email);
  console.log("  password: Password123!");
  console.log("  role:", admin.role);

  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});