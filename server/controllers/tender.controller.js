const Tender = require("../models/tender");
const Project = require("../models/project");
const cloudinary = require("../config/cloudinary.config");

////////////////// GET ALL TENDERS /////////////////////////////

module.exports.tenders = async (req, res) => {

    console.log("hello");
    try {
        const tenders = await Tender.find();
        console.log(tenders);
        res.status(200).json({ message: "success", tenders });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

//////////////////////// TENDER BY ID ///////////////////////////

module.exports.tenderById = async (req, res) => {
    console.log("sadkfjl");
    const tenderID = req.params.id;
    try {
        const tender = await Tender.findOne({ tenderID: tenderID });
        // const tender = await Tender.findById(tenderID);
        console.log(tender);

        res.status(200).json({ message: "success", tender });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

//////////////////////// TENDER BY FILTER //////////////////////////

module.exports.tenderByFilter = async (req, res) => {
    try {
        const { location, category } = req.query;

        let query = {};

        if (location) {
            query.tenderLocation = location;
        }
        if (category) {
            query.tenderCategory = category;
        }

        const tender = await Tender.find({ tenderCategory: "Works" });

        res.status(200).json({ message: "success", tender });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

///////////////////// TENDER BY FILTER ///////////////////////////

module.exports.tenderView = async (req, res) => {
    try {
        const filterType = req.params.filterType;

        const tenders = await Tender.aggregate([
            {
                // Group by tenderCategory
                $group: {
                    _id: `$${filterType}`, // Group by the tenderCategory field
                    tenders: { $sum: "$workItemDetails.tenderValue" }, // count the number of tenders in each category
                },
            },
            {
                // Project the output to desired format
                $project: {
                    // _id: 0, // Hide the _id field
                    // : "$_id", // Rename _id to category
                    tenders: 1, // Keep the count field
                },
            },
        ]);

        console.log(tenders);

        res.status(200).json({ message: "success", tenders });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

////////////////////////////// CREATE A TENDER //////////////////////////////

module.exports.createTender = async (req, res) => {
    try {
        const tender = await Tender.create(req.body);
        await Project.findByIdAndUpdate(req.body.project, { $push: { tenders: tender._id } });
        res.status(201).json({ message: "tender created successfully", tender });
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error.message });
    }
};

////////////////////////// START THE PROJECT /////////////////////

module.exports.startProject = async (req, res) => {
    try {
        const { tenderId } = req.params;
        const tender = await Tender.findById(tenderId);

        if (!tender) return res.status(404).json({ error: "Tender not found" });
        if (tender.awardedContractor.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        // Mark tender as started
        tender.status = "started";
        await tender.save();

        // Update the project status
        const project = await Project.findById(tender.project);
        if (!project) return res.status(404).json({ error: "Project not found" });

        project.status = "In Progress";
        if (!project.assignedContractors.includes(req.user.userId)) {
            project.assignedContractors.push(req.user.userId);
        }
        await project.save();

        res.json({ message: "Project started successfully", tender, project });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

//////////////////////////////////// UPDATE PROJECT PROGRESS /////////////////////////////////

module.exports.updateProgress = async (req, res) => {
    try {
        const { tenderId } = req.params;
        const { progress, comment } = req.body;

        console.log(req.body);
        const tender = await Tender.findOne({ tenderID: tenderId });

        if (!tender) return res.status(404).json({ error: "Tender not found" });
        if (tender.awardedContractor.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        // // Add progress update

        const newProgressUpdate = { progress, comment, attachment: result.secure_url, date: new Date() };

        tender.progressUpdates.push(newProgressUpdate);
        tender.progress = progress;

        await tender.save();

        // Update Project Progress
        const project = await Project.findById(tender.project).populate("tenders");
        if (!project) return res.status(404).json({ error: "Project not found" });

        const allProgress = project.tenders.map((t) => {
            const lastUpdate = t.progressUpdates[t.progressUpdates.length - 1];
            return lastUpdate ? lastUpdate.progress : 0;
        });

        const avgProgress = allProgress.reduce((sum, val) => sum + val, 0) / allProgress.length;
        project.progress = avgProgress;

        project.progressUpdates.push(newProgressUpdate);

        await project.save();

        res.json({ message: "Progress updated successfully", tender, project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
};
