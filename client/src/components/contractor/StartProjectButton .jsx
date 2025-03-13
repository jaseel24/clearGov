import React, { useState } from "react";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";

const StartProjectButton = ({ tenderId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleStartProject = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.put(`/tender/tender/${tenderId}/start`);
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error starting project:", error);
            toast.error(error.response?.data?.error || "Failed to start project");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=" ">
               
                <button
                    onClick={handleStartProject}
                    disabled={isLoading}
                    className={` px-3 bg-blue-100 text-blue-800 py-1 rounded-full  transition duration-300 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {isLoading ? "Starting..." : "Start Project"}
                </button>
        </div>
    );
};

export default StartProjectButton;