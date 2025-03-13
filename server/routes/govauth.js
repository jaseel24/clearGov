const express = require("express");
const govauthController = require("../controllers/govAuth.controller");
const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/project", verifyToken, checkRole(["Government Authority"]), govauthController.createProject);
router.get("/projects", verifyToken, govauthController.getProjects);
router.get("/project/:id", verifyToken, govauthController.getProjectById);
router.put("/project/:id", verifyToken, checkRole(["Government Authority", "Admin"]), govauthController.updateProject);
router.delete(
    "/project/:id",
    verifyToken,
    checkRole(["Government Authority", "Admin"]),
    govauthController.deleteProject
);
router.get("/bids", verifyToken, checkRole(["Government Authority"]), govauthController.bids);
router.get("/all-bids", verifyToken, checkRole(["Government Authority"]), govauthController.getAllBids);
router.put(
    "/tender/:tenderId/award/:bidId",
    verifyToken,
    checkRole(["Government Authority"]),
    govauthController.approveBid
);
router.put(
    "/projects/:projectId/complete",
    verifyToken,
    checkRole(["Government Authority"]),
    govauthController.updateProjectStatus
);

router.get("/user-reports", verifyToken, govauthController.userReports);

module.exports = router;
