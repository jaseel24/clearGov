const User = require("../models/user");
const Tender = require("../models/tender");

// User Management
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "success", users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.approveUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(id, { status: "Approved" });
        res.status(200).json({ message: "User approved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.rejectUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(id, { status: "Rejected" });
        res.status(200).json({ message: "User rejected successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.deleteUser = async (req, res) => {
    console.log("hello from delete user");
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        await User.findByIdAndUpdate(id, { role });
        res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.toggleUserStatus = async (req, res) => {
    console.log("hello from toggleStatus");
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        const newStatus = user.isActive ? false : true;
        await User.findByIdAndUpdate(id, { isActive: newStatus });
        res.status(200).json({ message: `User status updated to ${newStatus ? "Active" : "Inactive"}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tender Management
module.exports.createTender = async (req, res) => {
    try {
        const tender = await Tender.create(req.body);
        res.status(201).json(tender);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllTenders = async (req, res) => {
    try {
        const tenders = await Tender.find();
        res.status(200).json(tenders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateTender = async (req, res) => {
    const { id } = req.params;
    try {
        const tender = await Tender.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(tender);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteTender = async (req, res) => {
    const { id } = req.params;
    try {
        await Tender.findByIdAndDelete(id);
        res.status(200).json({ message: "Tender deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getTenderSubmissions = async (req, res) => {
    const { id } = req.params;
    try {
        const tender = await Tender.findById(id).populate("submissions");
        res.status(200).json(tender.submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reports & Analytics
module.exports.getTenderReports = async (req, res) => {
    // Implement report generation logic here
};

module.exports.getUserReports = async (req, res) => {
    // Implement report generation logic here
};

// System Configurations
module.exports.addCategory = async (req, res) => {
    // Implement category addition logic here
};

module.exports.getCategories = async (req, res) => {
    // Implement fetching categories logic here
};
