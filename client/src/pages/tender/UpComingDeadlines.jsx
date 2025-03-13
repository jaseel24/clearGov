import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import { useNavigate } from "react-router-dom";

const UpcomingDeadlines = () => {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUpcomingDeadlines = async () => {
            try {
                const response = await axiosInstance.get("/contractor/upcoming-deadlines");
                setTenders(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching upcoming deadlines:", error);
                setLoading(false);
            }
        };

        fetchUpcomingDeadlines();
    }, []);

    if (loading) {
        return <div className="text-center py-4 min-h-screen">Loading upcoming deadlines...</div>;
    }

    return (
        <div className="bg-white  min-h-screen p-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
            <p className="text-gray-600 mb-4">
                {tenders.length} {tenders.length === 1 ? "tender has" : "tenders have"} deadlines in the next 7 days.
            </p>

            {tenders.length > 0 ? (
                <div className="space-y-4">
                    {tenders.map((tender) => (
                        <div
                            key={tender._id}
                            className="border border-gray-200 rounded-lg md:flex justify-between items-center p-4 "
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-blue-600">{tender.workItemDetails?.title}</h3>
                                <p className="text-gray-600">
                                    <strong>Deadline:</strong>{" "}
                                    {new Date(tender.criticalDates?.bidSubmissionEndDate).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                                            tender.status === "Open"
                                                ? "bg-green-100 text-green-800"
                                                : tender.status === "Closed"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {tender.status}
                                    </span>
                                </p>
                            </div>
                            <button
                                onClick={() => navigate(`/contractor/bid-submission/${tender.tenderID}`)}
                                className=" border rounded-full hover:bg-green-300 transition duration-300 px-5 py-1 text-sm"
                            >
                                Bid
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No upcoming deadlines.</p>
            )}
        </div>
    );
};

export default UpcomingDeadlines;
