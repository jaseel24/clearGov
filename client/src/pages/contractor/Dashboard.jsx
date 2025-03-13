import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axios.config";
import jsPDF from "jspdf";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    console.log(user);
    const [submittedBids, setSubmittedBids] = useState(0);
    const [bids, setBids] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [activeTenders, setActiveTenders] = useState([]);
    const [upComingDeadlines, setUpComingDeadlines] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/contractor/bids")
            .then((res) => {
                const bidsCount = res.data.bids.length;
                setSubmittedBids(bidsCount);
                setBids(res.data.bids);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const fetchUpcomingDeadlines = async () => {
            try {
                const response = await axiosInstance.get("/contractor/upcoming-deadlines");
                console.log(response);
                setUpComingDeadlines(response.data);
            } catch (error) {
                console.log("Error fetching upcoming deadlines:", error);
            }
        };

        fetchUpcomingDeadlines();
    }, []);

    useEffect(() => {
        axiosInstance
            .get("/contractor/my-expenses")
            .then((res) => {
                setExpenses(res.data.expenses);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axiosInstance
            .get(`/contractor/won-tenders`)
            .then((res) => {
                setActiveTenders(res.data.tenders);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user]);

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Add content to the PDF
        doc.text("Expense Report", 10, 10);
        expenses.forEach((expense, index) => {
            const y = 20 + index * 10;
            doc.text(
                `${new Date(expense.date).toLocaleDateString()}: ${expense.description} - $${expense.amount}`,
                10,
                y
            );
        });

        // Save the PDF
        doc.save("expense-report.pdf");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Dashboard Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome Back, {user.username}</h1>
                <p className="text-gray-600">Here's what's happening with your tenders and bids today.</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Active Tenders Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Active Tenders</h3>
                    <p className="text-2xl font-bold text-blue-600">{activeTenders.length}</p>
                    <p className="text-sm text-gray-500">
                        You are currently participating in {activeTenders.length} tenders.
                    </p>
                </div>

                {/* Submitted Bids Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Submitted Bids</h3>
                    <p className="text-2xl font-bold text-green-600">{submittedBids}</p>
                    <p className="text-sm text-gray-500">You have submitted {submittedBids} bids so far.</p>
                </div>

                {/* Upcoming Deadlines Card */}
                <div
                    onClick={() => navigate("/contractor/upcoming-deadlines")}
                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                >
                    <h3 className="text-lg font-semibold text-gray-700">Upcoming Deadlines</h3>
                    <p className="text-2xl font-bold text-red-600">{upComingDeadlines.length}</p>
                    <p className="text-sm text-gray-500">
                        {upComingDeadlines.length} tenders have deadlines in the next 7 days.
                    </p>
                </div>
            </div>

            {/* Active Tenders Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Active Tenders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tender Name
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deadline
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Example Row */}
                            {activeTenders.map((tender) => {
                                return (
                                    <tr key={tender._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {tender.workItemDetails.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            2023-12-15
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <a
                                                href={`/contractor/tenders/${tender.tenderID}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View Details
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* Add more rows dynamically */}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Bids Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bids</h2>
                <div className="space-y-4">
                    {/* Example Bid Card */}

                    {bids
                        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
                        .slice(0, 10)
                        .map((bid) => {
                            return (
                                <div key={bid._id} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {bid.tender?.workItemDetails?.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Submitted on {new Date(bid.submittedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full">
                                            {bid.bidStatus}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                    {/* Add more bid cards dynamically */}
                </div>
            </div>

            {/* Quick Actions Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className=" bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition duration-300">
                        <Link className="p-4 text-center   flex rounded-lg justify-center  " to={"/contractor/tenders"}>
                            Submit New Bid
                        </Link>
                    </button>

                    <button className=" bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition duration-300">
                        <Link className="p-4 text-center    rounded-lg justify-center  " to={"/contractor/tenders"}>
                            View All Tenders
                        </Link>
                    </button>
                    <button
                        onClick={downloadPDF}
                        className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition duration-300"
                    >
                        Download Reports
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
