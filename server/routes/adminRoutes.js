const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

// Middleware to check authentication and admin role
router.use(verifyToken, checkRole("Admin"));

// User Management
router.get("/users", adminController.getAllUsers);
router.put("/users/:id/approve", adminController.approveUser);
router.put("/users/:id/reject", adminController.rejectUser);
router.put("/users/:id/role", adminController.updateUserRole);
router.put("/users/:id/status", adminController.toggleUserStatus);
router.delete("/users/:id/delete", adminController.deleteUser);

// Tender Management
router.post("/tenders", adminController.createTender);
router.get("/tenders", adminController.getAllTenders);
router.put("/tenders/:id", adminController.updateTender);
router.delete("/tenders/:id", adminController.deleteTender);
router.get("/tenders/:id/submissions", adminController.getTenderSubmissions);

// Reports & Analytics
router.get("/reports/tenders", adminController.getTenderReports);
router.get("/reports/users", adminController.getUserReports);

// System Configurations
router.post("/categories", adminController.addCategory);
router.get("/categories", adminController.getCategories);

module.exports = router;
