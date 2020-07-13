var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

var Students = mongoose.model("Student");

module.exports.get_all = function (req, res) {
  var campaign = req.params.campaign_name;

  Students.find({ campaign: campaign }).exec(function (err, response) {
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
  Students.find({}).exec(function (err, response) {
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
  var student = req.body;

  student["campaign"] = req.params.campaign_name;

  if (isNaN(req.body.contact)) {
    res.json({ success: false, message: "Invalid contact number" });
  } else if (!(req.body.contact.toString().length === 10)) {
    res.json({ success: false, message: "Contact must be a 10 digit number" });
  } else {
    console.log(student);
    Students.create(student, function (err, response) {
      if (err) {
        res.status(200);
        console.log(err);
        res.json({ success: false, message: "All fields are required!" });
      } else {
        res.json({ success: true });
      }
    });
  }
};

////////web///
module.exports.add_student = function (req, res) {
  console.log("addinf");
  var student = req.body;
  console.log(student);

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

module.exports.assign = function (req, res) {
  var id = req.body.id;
  Students.findByIdAndUpdate(
    ObjectId(id),
    {
      $set: {
        user: req.body.user,
      },
    },
    { new: true }
  ).exec(function (err, response) {
    if (err) {
      console.log("error");
    } else {
      res.send("updated");
    }
  });
};

module.exports.delete_one = function (req, res) {
  console.log("hey");
  var id = req.body.id;

  Students.deleteOne({ _id: ObjectId(id) }).exec(function (err, response) {
    if (err) {
      console.log("error");
    }
    res.json(response);
  });
};
