var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var followups_schema = new Schema({
  start_date: { type: Date, required: true },
  follow_next_date: { type: Date, required: true },
  status_type: { type: String, required: true },
  description: { type: String, required: true },
});

var followup_schema = new Schema({
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
  user: { type: String, required: true, default: "N/A" },
  followups: [followups_schema],
});

var StudentFollowups = mongoose.model("StudentFollowup", followup_schema);

module.exports = {
  StudentFollowups,
};
