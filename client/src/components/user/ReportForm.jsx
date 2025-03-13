import React, { useEffect, useState } from "react";
import axios from "../../config/axios.config";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingEffect/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const ReportForm = ({ location, address }) => {
    console.log(address);

    const [formData, setFormData] = useState({
        location: address || "",
        content: "",
        place: "",
        attachments: [],
        isSubmitting: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            location: address || "",
        }));
    }, [address]);

    console.log(location);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevState) => ({
            ...prevState,
            attachments: [...prevState.attachments, ...files],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData((prevState) => ({ ...prevState, isSubmitting: true }));

        const formDataToSend = new FormData();
        formDataToSend.append("location", JSON.stringify(location));
        formDataToSend.append("content", formData.content);
        formDataToSend.append("address", address || location);
        formDataToSend.append("place", formData.place);
        formData.attachments.forEach((file) => formDataToSend.append("attachments", file));

        try {
            for (let [key, value] of formDataToSend.entries()) {
                console.log(key, value);
            }
            const response = await axios.post("/user/reports", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Report submitted successfully!");
            console.log(response.data);
        } catch (error) {
            if (error.status === 401) {
                toast.error("Session expired!");
                navigate("/login");
            } else {
                toast.error("Error submitting report");
            }
            console.error(error);
        } finally {
            setFormData({ location: "", content: "", attachments: [], isSubmitting: false });
        }
    };

    console.log(location);

    return (
        <div className="min-h-screen  sidebar  py-4 px-4 sm:px-6 lg:px-8">
            {formData.isSubmitting && <LoadingSpinner />}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                    <h1 className="text-2xl font-bold text-white">Submit a Report</h1>
                    <p className="text-sm text-blue-200">Provide details about the issue you want to report.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Location Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            disabled
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Select location from map"
                            className="w-full placeholder:text-gray-600 placeholder:font-bold  p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            name="place"
                            value={formData.place}
                            onChange={handleInputChange}
                            placeholder="Enter location manually"
                            className="w-full placeholder:text-gray-600 placeholder:font-bold  p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required={!formData.location}
                        />
                    </div>

                    {/* Content Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Describe the issue..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        />
                    </div>

                    {/* Attachments Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept="image/*, video/*"
                            required
                        />
                        <div className="mt-4 flex flex-wrap gap-4">
                            {formData.attachments.map((file, index) => (
                                <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden">
                                    {file.type.startsWith("image") ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Attachment ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <video
                                            src={URL.createObjectURL(file)}
                                            className="w-full h-full object-cover"
                                            controls
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={formData.isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
                        >
                            {formData.isSubmitting ? "Submitting..." : "Submit Report"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportForm;
