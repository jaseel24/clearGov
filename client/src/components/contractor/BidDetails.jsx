import React from "react";

const BidDetails = ({ bid }) => {
    if (!bid) {
        return <div className="text-center text-gray-600">Loading bid details...</div>;
    }

    return (
        <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white  border rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Bid Details</h1>
                    <p className="text-sm text-gray-500">BID ID: {bid._id}</p>
                </div>

                {/* Main Content Section */}
                <div className="p-6">
                    {/* Tender and Contractor Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">Tender Information</h2>
                            <p className="text-sm text-gray-600">Tender ID: {bid.tender?._id}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">Contractor Information</h2>
                            <p className="text-sm text-gray-600">Contractor ID: {bid.contractor}</p>
                        </div>
                    </div>

                    {/* Bid Details */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-700">Bid Information</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <p className="text-sm text-gray-600">Bid Amount:</p>
                                <p className="text-lg font-bold text-gray-800">${bid?.bidAmount?.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Proposal:</p>
                                <p className="text-gray-800">{bid.proposal}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Bid Status:</p>
                                <span
                                    className={`px-2 py-1 text-sm font-semibold rounded ${
                                        bid.bidStatus === "Accepted"
                                            ? "bg-green-100 text-green-800"
                                            : bid.bidStatus === "Rejected"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-blue-100 text-blue-800"
                                    }`}
                                >
                                    {bid.bidStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment and Financial Details */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-700">Payment Details</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <p className="text-sm text-gray-600">Payment Mode:</p>
                                <p className="text-gray-800">{bid.paymentMode}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">EMD Amount:</p>
                                <p className="text-gray-800">${bid?.emdAmount?.toLocaleString()}</p>
                            </div>
                            {bid.emdPaymentDetails && (
                                <div>
                                    <p className="text-sm text-gray-600">EMD Payment Details:</p>
                                    <p className="text-gray-800">
                                        Transaction ID: {bid.emdPaymentDetails.transactionId}
                                    </p>
                                    <p className="text-gray-800">
                                        Payment Date: {new Date(bid.emdPaymentDetails.paymentDate).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Covers Section */}
                    {bid.covers && bid.covers.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-700">Covers</h2>
                            <div className="mt-4 space-y-4">
                                {bid.covers.map((cover, index) => (
                                    <div key={index} className="border p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Cover Name:</p>
                                        <p className="text-gray-800">{cover.coverName}</p>
                                        <p className="text-sm text-gray-600">Document:</p>
                                        <a
                                            href={cover.document}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Document
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Timestamps */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Timestamps</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <p className="text-sm text-gray-600">Submitted At:</p>
                                <p className="text-gray-800">{new Date(bid.submittedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BidDetails;
