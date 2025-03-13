import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";

const ProjectView = ({ project, setProject }) => {
    const [projectData, setProjectData] = useState({
        projectScope: "",
        objectives: "",
        budget: "",
        projectLocation: "",
    });

    useEffect(() => {
        setProjectData({
            projectScope: project.projectScope || "",
            objectives: project.objectives || "",
            budget: project.budget || "",
            projectLocation: project.projectLocation || "",
        });
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .put(`/govauth/project/${project._id}`, projectData)
            .then((res) => {
                setProject(res.data.project);
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = () => {
        axiosInstance
            .delete(`/govauth/project/${project._id}`)
            .then((res) => {
                console.log(res);
                window.location.replace("/authority/projects");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!project) {
        return <div className="text-center py-8">Project not found.</div>;
    }

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className=" border rounded mx-auto bg-white   p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{project.projectScope}</h2>
                    <div className="flex gap-5">
                        <button onClick={() => document.getElementById("my_modal_2").showModal()}>
                            <img width={30} src="/assets/edit.svg" alt="edit" />
                        </button>
                        <button onClick={() => document.getElementById("my_modal_5").showModal()}>
                            <img src="/assets/trash.svg" className="cursor-pointer" alt="delete" width={30} />
                        </button>
                    </div>
                </div>

                {/* Project Details Section */}
                <div className="space-y-4">
                    <p className="text-gray-700">
                        <span className="font-semibold">Organisation Chain:</span> {project.organisationChain}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Budget:</span> ${project.budget?.toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                                project.status === "Not Started"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : project.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                        >
                            {project.status}
                        </span>
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Location:</span> {project.projectLocation}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Created By:</span> {project.createdBy || "Unknown"}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Objectives Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700">Objectives:</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                        {project.objectives?.map((obj, index) => (
                            <li key={index}>{obj}</li>
                        ))}
                    </ul>
                </div>

                {/* Tenders Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700">Tenders:</h3>
                    {project.tenders?.length > 0 ? (
                        <ul className="list-disc pl-5 text-gray-600">
                            {project.tenders.map((tender, index) => (
                                <li key={index}>{tender.workItemDetails?.title || "Tender ID: " + tender._id}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No tenders available</p>
                    )}
                </div>

                {/* Modals for Edit and Delete */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure?</h3>
                        <p className="py-4">This action cannot be undone.</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Cancel</button>
                                <button onClick={handleDelete} className="btn bg-red-500 ml-2 text-white">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>

                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-semibold text-center md:text-start font-serif mb-5">
                                Edit Project
                            </h2>

                            <label className="block mb-4 text-sm font-medium">Project Scope</label>
                            <textarea
                                name="projectScope"
                                value={projectData.projectScope}
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

                            <label className="block mb-4 text-sm font-medium">Location</label>
                            <input
                                type="text"
                                name="projectLocation"
                                value={projectData.projectLocation}
                                onChange={handleChange}
                                className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter project location"
                            />


                            <button className="text-center w-full bg-green-500 rounded-md font-bold py-2">Save</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default ProjectView;
