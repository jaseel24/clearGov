import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../config/axios.config";

const ProjectProgress = ({ projectId }) => {
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch project and tender data
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`/govauth/project/${projectId}`);
                console.log(response);
                setProject(response.data.project);
            } catch (error) {
                toast.error("Error fetching project details");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    if (isLoading) {
        return <div className="text-center text-gray-600">Loading project details...</div>;
    }

    if (!project) {
        return <div className="text-center text-gray-600">Project not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Project Progress</h1>

                {/* Project Overview */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{project.projectScope}</h2>
                    <p className="text-gray-600 mb-4">{project.objectives.join(", ")}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <p className="text-gray-700 text-sm">
                        Overall Progress: <span className="font-semibold">{project.progress}%</span>
                    </p>
                    <p className="text-gray-700 text-sm">
                        Status: <span className="font-semibold">{project.status}</span>
                    </p>
                </div>
                {/* Tenders */}
                <div className="space-y-6">
                    {project.tenders.map((tender) => (
                        <div key={tender._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            {/* Tender Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                                <h2 className="text-xl font-bold text-white">{tender.workItemDetails.title}</h2>
                                <p className="text-sm text-blue-200">
                                    Status: <span className="font-semibold">{tender.status}</span>
                                </p>
                            </div>

                            {/* Tender Content */}
                            <div className="p-6">
                                <p className="text-gray-700 mb-2">{tender.workItemDetails.description}</p>
                                <p className="text-gray-700 mb-2">
                                    Location: <span className="font-semibold">{tender.tenderLocation}</span>
                                </p>
                                <p className="text-gray-700 mb-2">
                                    Tender Value:{" "}
                                    <span className="font-semibold">₹{tender.workItemDetails.tenderValue.toLocaleString()}</span>
                                </p>
                                <p className="text-gray-700 mb-2">
                                    Bid Submission End Date:{" "}
                                    <span className="font-semibold">
                                        {new Date(tender.criticalDates.bidSubmissionEndDate).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress updates */}

                <div className=" border bg-white p-5 my-5 rounded-lg">
                    <h1 className=" font-bold text-2xl my-4 text-yellow-600">Project progress</h1>
                    {project.progressUpdates
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((update) => {
                            return (
                                <div key={update._id} className=" border-b space-y-2 p-2 border-black">

                                    <h1 className=" flex gap-4 font-bold">
                                        Date: <p className=" font-semibold">{new Date(update.date).toLocaleString()}</p>
                                    </h1>
                                    <h1 className=" flex gap-4 font-bold">
                                        progress: <p className=" font-semibold">{update.progress}%</p>
                                    </h1>
                                    <h1 className=" flex gap-4 font-bold">
                                        Comments: <p className=" font-semibold">{update.comment}</p>
                                    </h1>
                                    <h1 className="  gap-4 font-bold">
                                        Attachment: <img className=" w-52" src={update.attachment} alt="attachment" />
                                    </h1>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default ProjectProgress;
