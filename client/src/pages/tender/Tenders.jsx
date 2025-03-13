
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Tenders = () => {

    const [tenders, setTenders] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/tender/tenders")
            .then((res) => {
                setTenders(res.data.tenders);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 401) {
                    toast.error("Session expired!");
                    navigate("/admin");
                }
            });
    }, []);

    console.log(user);

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Available Tenders</h1>
                <p className="text-sm sm:text-base text-gray-600">Explore and apply for new tenders.</p>
            </div>

            {/* Tenders Table */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto hidden sm:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tender Title
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tender ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tender Category
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tender Location
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bid Submission End Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tender Fee
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tenders.map((tender) => (
                            <tr key={tender._id}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-[150px]">
                                    {tender.workItemDetails.title}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{tender.tenderID}</td>

                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {tender.tenderCategory}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {tender.tenderLocation}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {tender.criticalDates.bidSubmissionEndDate}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ₹{tender.tenderFee}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                    <a
                                        href={`/contractor/bid-submission/${tender.tenderID}`}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Apply Now
                                    </a>
                                    {!user ? (
                                        <a
                                            href={`/admin/dashboard/tender/${tender.tenderID}`}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            View Details
                                        </a>
                                    ) : (
                                        <a
                                            href={`/contractor/tenders/${tender.tenderID}`}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            View Details
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Stacked Layout for Mobile */}
            <div className="mt-6 sm:hidden">
                {tenders.map((tender) => (
                    <div key={tender._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Tender Title</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{tender.workItemDetails.title}</p>
                            <p className="text-sm text-gray-500">Tender ID</p>
                            <p className="text-sm font-medium text-gray-900">{tender.tenderID}</p>
                            <p className="text-sm text-gray-500">Tender Type</p>
                            <p className="text-sm font-medium text-gray-900">{tender.tenderType}</p>
                            <p className="text-sm text-gray-500">Tender Category</p>
                            <p className="text-sm font-medium text-gray-900">{tender.tenderCategory}</p>
                            <p className="text-sm text-gray-500">Tender Location</p>
                            <p className="text-sm font-medium text-gray-900">{tender.tenderLocation}</p>
                            <p className="text-sm text-gray-500">Bid Submission End Date</p>
                            <p className="text-sm font-medium text-gray-900">
                                {tender.criticalDates.bidSubmissionEndDate}
                            </p>
                            <p className="text-sm text-gray-500">Tender Fee</p>
                            <p className="text-sm font-medium text-gray-900">${tender.tenderFee}</p>
                            <div className="flex space-x-4 mt-2">
                                <a href="#" className="text-blue-600 hover:text-blue-900 text-sm">
                                    Apply Now
                                </a>
                                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State (if no tenders are available) */}
            {tenders.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-600">No tenders are available at the moment.</p>
                    <a
                        href="#"
                        className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Refresh
                    </a>
                </div>
            )}
        </div>
    );
};

export default Tenders;
