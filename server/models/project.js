const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        projectScope: { type: String, required: true },
        organisationChain: { type: String, required: true },
        projectLocation: { type: String, required: true },
        objectives: { type: [String], required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        budget: { type: Number, required: true },
        tenders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tender" }],

        assignedContractors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Stores multiple contractors

        status: {
            type: String,
            enum: ["Not Started", "In Progress", "Completed"],
            default: "Not Started",
        },

        progress: { type: Number, default: 0 }, // Tracks overall project progress (0 - 100%)

        progressUpdates: [
            {
                progress: { type: Number, default: 0 },
                comment: { type: String },
                attachment: { type: String }, // Optional file/image URL
                date: { type: Date, default: Date.now },
            }
        ]
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
