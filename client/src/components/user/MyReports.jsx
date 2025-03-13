import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../config/axios.config";

const MyReports = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("/user/myreports");
                setReports(response.data.reports);
            } catch (error) {
                // console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    if (isLoading) {
        return <div className="text-center text-gray-600">Loading reports...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold  mb-8">My Reports</h1>
                {reports.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p>You have not submitted any reports yet.</p>
                        <Link
                            to="/reports"
                            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Submit a Report
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reports
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((report) => (
                                <div key={report._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    {/* Report Header */}
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                                        <h2 className="text-xl font-bold text-white">Report Details</h2>
                                        <p className="text-sm text-blue-200">
                                            Submitted on: {new Date(report.reportedAt).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Report Content */}
                                    <div className="p-6">
                                        {/* Location */}
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Location</h3>
                                            {report.address && report.address !== "null" ? (
                                                <p className="text-gray-600">{report.address}</p>
                                            ) : report.location ? (
                                                <p className="text-gray-600">
                                                    Latitude: {report.location.lat}, Longitude: {report.location.lng}
                                                </p>
                                            ) : (
                                                <p className="text-gray-600">{report.place}</p>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                                            <p className="text-gray-600">{report.content}</p>
                                        </div>

                                        {/* Attachments */}
                                        {report.attachments.length > 0 && (
                                            <div className="mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800">Attachments</h3>
                                                <div className="flex flex-wrap gap-4 mt-2">
                                                    {report.attachments.map((attachment, index) => (
                                                        <div
                                                            key={index}
                                                            className="w-24 h-24 rounded-lg overflow-hidden"
                                                        >
                                                            {attachment.media.startsWith("http") ? (
                                                                <img
                                                                    src={attachment.media}
                                                                    alt={attachment.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <video
                                                                    src={attachment.media}
                                                                    className="w-full h-full object-cover"
                                                                    controls
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReports;
