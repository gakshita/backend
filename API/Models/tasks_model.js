var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var task_schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: Date, default: new Date() },
});

var Tasks = mongoose.model("Task", task_schema);

module.exports = {
  Tasks,
};
