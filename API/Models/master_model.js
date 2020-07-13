var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var master_schema = new Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true },
});
var location_schema = new Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  city: { type: String, required: true },
});

var template_schema = new Schema({
  name: { type: String, required: true, unique: true },
  message: { type: String, required: true },
});
var Campaigns = mongoose.model("Campaign", master_schema);
var Categories = mongoose.model("Category", master_schema);
var Cities = mongoose.model("City", master_schema);
var Locations = mongoose.model("Location", location_schema);
var Educations = mongoose.model("Education", master_schema);
var Streams = mongoose.model("Stream", master_schema);
var Colleges = mongoose.model("College", master_schema);
var References = mongoose.model("Reference", master_schema);
var Sms_templates = mongoose.model("Sms_template", template_schema);
var Whatsapp_templates = mongoose.model("Whatsapp_template", template_schema);
var Mail_templates = mongoose.model("Mail_template", template_schema);
var Status = mongoose.model("Status", master_schema);

module.exports = {
  Campaigns,
  Categories,
  Cities,
  Locations,
  Educations,
  Streams,
  Colleges,
  References,
  Sms_templates,
  Mail_templates,
  Whatsapp_templates,
  Status,
};
