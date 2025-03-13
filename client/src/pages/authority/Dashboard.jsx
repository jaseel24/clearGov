import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    // const tenders = useSelector((state) => state.tenders);

    const [bids, setBids] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tenders, setTenders] = useState([]);

    const navigate = useNavigate();

    console.log(tenders,user);


    useEffect(() => {
        axiosInstance
            .get("/govauth/all-bids")
            .then((res) => {
                setBids(res.data.bids);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error("Session expired!");
                }
                navigate("/login");
            });
    }, []);

    useEffect(() => {
        axiosInstance
            .get("/govauth/projects")
            .then((res) => {
                setProjects(res.data.projects);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error("Session expired!");
                }
            });
    },[]);
    useEffect(() => {
        axiosInstance
            .get("/tender/tenders")
            .then((res) => {
                setTenders(res.data.tenders);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error("Session expired!");
                }
            });
    },[]);

    const pendingBids = useMemo(() => bids.filter((bid) => bid.bidStatus === "Submitted"), [bids]);
    const completedProjects = useMemo(() => projects.filter((project) => project.status === "Completed"), [projects]);

    // Combine tenders and projects into a single array of activities
    const recentActivities = useMemo(() => {
        const tenderActivities = tenders.map(tender => ({
            type: 'tender',
            description: `New tender created: ${tender.workItemDetails.title}`,
            date: new Date(tender.createdAt)
        }));

        const projectActivities = projects.map(project => ({
            type: 'project',
            description: `New project started: ${project.projectScope}`,
            date: new Date(project.createdAt)
        }));

        return [...tenderActivities, ...projectActivities]
            .sort((a, b) => b.date - a.date) // Sort by date, most recent first
            .slice(0, 5); // Limit to the 5 most recent activities
    }, [tenders, projects]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Main Content */}
            <div className=" p-8">
                <h1 className="text-3xl font-bold mb-8">Welcome, {user.username}</h1>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">Total Tenders</h2>
                        <p className="text-3xl">{tenders.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">Pending Bids</h2>
                        <p className="text-3xl">{pendingBids.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">Completed Projects</h2>
                        <p className="text-3xl">{completedProjects.length}</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                    <ul className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <span>{activity.description}</span>
                                <span className="text-sm text-gray-500">
                                    {activity.date.toLocaleDateString()} {activity.date.toLocaleTimeString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
