import React, { useState } from "react";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingEffect/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const UpdateProgressForm = ({ tenderId, tender }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        progress: "",
        comment: "",
        attachment: null,
    });
    

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "attachment") {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append("progress", formData.progress);
        data.append("comment", formData.comment);
        if (formData.attachment) {
            data.append("attachment", formData.attachment);
        }

        axiosInstance
            .put(`/tender/tender/${tenderId}/progress`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                toast.success(res.data.message);
                setFormData({ progress: "", comment: "", attachment: null }); // Reset form
                setIsLoading(false);
                window.location.replace('/contractor')
            })
            .catch((err) => {
                console.error("Error updating progress:", err);
                toast.error(err.response?.data?.error || "Failed to update progress");
                if (err.status === 401) {
                    navigate("/login");
                }
                setIsLoading(false);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            {isLoading && <LoadingSpinner />}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Project Progress</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Progress Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
                        <input
                            type="number"
                            name="progress"
                            value={formData.progress}
                            onChange={handleChange}
                            min={tender?.progress + 1}
                            max="100"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Comment Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Comment</label>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                        />
                    </div>

                    {/* Attachment Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Attachment (Optional)</label>
                        <input
                            type="file"
                            name="attachment"
                            onChange={handleChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading ? "Updating..." : "Update Progress"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProgressForm;
