import React, { useState } from "react";
import axios from "../../config/axios.config";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingEffect/LoadingSpinner";

const ProjectForm = () => {
    const [projectDetails, setProductDetails] = useState({
        projectScope: "",
        organisationChain: "",
        projectLocation: "",
        objectives: "",
        budget: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...projectDetails, [name]: value });
    };

    const handleCreateProject = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/govauth/project", projectDetails)
            .then((res) => {
                setLoading(false);
                toast.success("Project created");
                navigate("/authority/projects");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.status === 401) {
                    toast.error("Session expired!");
                    navigate("/login");
                }
            });
    };

    return (
        <div className="flex justify-center items-center p-5">
            {loading && <LoadingSpinner />}
            <form onSubmit={handleCreateProject} className="w-full  bg-white   p-6 ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Form</h2>
                <div className="mb-4">
                    <label htmlFor="projectScope" className="block text-sm font-medium text-gray-700 mb-2">
                        Project Scope
                    </label>
                    <input
                        type="text"
                        id="projectScope"
                        name="projectScope"
                        value={projectDetails.projectScope}
                        onChange={handleChange}
                        required
                        className="w-full outline-none border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Organisation chain scope"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="projectScope" className="block text-sm font-medium text-gray-700 mb-2">
                        Organisation Chain
                    </label>
                    <input
                        type="text"
                        id="organisationChain"
                        name="organisationChain"
                        value={projectDetails.organisationChain}
                        onChange={handleChange}
                        required
                        className="w-full outline-none border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter project scope"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="projectScope" className="block text-sm font-medium text-gray-700 mb-2">
                        Project Location
                    </label>
                    <input
                        type="text"
                        id="projectLocation"
                        name="projectLocation"
                        value={projectDetails.projectLocation}
                        onChange={handleChange}
                        required
                        className="w-full outline-none border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter project location"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="objectives" className="block text-sm font-medium text-gray-700 mb-2">
                        Objectives
                    </label>
                    <textarea
                        id="objectives"
                        name="objectives"
                        rows="4"
                        value={projectDetails.objectives}
                        required
                        onChange={handleChange}
                        className="w-full outline-none border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter project objectives (comma-separated)"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget
                    </label>
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={projectDetails.budget}
                        onChange={handleChange}
                        required
                        className="w-full outline-none border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter budget amount"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
