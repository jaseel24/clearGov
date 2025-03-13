const Project = require("../models/project");
// const Expense = require('../models/Expense');
const Bid = require("../models/bidModel");
const Tender = require("../models/tender");
const Report = require("../models/report");

/////////////////////////// Create Project ////////////////////////

exports.createProject = async (req, res) => {
    try {
        let { projectScope, budget, objectives, organisationChain, projectLocation } = req.body;

        console.log(req.body);

        // Ensure objectives is an array by splitting if it's a string
        if (typeof objectives === "string") {
            objectives = objectives.split(",").map((obj) => obj.trim()); // Split and trim each objective
        }

        const project = await Project.create({
            projectScope,
            budget,
            objectives,
            organisationChain,
            projectLocation,
            createdBy: req.user.userId,
        });
        console.log(project);
        await project.save();
        res.status(201).json({ message: "Success", project });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

/////////////////////////////  GET ALL PROJECTS /////////////////////////

module.exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("tenders");
        res.status(200).json({ message: "Success", projects });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

////////////////////////// GET SPECIFIC PROJECT BY ID ////////////////////////

module.exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("tenders");
        if (!project) return res.status(404).json({ error: "Project not found" });
        res.status(200).json({ message: "Success", project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

////////////////////////////// UPDATE PROJECT DETAILS ///////////////////////////

module.exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ error: "Project not found" });
        res.status(200).json({ message: "Success", project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/////////////////////////////////// DELETE A PROJECT ////////////////////////

module.exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ error: "Project not found" });
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Project Monitors
module.exports.getProjectProgress = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: "Project not found" });
        res.status(200).json({ progress: project.progress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

////////////////////// GET BIDS ON TENDER /////////////////////////////

module.exports.bids = async (req, res) => {
    try {
        const bids = await Bid.find({ bidStatus: "Submitted" }).populate("tender").populate("contractor");
        res.status(200).json({ message: "success", bids });
    } catch (error) {
        res.status(500).json({ message: "Error fetching bids under review", error: error.message });
    }
};

////////////////////////////// GET ALL BIDS ////////////////////////////

module.exports.getAllBids = async (req, res) => {
    try {
        const bids = await Bid.find().populate("tender").populate("contractor");
        res.status(200).json({ message: "success", bids });
    } catch (error) {
        res.status(500).json({ message: "Error fetching bids under review", error: error.message });
    }
};

/////////////////////////////// APPROVE BID ////////////////////////////

module.exports.approveBid = async (req, res) => {
    try {
        const { tenderId, bidId } = req.params;

        // Find the bid
        const bid = await Bid.findById(bidId).populate("contractor");
        if (!bid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        // Update the tender with the awarded bid and contractor
        const updatedTender = await Tender.findByIdAndUpdate(
            tenderId,
            {
                awardedBid: bid._id,
                awardedContractor: bid.contractor._id,
                status: "awarded",
            },
            { new: true }
        ).populate("awardedBid awardedContractor");

        if (!updatedTender) {
            return res.status(404).json({ message: "Tender not found" });
        }

        // Update the bid status
        await Bid.findByIdAndUpdate(bidId, { bidStatus: "Accepted" });

        res.status(200).json({
            message: "Tender awarded successfully",
            tender: updatedTender,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports.updateProjectStatus = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Find the project by ID and populate its tenders
        const project = await Project.findById(projectId).populate("tenders");
        if (!project) return res.status(404).json({ error: "Project not found" });

        // Check if all tenders are completed (progress === 100)
        const allTendersCompleted = project.tenders.every((t) => t.progress === 100);
        console.log(allTendersCompleted);
        
        

        if (!allTendersCompleted || project.tenders.length === 0) {
            return res.status(400).json({ error: "Cannot complete project: Not all tenders are completed or No tenders are available" });
        }

        // Update the project status to "Completed"
        project.status = "Completed";
        await project.save();

        await Tender.updateMany({ project: projectId }, { $set: { status: "closed" } });

        res.json({ message: "Project status updated to Completed", project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports.userReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json({ message: "success", reports });
    } catch (error) {
        res.status(500).json({ message: "failed", error: error.message });
    }
};
