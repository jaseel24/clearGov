// UserProfile.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import MyReports from "../../components/user/MyReports";
import { addUser } from "../../features/user/userSlice";
import LoadingSpinner from "../../components/LoadingEffect/LoadingSpinner";

const UserProfile = () => {
    const user = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        address: "",
        avatar: "",
    });

    const [avatarPreview, setAvatarPreview] = useState();

    useEffect(() => {
        setFormData({
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber || "",
            address: user.address || "",
            avatar: user?.avatar || "",
        });
        setAvatarPreview(user.avatar);
    }, [user]);

    const dispatch = useDispatch();

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle avatar file change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, avatar: file });
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = new FormData();
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("phoneNumber", formData.phoneNumber);
        data.append("address", formData.address);
        if (formData.avatar) {
            data.append("avatar", formData.avatar);
        }

        try {
            const response = await axiosInstance.put("/user/update", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Profile updated successfully!");
            setIsEditing(false);
            dispatch(addUser(response.data.updatedUser));
            setIsLoading(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
            setIsLoading(false);
        }
    };

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

    const handleEdit = () => {
        setIsEditing(!isEditing);
        setAvatarPreview(user.avatar);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="min-h-screen px-4 my-2 sm:px-6 lg:px-8">
            {isLoading&&<LoadingSpinner/>}
            <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-rose-400 to-rose-500 p-6">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        {/* Profile Picture */}
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                            <img src={avatarPreview} alt="Profile" className=" h-full rounded-full object-cover" />
                        </div>
                        {/* Name and Role */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                            <p className="text-sm text-blue-200">{user.role}</p>
                        </div>

                        <div className="flex-1 justify-end gap-2 flex">
                            <button
                                onClick={handleEdit}
                                className="px-6 py-2 border border-red-300 font-semibold rounded hover:bg-rose-400 shadow-lg text-white hover:text-black transition duration-300"
                            >
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-white font-semibold text-sm shadow-lg rounded px-2 py-1 border border-red-400"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="p-6">
                    {/* Personal Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-600">Name</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Phone</label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Avatar</label>
                                        <input
                                            type="file"
                                            name="avatar"
                                            onChange={handleAvatarChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="text-gray-800">{user.username}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="text-gray-800">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="text-gray-800">{user.phoneNumber ? user.phoneNumber : "NILL"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Address</p>
                                    <p className="text-gray-800">{user.address ? user.address : "NILL"}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Activity History */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity History</h2>
                        <MyReports />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
