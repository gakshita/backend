var ObjectId = require("mongodb").ObjectId;
var mongoose = require("mongoose");

////////MODELS/////////

var Campaigns = mongoose.model("Campaign");
var Categories = mongoose.model("Category");
var Cities = mongoose.model("City");
var Locations = mongoose.model("Location");
var Educations = mongoose.model("Education");
var Streams = mongoose.model("Stream");
var Colleges = mongoose.model("College");
var References = mongoose.model("Reference");
var Sms_templates = mongoose.model("Sms_template");
var Mail_templates = mongoose.model("Mail_template");
var Status = mongoose.model("Status");
var Whatsapp_templates = mongoose.model("Whatsapp_template");

///////CONTROLLERS///////

module.exports.get_all = function (req, res) {
  var master = req.params.master;
  eval(master)
    .find()
    .exec(function (err, response) {
      if (err) {
        console.log("error");
      }
      res.json(response);
    });
};

module.exports.delete_one = function (req, res) {
  var master = req.params.master;
  var id = req.body.id;

  eval(master)
    .deleteOne({ _id: ObjectId(id) })
    .exec(function (err, response) {
      if (err) {
        console.log("error");
      }
      res.send("deleted");
    });
};

module.exports.add = function (req, res) {
  var master = req.params.master;
  var add_data = req.body;

  eval(master).create(add_data, function (err, response) {
    if (err) {
      console.log("error");
    } else {
      res.send("added");
    }
  });
};

module.exports.edit = function (req, res) {
  var master = req.params.master;
  var id = req.body.id;

  if (req.body.name && req.body.status) {
    var name = req.body.name;
    var status = req.body.status;

    eval(master)
      .findByIdAndUpdate(
        ObjectId(id),
        {
          $set: { name: name, status: status },
        },
        { new: true }
      )
      .exec(function (err, response) {
        if (err) {
          console.log("error");
        } else {
          res.send("updated");
        }
      });
  }
};
