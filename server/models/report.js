const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        location: {
            lat: String,
            lng: String,
        },
        address: {
            type: String,
        },
        content: {
            type: String,
        },
        place: {
            type: String,
        },
        attachments: [
            {
                name: String,
                media: String,
            },
        ],

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        reportedAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
