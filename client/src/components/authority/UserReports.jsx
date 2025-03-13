import React from "react";

const UserReports = ({ reports }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">User Reports</h1>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports && reports.length > 0 ? (
                    reports
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((report) => (
                            <div
                                key={report._id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Location Section */}
                                <div className="mb-4">
                                    <h2 className="text-lg font-semibold text-gray-700">Location</h2>
                                    {report.location && (
                                        <p className="text-gray-600">
                                            Lat: {report.location?.lat}, Lng: {report.location?.lng}
                                        </p>
                                    )}
                                    {report.address && report.address !== "null" ? (
                                        <p className="text-gray-600 mt-1">{report.address}</p>
                                    ) : (
                                        <p className="text-gray-600 mt-1">{report.place}</p>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="mb-4">
                                    <h3 className="text-md font-medium text-gray-700">Report Details</h3>
                                    <p className="text-gray-600 mt-1">{report.content}</p>
                                </div>

                                {/* Attachments Section */}
                                {report.attachments && report.attachments.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-md font-medium text-gray-700">Attachments</h3>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {report.attachments.map((attachment, index) => (
                                                <div key={index} className="bg-gray-100 rounded p-2 text-sm">
                                                    <p className="text-gray-600">{attachment.name}</p>
                                                    {/* Assuming media is a URL */}
                                                    {attachment.media && (
                                                        <a
                                                            href={attachment.media}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:underline text-xs"
                                                        >
                                                            View
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Metadata Section */}
                                <div className="border-t pt-4 mt-4">
                                    <p className="text-sm text-gray-500">
                                        Date: {new Date(report.reportedAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Created: {new Date(report.createdAt).toLocaleString()}
                                    </p>
                                    {report.updatedAt && (
                                        <p className="text-sm text-gray-400">
                                            Updated: {new Date(report.updatedAt).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className="text-gray-500 text-lg">No reports available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Example usage:
/*
const reportsData = [
  {
    _id: "1",
    location: { lat: "40.7128", lng: "-74.0060" },
    address: "123 Main St, New York, NY",
    content: "Road maintenance required",
    attachments: [
      { name: "damage.jpg", media: "http://example.com/damage.jpg" }
    ],
    reportedBy: "user123",
    reportedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

<UserReports reports={reportsData} />
*/

export default UserReports;
