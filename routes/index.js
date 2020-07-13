var express = require("express");
var router = express.Router();
var ctrl_master = require("../API/Controllers/Admin/master_controller");
var ctrl_category_admin = require("../API/Controllers/Admin/category_controller");
var ctrl_category_user = require("../API/Controllers/User/category_controller.js");
var ctrl_followup_admin = require("../API/Controllers/Admin/followup_controller.js");
var ctrl_followup_user = require("../API/Controllers/User/followup_controller.js");
var ctrl_tasks = require("../API/Controllers/User/task_controller.js");
var ctrl_users = require("../API/Controllers/users_controller.js");
const { route } = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/////MASTER ROUTES//////
router.route("/masters/:master").get(ctrl_master.get_all);
router.route("/masters/:master/add").post(ctrl_master.add);
router.route("/masters/:master/delete_one").post(ctrl_master.delete_one);
router.route("/masters/:master/edit").post(ctrl_master.edit);

////CATEGORY ROUTES - ADMIN/////
router.route("/admin/campaign/:campaign_name").get(ctrl_category_admin.get_all);
router.route("/admin/category").get(ctrl_category_admin.get_all_data);
router
  .route("/admin/campaign/:campaign_name/add")
  .post(ctrl_category_admin.add);
router.route("/admin/category/add").post(ctrl_category_admin.add_student);
router.route("/admin/category/assign_to").post(ctrl_category_admin.assign);
router.route("/admin/category/delete_one").post(ctrl_category_admin.delete_one);

///CATEGORY ROUTES - USERS/////
router
  .route("/user/campaign/:campaign_name")
  .get(ctrl_users.authenticate, ctrl_category_user.get_all);
router
  .route("/user/category")
  .get(ctrl_users.authenticate, ctrl_category_user.get_all_data);
router
  .route("/user/campaign/:campaign_name/add")
  .post(ctrl_users.authenticate, ctrl_category_user.add);
router.route("/user/campaign/delete").post(ctrl_category_user.delete_one);
router
  .route("/user/category/add")
  .post(ctrl_users.authenticate, ctrl_category_user.add_student);
router.route("/user/category/edit").post(ctrl_category_user.edit);
////FOLLOWUP ROUTES - ADMIN/////
router.route("/admin/followup").get(ctrl_followup_admin.get_all);

///FOLLOWUP ROUTES - USERS/////
router
  .route("/user/followup")
  .get(ctrl_users.authenticate, ctrl_followup_user.get_all);

router.route("/followup/add").post(ctrl_followup_user.add);
router.route("/followup/followups/add").post(ctrl_followup_user.getOneFollowup);

///TASKS///
router.route("/user/tasks").get(ctrl_users.authenticate, ctrl_tasks.get_all);

///LOGIN - SIGNUP
router.route("/login").post(ctrl_users.login);
router.route("/register").post(ctrl_users.register);
router.route("/users").get(ctrl_users.get_all);

router.route("/send_mail").post(ctrl_users.send_mail);
router.route("/send_sms").post(ctrl_users.send_sms);
router.route("/send_call").post(ctrl_users.send_call);
router.route("/send_whatsapp").post(ctrl_users.send_whatsapp);

module.exports = router;
