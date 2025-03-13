// controllers/contractorController.js
const Tender = require("../models/tender");
const Bid = require("../models/bidModel");
const Expense = require("../models/expense");

const cloudinary = require("../config/cloudinary.config");

// View all tenders
module.exports.viewAllTenders = async (req, res) => {
    try {
        const tenders = await Tender.find(); // Fetch only open tenders
        res.status(200).json({ success: true, data: tenders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching tenders", error: error.message });
    }
};

// View a specific tender
module.exports.viewTenderDetails = async (req, res) => {
    try {
        const tender = await Tender.findOne({tenderID: req.params.id});
        if (!tender) {
            return res.status(404).json({ success: false, message: "Tender not found" });
        }
        res.status(200).json({ success: true, data: tender });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching tender details", error: error.message });
    }
};

// Submit a bid for a tender
module.exports.submitBid = async (req, res) => {
    try {
        const { bidAmount, proposal, paymentMode, emdAmount, emdTransactionId, emdPaymentDate } = req.body;

        const tenderId = req.params.id;

        const isBidded = await Bid.findOne({ tender: tenderId, contractor: req.user.userId });

        console.log(isBidded);

        if (!isBidded) {
            let covers = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                covers.push({
                    coverName: file.fieldname,
                    document: result.secure_url,
                });
            }

            // Create a new bid
            const bid = new Bid({
                contractor: req.user.userId,
                tender: tenderId,
                bidAmount: bidAmount,
                proposal,
                paymentMode,
                emdAmount,
                emdPaymentDetails: { paymentDate: emdPaymentDate, transactionId: emdTransactionId },
                covers,
            });
            await bid.save();
            res.status(201).json({ success: true, message: "Bid submitted successfully", data: bid });
        } else {
            res.status(409).json({ success: false, message: "Bid already submitted to this tender!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error submitting bid", error: error.message });
    }
};

// View all bids submitted by the contractor
module.exports.viewMyBids = async (req, res) => {
    try {
        const contractorId = req.user.userId; // Assuming contractor ID is available in the request (e.g., from authentication middleware)
        const bids = await Bid.find({ contractor: contractorId }).populate("tender");
        res.status(200).json({ success: true, bids });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching bids", error: error.message });
    }
};

// View details of a specific bid
module.exports.viewBidDetails = async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.id).populate("tender");
        if (!bid) {
            return res.status(404).json({ success: false, message: "Bid not found" });
        }
        res.status(200).json({ success: true, bid });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching bid details", error: error.message });
    }
};

// Withdraw a bid
module.exports.withdrawBid = async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.id);
        if (!bid) {
            return res.status(404).json({ success: false, message: "Bid not found" });
        }

        await Bid.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Bid withdrawn successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error withdrawing bid", error: error.message });
    }
};

module.exports.upComingDeadlines = async (req, res) => {
    console.log('from upcoming');
    try {
        const today = new Date();
        const sevenDaysLater = new Date(today);
        sevenDaysLater.setDate(today.getDate() + 7);

        const tenders = await Tender.find({
            "criticalDates.bidSubmissionEndDate": { $gte: today, $lte: sevenDaysLater }, // Deadlines within the next 7 days
        }).sort({ "criticalDates.bidSubmissionEndDate": 1 }); // Sort by deadline (ascending)

        res.status(200).json(tenders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports.expense = async (req, res) => {
    try {
        const { date, description, amount } = req.body;

        const result = await cloudinary.uploader.upload(req.file.path);

        const newExpense = new Expense({
            date,
            contractor: req.user.userId,
            description,
            amount,
            file: result.secure_url,
        });
        await newExpense.save();
        res.status(201).json({ message: "success", newExpense });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.myExpenses = async (req, res) => {
    try {
        const userId = req.user.userId;
        const expenses = await Expense.find({ contractor: userId });

        if (expenses.length) {
            return res.status(200).json({ message: "success", expenses });
        } else {
            return res.status(400).json({ message: "Expense not found" });
        }
    } catch (error) {}
};

module.exports.TendersWon = async (req, res) => {
    console.log("hi from won tenders");
    try {
        // Find all tenders where this contractor has been awarded
        const wonTenders = await Tender.find({ awardedContractor: req.user.userId })
            .populate("awardedBid awardedContractor")
            .exec();
        res.status(200).json({ tenders: wonTenders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
