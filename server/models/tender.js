const mongoose = require("mongoose");

const tenderSchema = new mongoose.Schema(
    {
        project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

        organisationChain: { type: String, required: true },
        tenderReferenceNumber: { type: String, default: "REF" + Date.now(), unique: true },
        tenderID: { type: String, default: "TND" + Date.now(), unique: true },
        tenderCategory: { type: String, enum: ["Works", "Goods", "Services", "Consultancy"], required: true },
        tenderLocation: { type: String, required: true },

        paymentMode: { type: String, enum: ["Online", "Offline"], required: true },

        covers: [{ type: String }],
        tenderFee: { type: Number, required: true },
        workItemDetails: {
            title: { type: String },
            description: { type: String },
            tenderValue: { type: Number },
            location: { type: String },
        },
        criticalDates: {
            publishedDate: { type: Date, default: Date.now() },
            bidOpeningDate: { type: Date },
            bidSubmissionEndDate: { type: Date },
        },
        status: {
            type: String,
            enum: ["open", "closed", "cancelled", "awarded", "started", "completed"],
            default: "open",
        },

        awardedBid: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" }, // Stores the winning bid
        awardedContractor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Stores the contractor who won

        progress: { type: Number, default: 0 }, 

        progressUpdates: [
            {
                progress: { type: Number, default: 0 }, // 0 to 100%
                comment: { type: String },
                attachment: { type: String }, // Optional file/image URL
                date: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const Tender = mongoose.model("Tender", tenderSchema);
module.exports = Tender;
