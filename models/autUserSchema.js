const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// DEFINE THE SCHEMA
const authUserSchema = new Schema(
  {
    userName: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

// HASHING PASSWORDS
authUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// CREATE A MODEL
const authUser = mongoose.model("user", authUserSchema);

module.exports = authUser;
