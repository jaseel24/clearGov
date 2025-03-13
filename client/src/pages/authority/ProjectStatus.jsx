import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingEffect/LoadingSpinner";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";

const ProjectStatus = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch project details
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axiosInstance.get(`/govauth/project/${projectId}`);
                setProject(response.data.project);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch project details");
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    // Handle project status update
    const handleCompleteProject = async () => {
        try {
            const response = await axiosInstance.put(`/govauth/projects/${projectId}/complete`);
            setProject(response.data);
            toast.success("Project status updated to Completed!");
        } catch (err) {
            toast.error(err.response.data.error);
        }
    };

    if (loading)
        return (
            <div className="text-center py-8">
                <LoadingSpinner />
            </div>
        );
    if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Project Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600">
                    <h1 className="text-2xl font-bold text-white">{project.projectScope}</h1>
                    <p className="text-sm text-white opacity-90">{project.projectLocation}</p>
                </div>

                {/* Project Stats */}
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Overall Progress */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700">Overall Progress</h3>
                            <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{project.progress}% completed</p>
                            </div>
                        </div>

                        {/* Project Status */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700">Project Status</h3>
                            <p className="text-sm text-gray-600 mt-2 capitalize">{project.status}</p>
                        </div>
                    </div>

                    {/* Tenders Progress */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700">Tenders Progress</h3>
                        <div className="mt-4 space-y-4">
                            {project.tenders?.map((tender) => (
                                <div key={tender._id} className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-md font-medium text-gray-700">
                                        {tender.tenderReferenceNumber}
                                    </h4>
                                    <div className="mt-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-green-600 h-2.5 rounded-full"
                                                style={{ width: `${tender.progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{tender.progress}% completed</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Complete Project Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleCompleteProject}
                            disabled={project.status === "Completed"}
                            className={`w-full sm:w-auto px-6 py-2 rounded-md  font-semibold ${
                                project.status === "Completed"
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-100 text-green-800 hover:text-green-800"
                            }`}
                        >
                            {project.status === "Completed" ? "Project Completed" : "Mark as Completed"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectStatus;
