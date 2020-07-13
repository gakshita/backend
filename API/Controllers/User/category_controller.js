var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

var Students = mongoose.model("Student");

module.exports.get_all = function (req, res) {
  console.log(req.user, "user");
  var campaign = req.params.campaign_name;
  var user = req.user;

  Students.find({ campaign: campaign, user: user }).exec(function (
    err,
    response
  ) {
    if (err) {
      console.log("err");
      res.status(400);
      res.json(error);
    } else {
      res.status(200);
      res.json(response);
    }
  });
};

module.exports.get_all_data = function (req, res) {
  console.log(req.user, "user");
  var user = req.user;

  Students.find({ user: user }).exec(function (err, response) {
    if (err) {
      console.log("err");
      res.status(400);
      res.json(error);
    } else {
      res.status(200);
      res.json(response);
    }
  });
};

module.exports.add = function (req, res) {
  console.log("addinf");
  var student = req.body;
  console.log(student);
  student["user"] = req.user;
  student["campaign"] = req.params.campaign_name;

  if (req.body.contact && req.body.email) {
    if (!(req.body.contact.toString().length === 10)) {
      console.log("1c");
      res.json({
        success: false,
        message: "Contact must be a 10 digit number",
      });
      res.end();
    } else {
      Students.create(student, function (err, response) {
        if (err) {
          res.status(200);
          console.log(err);
          res.json({ success: false, message: "All fields are required!" });
        } else {
          res.json({ success: true, response });
        }
      });
    }
    console.log("hii");
  } else {
    console.log("byg");
    res.json({ success: false, message: "All fields are required!" });
    res.end();
  }
};

module.exports.delete_one = function (req, res) {
  console.log("hey");

  var id = req.body.id;

  Students.deleteOne({ _id: ObjectId(id) }).exec(function (err, response) {
    if (err) {
      console.log("error");
    }
    res.json({ success: true, response });
  });
};

/////////web////

module.exports.add_student = function (req, res) {
  console.log("addinf");
  var student = req.body;
  console.log(student);
  student["user"] = req.user;

  if (req.body.contact && req.body.email) {
    if (!(req.body.contact.toString().length === 10)) {
      console.log("1c");
      res.json({
        success: false,
        message: "Contact must be a 10 digit number",
      });
      res.end();
    } else {
      Students.create(student, function (err, response) {
        if (err) {
          res.status(200);
          console.log(err);
          res.json({ success: false, message: "All fields are required!" });
        } else {
          res.json({ success: true, response });
        }
      });
    }
    console.log("hii");
  } else {
    console.log("byg");
    res.json({ success: false, message: "All fields are required!" });
    res.end();
  }
};

module.exports.edit = function (req, res) {
  var data = req.body;
  console.log("ediyting", data);
  Students.replaceOne({ _id: data._id }, data, function (err, response) {
    if (err) {
      console.log(err);
      res.status(200);
      res.json({ success: false, message: "all fields required!" });
    } else {
      console.log(response);
      res.json({ success: true, response: response });
    }
  });
};
