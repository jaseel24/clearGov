import React, { useState } from "react";

const ProjectForm = () => {
    const [projectData, setProjectData] = useState({
        scope: "",
        objectives: "",
        budget: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(projectData);
        // Add logic for submitting project data
    };

    return (
        <form onSubmit={handleSubmit} className="p-6  mx-auto md:text-xs  ">
            <h2 className="text-2xl font-semibold text-center md:text-start font-serif mb-5">Define Project</h2>

            <label className="block mb-4 text-sm font-medium">Project Scope</label>
            <textarea
                name="scope"
                value={projectData.scope}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Define project scope"
            />

            <label className="block mb-4 text-sm font-medium">Objectives</label>
            <textarea
                name="objectives"
                value={projectData.objectives}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="State the project objectives"
            />

            <label className="block mb-4 text-sm font-medium">Budget</label>
            <input
                type="number"
                name="budget"
                value={projectData.budget}
                onChange={handleChange}
                className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Set the budget"
            />

            <button
                type="submit"
                className="w-full bg-blue-950 mb-5  text-lg  font-bold text-white p-2 rounded-lg hover:bg-blue-900 hover:transition-colors  transition duration-700"
            >
                Submit Project
            </button>
        </form>
    );
};

export default ProjectForm;
