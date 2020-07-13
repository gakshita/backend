var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var category_schema = new Schema({
  name: { type: String, required: true },
  campaign: { type: String, required: true },
  category: { type: String, required: true },
  contact: { type: Number, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  notes: { type: String },
  college: { type: String, required: true },
  email: { type: String, required: true },
  reference: { type: String, required: true },
  education: { type: String, required: true },
  stream: { type: String, required: true },
  date: { type: Date, default: new Date() },
  user: { type: String, default: "N/A" },
});

var Students = mongoose.model("Student", category_schema);
module.exports = { Students };
