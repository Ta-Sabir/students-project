const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// DEFINE THE SCHEMA
const articleSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    studentNumber: Number,
    studentClass: String,
    email: String,
    phoneNumber: Number,
    dateBirth: Date,
    placeBirth: String,
    gender: String,
    speciality: String,
  },
  { timestamps: true }
);

// CREATE A MODEL
const Mydata = mongoose.model("Mydataa", articleSchema);

module.exports = Mydata;
