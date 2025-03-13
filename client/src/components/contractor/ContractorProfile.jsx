import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";

const ContractorProfile = ({ contractor }) => {
    const [isEditing, setIsEditing] = useState(false); // Toggle between edit and view modes
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        address: "",
        avatar: "",
        contractorOrBidderDetails: {
            companyName: "",
            registeredAddress: "",
            registrationNumber: "",
            contactDetails: {
                contactName: "",
                contactPhoneNumber: "",
            },
        },
    });

    useEffect(() => {
        setFormData({
            username: contractor.username,
            email: contractor.email,
            phoneNumber: contractor.phoneNumber,
            address: contractor.address,
            avatar: contractor.avatar,
            contractorOrBidderDetails: {
                companyName: contractor.contractorOrBidderDetails?.companyName || "",
                registeredAddress: contractor.contractorOrBidderDetails?.registeredAddress || "",
                registrationNumber: contractor.contractorOrBidderDetails?.registrationNumber || "",
                contactDetails: {
                    contactName: contractor.contractorOrBidderDetails?.contactDetails?.contactName || "",
                    contactPhoneNumber: contractor.contractorOrBidderDetails?.contactDetails?.contactPhoneNumber || "",
                    designation: contractor.contractorOrBidderDetails?.contactDetails?.designation || "",
                },
            },
        });
    }, [contractor]);

    const handleLogout = () => {
        axiosInstance
            .delete("/auth/logout")
            .then((res) => {
                toast.error(res.data.message);
                window.location.replace("/login");
                localStorage.clear();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("contractorOrBidderDetails")) {
            const [parent, child, nested] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: {
                        ...prev[parent][child],
                        [nested]: value,
                    },
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/user/update`, formData);
            toast.success("Profile updated successfully!");
            setIsEditing(false); // Switch back to view mode
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    };

    if (!contractor) {
        return <div className="text-center text-gray-600">Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r flex justify-between items-center from-blue-600 to-blue-800 p-6">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        {/* Profile Picture */}
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                            <img
                                src={formData.avatar || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        </div>
                        {/* Name and Role */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-white">{formData.username}</h1>
                            <p className="text-sm text-blue-200">{contractor.role || "Contractor"}</p>
                        </div>
                    </div>
                    <div className=" bg-red-50 rounded-full px-3 py-1 shadow-md shadow-red-300">
                        <button className=" font-bold text-red-600 " onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="p-6">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            {/* Personal Information */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Username</p>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Address</p>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Company Information */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Company Name</p>
                                        <input
                                            type="text"
                                            name="contractorOrBidderDetails.companyName"
                                            value={formData.contractorOrBidderDetails.companyName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Company Address</p>
                                        <input
                                            type="text"
                                            name="contractorOrBidderDetails.registeredAddress"
                                            value={formData.contractorOrBidderDetails.registeredAddress}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Registration Number</p>
                                        <input
                                            type="text"
                                            name="contractorOrBidderDetails.registrationNumber"
                                            value={formData.contractorOrBidderDetails.registrationNumber}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Contact Name</p>
                                        <input
                                            type="text"
                                            name="contractorOrBidderDetails.contactDetails.contactName"
                                            value={formData.contractorOrBidderDetails.contactDetails.contactName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Contact Phone</p>
                                        <input
                                            type="text"
                                            name="contractorOrBidderDetails.contactDetails.contactPhoneNumber"
                                            value={formData.contractorOrBidderDetails.contactDetails.contactPhoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save and Cancel Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            {/* View Mode */}
                            {/* Personal Information */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Username</p>
                                        <p className="text-gray-800">{formData.username}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="text-gray-800">{formData.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <p className="text-gray-800">{formData.phoneNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Address</p>
                                        <p className="text-gray-800">{formData.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Company Information */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Company Name</p>
                                        <p className="text-gray-800">
                                            {formData.contractorOrBidderDetails.companyName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Company Address</p>
                                        <p className="text-gray-800">
                                            {formData.contractorOrBidderDetails.registeredAddress}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Registration Number</p>
                                        <p className="text-gray-800">
                                            {formData.contractorOrBidderDetails.registrationNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Contact Name</p>
                                        <p className="text-gray-800">
                                            {formData.contractorOrBidderDetails.contactDetails.contactName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Contact Phone</p>
                                        <p className="text-gray-800">
                                            {formData.contractorOrBidderDetails.contactDetails.contactPhoneNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Edit Profile Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContractorProfile;
