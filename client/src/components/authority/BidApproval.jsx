import React, { useEffect, useState } from "react";
import axios from "../../config/axios.config";
import toast from "react-hot-toast";

const BidApproval = () => {
    const [bids, setBids] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch bids
    useEffect(() => {
        const fetchBidsUnderSubmitted = async () => {
            try {
                const response = await axios.get("/govauth/bids");
                setBids(response.data.bids);
            } catch (error) {
                toast.error("Error fetching bids under review");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBidsUnderSubmitted();
    }, []);

    // Handle bid approval/rejection
    const handleBidStatus = async (bidId, tenderId, status) => {
        try {
            const response = await axios.put(`/govauth/tender/${tenderId}/award/${bidId}`, { status });
            toast.success(`Bid ${status === "Accepted" ? "approved" : "rejected"} successfully!`);
            setBids((prevBids) => prevBids.filter((bid) => bid._id !== bidId));
        } catch (error) {
            toast.error("Error updating bid status");
            console.error(error);
        }
    };

    if (isLoading) {
        return <div className="text-center text-gray-600">Loading bids under review...</div>;
    }

    return (
        <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Bid Approval</h1>

                {/* Bids List */}
                <div className="space-y-6">
                    {bids.length === 0 ? (
                        <div className="text-center text-gray-600">No bids under review found.</div>
                    ) : (
                        bids.map((bid) => (
                            <div key={bid._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* Bid Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                                    <h2 className="text-xl font-bold text-white">
                                        Bid for Tender: {bid.tender.tenderID}
                                    </h2>
                                    <p className="text-sm text-blue-200">
                                        Submitted by: <span className="font-semibold">{bid.contractor._id}</span>
                                    </p>
                                </div>

                                {/* Bid Content */}
                                <div className="p-6">
                                    <p className="text-gray-700 mb-4">
                                        <span className="font-semibold">Bid Amount:</span> $
                                        {bid.bidAmount.toLocaleString()}
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <span className="font-semibold">Proposal:</span> {bid.proposal}
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <span className="font-semibold">Payment Mode:</span> {bid.paymentMode}
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <span className="font-semibold">EMD Amount:</span> $
                                        {bid.emdAmount.toLocaleString()}
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <span className="font-semibold">Bid Validity:</span> {bid.bidValidityDays} days
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <span className="font-semibold">Submitted At:</span>{" "}
                                        {new Date(bid.submittedAt).toLocaleDateString()}
                                    </p>

                                    {/* Covers */}
                                    {bid.covers.length > 0 && (
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Covers</h3>
                                            <div className="mt-2 space-y-2">
                                                {bid.covers.map((cover, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <a
                                                            href={cover.document}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {cover.coverName}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Approval Buttons */}
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            onClick={() => handleBidStatus(bid._id, bid.tender._id, "Accepted")}
                                            className="px-4 py-2 bg-green-400 shadow-lg shadow-green-400 text-white rounded-lg hover:bg-green-700 transition duration-300"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleBidStatus(bid._id, "Rejected")}
                                            className="px-4 py-2 bg-red-400 shadow-lg shadow-red-400 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BidApproval;
