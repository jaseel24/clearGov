const express = require("express");
const tenderController = require("../controllers/tender.controller");
const authenticate = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const upload = require("../middleware/multer");
const router = express.Router();

router.get("/tenders", tenderController.tenders);
router.post("/tender", authenticate, checkRole(["Government Authority", "Admin"]), tenderController.createTender);
router.put("/tender/:tenderId/start", authenticate, tenderController.startProject);
router.put("/tender/:tenderId/progress", authenticate, upload.single("attachment"), tenderController.updateProgress);
router.get("/tender/:id", tenderController.tenderById);
router.get("/tender", tenderController.tenderByFilter);
router.get("/filter/:filterType", tenderController.tenderView);

module.exports = router;
