var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

var Tasks = mongoose.model("Task");

module.exports.get_all = function (req, res) {
  var user = req.user;

  Tasks.find({ user: user }).exec(function (err, response) {
    if (err) {
      console.log("err");
      res.status(400);
      res.json({ success: false });
    } else {
      res.status(200);
      res.json({ success: true, response });
    }
  });
};
