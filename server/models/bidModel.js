const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    // Reference to the Tender
    tender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tender",
      required: true,
    },

    // Reference to the Contractor (or User) submitting the bid
    contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a Contractor model
      required: true,
    },

    // Bid Details
    bidAmount: {
      type: Number,
      required: true,
    },
    proposal: {
      type: String,
      required: true,
    },
    bidStatus: {
      type: String,
      enum: ["Submitted", "Under Review", "Accepted", "Rejected"],
      default: "Submitted",
    },

    // Payment and Financial Details
    paymentMode: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    emdAmount: {
      type: Number,
      required: true,
    },
    emdPaymentDetails: {
      transactionId: { type: String },
      paymentDate: { type: Date },
    },



    // Covers (if applicable)
    covers: [
      {
        coverName: { type: String },
        document: { type: String }, // URL or file path to the uploaded document
      },
    ],


    // Timestamps
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;