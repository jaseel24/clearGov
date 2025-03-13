import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingEffect/LoadingSpinner";

const ProjectList = ({ projects }) => {
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    return (
        <div className="container min-h-screen mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white shadow rounded p-6 cursor-pointer">
                        <div
                            onClick={() => {
                                user?.role !== "Government Authority"
                                    ? navigate(`/admin/dashboard/project/${project._id}`)
                                    : navigate(`/authority/project/${project._id}`);
                            }}
                        >
                            <h2 className="text-xl font-semibold mb-2">{project.projectScope}</h2>
                            <p className="text-gray-600 mb-2">
                                <strong>Organisation Chain:</strong> {project.organisationChain}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Budget:</strong> ${project.budget}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Status:</strong> {project.status}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Created By:</strong> {project.createdBy}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Location:</strong> {project.projectLocation}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Tenders:</strong> {project.tenders.length}
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                user?.role !== "Government Authority"
                                    ? navigate(`/admin/dashboard/project/status/${project._id}`)
                                    : navigate(`/authority/project/status/${project._id}`)
                            }
                            disabled={project.status === "Completed"} // Disable if project is already completed
                            className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
                                project.status === "Completed"
                                    ? "bg-green-100 text-green-800 cursor-not-allowed" // Disabled state
                                    : "bg-blue-100 text-blue-800 hover:text-blue-900 " // Active state
                            }`}
                        >
                            {project.status === "Completed" ? "Project Completed" : "Update Project"}
                        </button>
                    </div>
                ))}
                {!projects.length && <LoadingSpinner />}
            </div>
        </div>
    );
};

export default ProjectList;
