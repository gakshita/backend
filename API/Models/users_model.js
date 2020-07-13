var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  type: { type: String, default: "user" },
});

var Users = mongoose.model("User", userSchema);

module.exports = { Users };
