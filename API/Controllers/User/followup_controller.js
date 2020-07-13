var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

var StudentFollowups = mongoose.model("StudentFollowup");

module.exports.get_all = function (req, res) {
  var user = req.user;

  StudentFollowups.find({ user: user }).exec(function (err, response) {
    if (err) {
      console.log("err");
      res.status(400);
      res.json(error);
    } else {
      console.log("done");
      res.status(200);
      res.json(response);
    }
  });
};

module.exports.add = function (req, res) {
  var student_followup = req.body;
  console.log("followup");
  StudentFollowups.create(student_followup, function (err, response) {
    if (err) {
      console.log("error", err);
      res.status(200);
      res.json({ success: false, message: "All entries are required !" });
    } else {
      res.json({ success: true, response });
    }
  });
};

//////subdocument-controller//////////
var addFollowups = function (req, res, followup) {
  followup.followups.push({
    start_date: req.body.start_date,
    follow_next_date: req.body.follow_next_date,
    status_type: req.body.status_type,
    description: req.body.description,
  });

  followup.save(function (err, followupAdded) {
    if (err) {
      res.status(500);
      res.json({ success: false, message: "All fields are required" });
    } else {
      res.status(201);
      res.json({ success: true, response: followupAdded.followups });
    }
  });
};

module.exports.getOneFollowup = function (req, res) {
  var followupId = req.body.id;
  console.log("hii", req.body.id, "sss");

  StudentFollowups.findById(ObjectId(followupId))
    .select("followups")
    .exec(function (err, docs) {
      var response = { status: 200, message: [] };
      if (err) {
        console.log("error in finding hotel");
        response.status = 500;
        response.message = err;
      } else if (!docs) {
        console.log("followup id not found");
        response.status = 404;
        response.message = {
          message: "followup id not found ",
        };
      }
      if (docs) {
        addFollowups(req, res, docs);
      } else {
        res.status(response.status);
        res.json(response.message);
      }
    });
};
