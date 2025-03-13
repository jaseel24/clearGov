import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";

const TenderManagement = () => {
    const [tenders, setTenders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedTender, setSelectedTender] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Mock data - In real app, this would come from your API
    useEffect(() => {
        axiosInstance
            .get("/admin/tenders")
            .then((res) => {
                setTenders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const filteredTenders = tenders.filter(
        (tender) =>
            (tender.tenderID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tender.tenderReferenceNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (statusFilter === "all" || tender.status === statusFilter)
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "open":
                return "bg-green-100 text-green-800";
            case "closed":
                return "bg-gray-100 text-gray-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "awarded":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-yellow-100 text-yellow-800";
        }
    };

    const handleEdit = (tender) => {
        setSelectedTender({ ...tender });
        setIsEditModalOpen(true);
    };

    const handleView = (tender) => {
        setSelectedTender(tender);
        setIsViewModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .put(`/admin/tenders/${selectedTender._id}`, selectedTender)
            .then((res) => {
                console.log(res);
                toast.success("Tender updated!");
            })
            .catch((err) => {
                console.log(err);
            });
        setTenders(tenders.map((t) => (t._id === selectedTender._id ? selectedTender : t)));
        setIsEditModalOpen(false);
    };

    const handleDeleteTender = (id) => {
        axiosInstance
            .delete(`/admin/tenders/${id}`)
            .then((res) => {
                toast.success(res.data.message);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="min-h-screen  bg-gray-100 p-4 md:p-6">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tender Management</h1>
                    <p className="text-gray-600 mt-1">Manage all tenders in your system</p>
                </div>

                {/* Controls */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by Tender ID or Reference..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="awarded">Awarded</option>
                            <option value="started">Started</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Tenders Table */}
                <div className=" rounded-lg max-w-full shadow-md overflow-x-scroll">
                    <div className=" border max-w-[894px] ">
                        <table className=" divide-y ">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tender ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Reference
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Organization
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Progress
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTenders.map((tender) => (
                                    <tr key={tender._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {tender.tenderID}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {tender.tenderReferenceNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {tender.organisationChain}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {tender.tenderCategory}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {tender.tenderLocation}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                    tender.status
                                                )}`}
                                            >
                                                {tender.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {tender.progress}%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleView(tender)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(tender)}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTender(tender._id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* View Modal */}
                {isViewModalOpen && selectedTender && (
                    <div
                        className="fixed inset-0 z-[100]  bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                        onClick={() => setIsViewModalOpen(false)}
                    >
                        <div
                            className="relative  top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Tender Details - {selectedTender.tenderID}</h3>
                                <button onClick={() => setIsViewModalOpen(false)}>
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Reference Number</p>
                                    <p>{selectedTender.tenderReferenceNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Organization</p>
                                    <p>{selectedTender.organisationChain}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p>{selectedTender.tenderCategory}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Work Item</p>
                                    <p>
                                        {selectedTender.workItemDetails.title} -{" "}
                                        {selectedTender.workItemDetails.description}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tender Value</p>
                                    <p>₹{selectedTender.workItemDetails.tenderValue?.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Critical Dates</p>
                                    <p>
                                        Published:{" "}
                                        {new Date(selectedTender.criticalDates.publishedDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        Submission End:{" "}
                                        {new Date(
                                            selectedTender.criticalDates.bidSubmissionEndDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        Opening:{" "}
                                        {new Date(selectedTender.criticalDates.bidOpeningDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                            selectedTender.status
                                        )}`}
                                    >
                                        {selectedTender.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {isEditModalOpen && selectedTender && (
                    <div
                        className="fixed z-[100] inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                        onClick={() => setIsEditModalOpen(false)}
                    >
                        <div
                            className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Edit Tender - {selectedTender.tenderID}</h3>
                                <button onClick={() => setIsEditModalOpen(false)}>
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-500">Organization Chain</label>
                                    <input
                                        type="text"
                                        value={selectedTender.organisationChain}
                                        onChange={(e) =>
                                            setSelectedTender({ ...selectedTender, organisationChain: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Category</label>
                                    <select
                                        value={selectedTender.tenderCategory}
                                        onChange={(e) =>
                                            setSelectedTender({ ...selectedTender, tenderCategory: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-md"
                                    >
                                        <option value="Works">Works</option>
                                        <option value="Goods">Goods</option>
                                        <option value="Services">Services</option>
                                        <option value="Consultancy">Consultancy</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Location</label>
                                    <input
                                        type="text"
                                        value={selectedTender.tenderLocation}
                                        onChange={(e) =>
                                            setSelectedTender({ ...selectedTender, tenderLocation: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Tender Fee</label>
                                    <input
                                        type="number"
                                        value={selectedTender.tenderFee}
                                        onChange={(e) =>
                                            setSelectedTender({
                                                ...selectedTender,
                                                tenderFee: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Status</label>
                                    <select
                                        value={selectedTender.status}
                                        onChange={(e) =>
                                            setSelectedTender({ ...selectedTender, status: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-md"
                                    >
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="awarded">Awarded</option>
                                        <option value="started">Started</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredTenders.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No tenders found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TenderManagement;
