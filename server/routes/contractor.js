const express = require("express");
const router = express.Router();
const contractorController = require("../controllers/contractor.controller");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/multer");

// View all tenders
router.get("/tenders",verifyToken, contractorController.viewAllTenders);

// View a specific tender
router.get("/tenders/:id",verifyToken, contractorController.viewTenderDetails);

// Submit a bid for a tender
router.post("/tenders/:id/bid", verifyToken, upload.any(), contractorController.submitBid);

// View all bids submitted by the contractor
router.get("/bids", verifyToken, contractorController.viewMyBids);

// View details of a specific bid
router.get("/bids/:id", verifyToken, contractorController.viewBidDetails);

// Withdraw a bid
router.delete("/bids/:id",verifyToken, contractorController.withdrawBid);
router.get("/upcoming-deadlines",verifyToken, contractorController.upComingDeadlines);

router.post("/expense", verifyToken, upload.single("file"), contractorController.expense);
router.get("/my-expenses", verifyToken, contractorController.myExpenses);
router.get("/won-tenders", verifyToken, contractorController.TendersWon);

module.exports = router;
