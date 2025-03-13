const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const contactDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Ms", "Dr"], // Add more titles if necessary
    },
    contactName: {
        type: String,
        required: true,
    },
    contactDOB: {
        type: Date,
    },
    designation: {
        type: String,
    },
    phoneCountryCode: {
        type: String,
        default: "91", // Default to India (91), can be changed
    },
    contactPhoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
});

const contractorBidderSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    licenceHolderName: {
        type: String,
        required: true,
    },

    registrationNumber: {
        type: String,
        required: true,
    },
    registeredAddress: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    panNumber: {
        type: String,
        required: true,
        match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // PAN number format validation
    },

    contactDetails: {
        type: contactDetailsSchema, // Embedded contact details schema
        required: true,
    },
});

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: function () {
                return this.role === "Citizen";
            },
        },
        email: {
            type: String,
            required: function () {
                return this.role === "Citizen";
            },
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["Citizen", "Contractor", "Government Authority", "Admin"],
            default: "Citizen",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        avatar: {
            type: String,
            default: "https://randomuser.me/api/portraits/men/9.jpg",
        },
        phoneNumber: {
            type: String,
            match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
        },
        address: {
            type: String,
            trim: true,
        },
        contractorOrBidderDetails: {
            type: contractorBidderSchema, // Conditional sub-document schema for contractor/bidder
            required: function () {
                return this.role === "Contractor";
            },
        },
        department: {
            type: String,
            required: function () {
                return this.role === "Government Authority";
            },
        },
        position: {
            type: String,
            required: function () {
                return this.role === "Government Authority";
            },
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
