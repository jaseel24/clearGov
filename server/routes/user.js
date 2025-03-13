const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticate = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const upload = require("../middleware/multer");

// router.get("/users", authenticate, checkRole(["Admin"]), userController.users);
router.get("/users", userController.users);
router.get("/user/:id", userController.userById);
router.put("/users/:id/status", authenticate, checkRole(["Admin"]), userController.user);
// router.put('/update-profile-picture',upload.single("image"),userController.updateProfile)
router.put("/update", authenticate, upload.single("avatar"), userController.updateUserProfile);
router.post("/reports", authenticate, checkRole(["Citizen"]), upload.any("attachments"), userController.report);
router.get("/myreports", authenticate, userController.myReports);
router.get("/project-progress", authenticate, userController.projectProgress);

module.exports = router;
