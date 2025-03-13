import React from "react";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const MyBids = () => {
    const bids = useSelector((state) => state.bids);


    const handleWithdrawBid = (bidId) => {
        axiosInstance
            .delete(`/contractor/bids/${bidId}`)
            .then((res) => {
                console.log(res);
                toast.success("Bid withdrawed success!");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 401) {
                    window.location.replace("/login");
                }
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Bids</h1>
                <p className="text-sm sm:text-base text-gray-600">View and manage all your submitted bids.</p>
            </div>

            {/* Bids Table */}
            {bids.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tender Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Submission Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bid Amount
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bids.map((bid) => (
                                <tr key={bid._id}>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {bid.tender.workItemDetails.title}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(bid.submittedAt).toDateString()}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ₹{bid.bidAmount.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                                                bid.bidStatus === "Approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : bid.bidStatus === "Rejected"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {bid.bidStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                        <a
                                            href={`/contractor/bids/${bid._id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-2 sm:mr-4"
                                        >
                                            View Details
                                        </a>
                                        <button
                                            onClick={() => handleWithdrawBid(bid._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Withdraw
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // {/* Empty State (if no bids are available) */}
                <div className="text-center py-8">
                    <p className="text-gray-600">You have not submitted any bids yet.</p>
                    <a
                        href="/contractor/tenders"
                        className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Explore Tenders
                    </a>
                </div>
            )}
        </div>
    );
};

export default MyBids;
