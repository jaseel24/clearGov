const User = require("../models/user");
const cloudinary = require("../config/cloudinary.config");
const Report = require("../models/report");
const Project = require("../models/project");

module.exports.users = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ message: "this is a protected route", users });
    } catch (error) {
        console.log(error);
    }
};

/////////////////////////// USER BY ID ///////////////////////////////

module.exports.userById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        console.log(user);
        res.json({ message: "user details fetched successfully ", user });
    } catch (error) {
        console.log(error);
    }
};

///////////////////////////// UPDATE USER STATUS ///////////////////////////////

module.exports.user = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { isActive: isActive }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User status updated successfully.", user });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating user status.", error: error.message });
    }
};

module.exports.updateProfile = async (req, res) => {
    console.log(req.file);

    // console.log(req.file);
};

module.exports.report = async (req, res) => {
    console.log(req.body);

    try {
        const { location, content, address, place } = req.body;
        
        const parsedLocation = JSON.parse(location); // Convert location from string to object
        let attachments = [];
        // Loop through each file and upload to Cloudinary
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            attachments.push({
                name: file.fieldname,
                media: result.secure_url,
            });
        }
        // Create report in database
        const newReport = new Report({
            location: parsedLocation,
            content,
            place,
            address: address,
            attachments: attachments,
            reportedBy: req.user.userId,
        });
        await newReport.save();
        res.status(201).json({ message: "Report submitted successfully!", report: newReport });
    } catch (error) {
        console.error("Error submitting report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.myReports = async (req, res) => {
    try {
        const userId = req.user.userId;
        const reports = await Report.find({ reportedBy: userId }).populate("reportedBy");
        if (reports.length > 0) {
            res.status(200).json({ message: "reports fetched success!", reports });
        } else {
            res.status(404).json({ message: "reports not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateUserProfile = async (req, res) => {
    const {
        username,
        email,
        phoneNumber,
        address,
        position,
        department,
        contractorOrBidderDetails, // For Contractors
    } = req.body;

    try {
        // Find the user by ID (assuming the user ID is stored in req.user.userId after authentication)
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let result;

        // Upload new avatar to Cloudinary if a file is provided
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        // Update common user fields
        user.username = username || user.username;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.address = address || user.address;
        user.avatar = result?.secure_url || user.avatar;

        // Role-specific updates
        switch (user.role) {
            case "Government Authority":
                user.position = position || user.position;
                user.department = department || user.department;
                break;

            case "Contractor":
                if (contractorOrBidderDetails) {
                    user.contractorOrBidderDetails = {
                        ...user.contractorOrBidderDetails,
                        ...contractorOrBidderDetails,
                    };
                }
                break;

            // Add cases for other roles if needed
            default:
                break;
        }

        // Save the updated user
        const updatedUser = await user.save();
        res.status(200).json({ message: "User updated successfully!", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.projectProgress = async (req, res) => {
    try {
        const projects = await Project.aggregate([
            {
                $project: {
                    _id: 0,
                    projectScope: 1,
                    progress: 1,
                },
            },
        ]);

        res.status(200).json({
            message: "Successfully fetched project progress.",
            data: projects,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching project progress",
            error: error.message,
        });
    }
};
