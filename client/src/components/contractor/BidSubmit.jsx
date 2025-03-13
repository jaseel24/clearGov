import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingEffect/LoadingSpinner";

const BidSubmit = ({ tenderId, covers, tValue }) => {
    const [formData, setFormData] = useState({
        bidAmount: "",
        proposal: "",
        paymentMode: "Online",
        emdAmount: "",
        emdTransactionId: "",
        emdPaymentDate: "",
        bidValidityDays: "",
        covers: [],
        // notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [files, setFiles] = useState({});

    // Handle file input change
    const handleFileChange = (fieldName) => (e) => {
        console.log("file change");
        setFiles({ ...files, [fieldName]: e.target.files[0] });
    };

    console.log(files);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const formDataToSend = new FormData();

        // Append files to FormData
        Object.keys(files).forEach((key) => {
            formDataToSend.append(key, files[key]);
        });

        // Append other form data
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            axiosInstance
                .post(`/contractor/tenders/${tenderId}/bid`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res);
                    setSuccess("Bid submitted successfully!");
                    setFormData({
                        bidAmount: "",
                        proposal: "",
                        paymentMode: "Online",
                        emdAmount: "",
                        emdTransactionId: "",
                        emdPaymentDate: "",
                        covers: [],
                        // notes: "",
                    });
                    setLoading(false);
                    scrollToTop();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.message);
                    setError("Failed to submit bid. Please try again.");
                    setLoading(false);
                    scrollToTop();
                });
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    console.log(loading);

    return (
        <div className="bg-white p-6 rounded-lg ">
            {loading && <LoadingSpinner />}
            <h2 className="text-2xl font-bold mb-4">Submit Bid</h2>
            {error && <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-600 p-3 rounded-md mb-4">{success}</div>}

            <form onSubmit={handleSubmit}>
                {/* Bid Amount */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Bid Amount (The tender value is {tValue})
                    </label>
                    <input
                        type="number"
                        name="bidAmount"
                        value={formData.bidAmount}
                        onChange={handleChange}
                        max={tValue}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Proposal */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Proposal</label>
                    <textarea
                        name="proposal"
                        value={formData.proposal}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        rows="4"
                        required
                    />
                </div>

                {/* Payment Mode */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                    <select
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>

                {/* EMD Amount */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">EMD Amount</label>
                    <input
                        type="number"
                        name="emdAmount"
                        value={formData.emdAmount}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* EMD Transaction ID */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">EMD Transaction ID</label>
                    <input
                        type="text"
                        name="emdTransactionId"
                        value={formData.emdTransactionId}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* EMD Payment Date */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">EMD Payment Date</label>
                    <input
                        type="date"
                        name="emdPaymentDate"
                        value={formData.emdPaymentDate}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Cover Documents */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Cover Documents</label>
                    {covers.map((cover, i) => {
                        return (
                            <div key={i}>
                                <p>{cover}</p>
                                <input
                                    type="file"
                                    onChange={handleFileChange(cover)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Notes */}
                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        rows="2"
                    />
                </div> */}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    {loading ? "Submitting..." : "Submit Bid"}
                </button>
            </form>
        </div>
    );
};

export default BidSubmit;
