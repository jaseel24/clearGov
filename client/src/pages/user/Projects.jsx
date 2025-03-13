import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../config/axios.config";
import ProjectProgressChart from "../../components/user/ProjectProgressChart";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [showBar, setShowBar] = useState(false);
    const [projectProgress, setProjectProgress] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("/govauth/projects");
                setProjects(response.data.projects);
            } catch (error) {
                const toastId = toast.error("Error fetching projects");
                if (error.status === 401) {
                    toast.error("Session expired!", { id: toastId });
                    navigate("/login");
                }
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        axios
            .get("/user/project-progress")
            .then((res) => {
                setProjectProgress(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.projectScope.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "All" || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (isLoading) {
        return <div className="text-center text-gray-600">Loading projects...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 bg-[url('/public/assets/bgImage.jpg')] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className=" flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-center mb-8">All Projects</h1>
                    <button
                        onClick={() => setShowBar(!showBar)}
                        className=" border rounded-md px-3 py-2 bg-light text-sm font-semibold shadow-lg"
                    >
                        {showBar ? "Hide progress bar" : "Show progress Bar"}
                    </button>
                </div>

                {!showBar && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <div className="relative w-full sm:w-1/2 mb-4 sm:mb-0">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <svg
                                className="w-6 h-6 absolute top-3 right-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <div className="flex items-center">
                            <label className="mr-2 text-gray-700">Filter by Status:</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All</option>
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                )}

                {!showBar && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.length === 0 ? (
                            <div className="col-span-full text-center text-gray-600">No projects found.</div>
                        ) : (
                            filteredProjects.map((project) => (
                                <div key={project._id} className="bg-white  rounded overflow-hidden">
                                    <div className="bg-gradient-to-r from-slate-500 to-slate-600 p-4">
                                        <h2 className="text-xl font-bold text-white">{project.projectScope}</h2>
                                        <p className="text-sm text-blue-200">
                                            Status: <span className="font-semibold">{project.status}</span>
                                        </p>
                                    </div>

                                    <div className="p-6">
                                        <p className="text-gray-700 mb-4">{project.objectives.join(", ")}</p>

                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-gray-700 text-sm">
                                            Progress: <span className="font-semibold">{project.progress}%</span>
                                        </p>

                                        <Link
                                            to={`/projects/${project._id}`}
                                            className="mt-4 inline-block px-4 py-2 bg-slate-400 text-white rounded-full hover:bg-slate-600 transition duration-300"
                                        >
                                            {"View Details >>"}
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            {showBar && <ProjectProgressChart ProjectProgress={projectProgress} />}
        </div>
    );
};

export default Projects;
