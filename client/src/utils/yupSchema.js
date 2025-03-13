import * as yup from "yup";

export const registerSchema = yup.object({
    username: yup.string().min(3).required("Username is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export const loginSchema = yup.object({
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

// export const contractorRegisterSchema = yup.object({
//     loginId: yup.string().email("Enter a valid email address for Login ID").required("Login ID is required"),
//     email: yup
//         .string()
//         .email("Enter a valid email address for Correspondence Email")
//         .required("Correspondence Email is required"),
//     username: yup.string().required("Username is required!"),
//     password: yup.string().required("Password is required!"),
//     mobile: yup
//         .string()
//         .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
//         .required("Mobile is required"),
//     companyName: yup.string().required("Company Name is required"),
//     licenceHolderName: yup.string().required("Licence Holder Name is required"),
//     registrationNumber: yup.string().required("Registration Number is required"),
//     registeredAddress: yup.string().required("Registered Address is required"),
//     partnersOrDirectors: yup.string().nullable(), // Can be nullable if optional
//     bidderType: yup.string().oneOf(["Indian", "Foreign"], "Bidder Type must be Indian or Foreign").required(),
//     city: yup.string().required("City is required"),
//     state: yup.string().required("State is required"),
//     postalCode: yup
//         .string()
//         .matches(/^\d{6}$/, "Postal Code must be exactly 6 digits")
//         .required("Postal Code is required"),
//     panNumber: yup
//         .string()
//         .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN number must be valid, e.g., AESTG2458A")
//         .required("PAN Number is required"),
//     establishmentYear: yup
//         .number()
//         .min(1900, "Establishment Year must be greater than 1900")
//         .max(new Date().getFullYear(), "Establishment Year cannot be in the future")
//         .required("Establishment Year is required"),
//     natureOfBusiness: yup.string().required("Nature of Business is required"),
//     legalStatus: yup.string().required("Legal Status is required"),
//     companyCategory: yup.string().nullable(), // Can be nullable if optional

//     // Contact Details
//     contactTitle: yup
//         .string()
//         .required("Contact Title is required")
//         .oneOf(["Mr", "Mrs", "Ms", "Dr"], "Title must be Mr, Mrs, Ms, or Dr"),
//     contactName: yup.string().required("Contact Name is required"),
//     contactDOB: yup
//         .date()
//         .required("Date of Birth is required")
//         .max(new Date(), "Date of Birth cannot be in the future"),
//     contactDesignation: yup.string().required("Designation is required!"), // Can be nullable if optional
//     contactPhoneNumber: yup
//         .string()
//         .required("Phone Number is required")
//         .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
// });
export const contractorRegisterSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    contractorOrBidderDetails: yup.object().shape({
        companyName: yup.string().required("Company Name is required"),
        licenceHolderName: yup.string().required("Licence Holder Name is required"),
        registrationNumber: yup.string().required("Registration Number is required"),
        registeredAddress: yup.string().required("Registered Address is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        postalCode: yup
            .string()
            .matches(/^\d{6}$/, "Postal code must be 6 digits")
            .required("Postal Code is required"),
        panNumber: yup
            .string()
            .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Number format")
            .required("PAN Number is required"),
        contactDetails: yup.object().shape({
            title: yup.string().oneOf(["Mr", "Mrs", "Ms", "Dr"], "Invalid title").required("Title is required"),
            contactName: yup.string().required("Contact Name is required"),
            contactDOB: yup.date().required("Date of Birth is required"),
            contactPhoneNumber: yup
                .string()
                .matches(/^\d{10}$/, "Phone number must be 10 digits")
                .required("Phone Number is required"),
        }),
    }),
});

export const tenderFormSchema = yup.object({
    organisationChain: yup.string().required("Organisation Chain is required."),

    project: yup.string().required("Project ID is required."),

    tenderCategory: yup.string().required("Tender Category is required."),

    tenderLocation: yup.string().required("Tender Location is required."),

    paymentMode: yup.string().required("Payment Mode is required."),

    covers: yup.array().of(yup.string().required("Cover is required.")).min(1, "At least one cover is required."),
    tenderFee: yup.number().required("Tender Fee is required.").positive("Tender Fee must be positive."),

    workItemDetails: yup.object().shape({
        title: yup.string().required("Work Title is required."),

        description: yup.string().required("Work Description is required."),

        tenderValue: yup.number().required("Tender Value is required.").positive("Tender Value must be positive."),

        location: yup.string().required("Location is required."),
    }),

    criticalDates: yup.object().shape({
        bidOpeningDate: yup.date().required("Bid Opening Date is required."),
        bidSubmissionEndDate: yup.date().required("Bid Submission End Date is required."),
    }),
});

export const authorityRegisterSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    phoneNumber: yup
        .string()
        .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
        .required("Phone number is required"),
    address: yup.string().required("Address is required"),
    department: yup.string().required("Department is required"),
    position: yup.string().required("Position is required"),
});
