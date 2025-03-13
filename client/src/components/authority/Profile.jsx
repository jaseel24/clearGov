import React, { useState, useEffect } from "react";
import axios from "../../config/axios.config";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.user);

    const [profile, setProfile] = useState({
        username: "",
        email: "",
        department: "",
        position: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch profile data
    useEffect(() => {
        setProfile({
            username: user.username || "",
            email: user.email || "",
            department: user.department || "",
            position: user.position || "",
        });
    }, [user]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleLogout = () => {
        axios
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/user/update", profile);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Error updating profile");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Profile Header */}

                <div className="bg-gradient-to-r flex gap-4 from-blue-600 to-blue-800 p-6 justify-between">
                    <div>
                        <div className=" w-16 h-16 rounded-full overflow-hidden">
                            <img className=" object-cover w-full h-full" src={user.avatar} alt="" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Profile</h1>
                            <p className="text-sm text-blue-200">Manage your profile information</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleLogout} className="  rounded px-3 py-2 bg-red-500 text-white">
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={profile.username}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={profile.department}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Position</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={profile.position}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-gray-600">Username</p>
                                <p className="text-lg font-semibold text-gray-800">{profile.username}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="text-lg font-semibold text-gray-800">{profile.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Department</p>
                                <p className="text-lg font-semibold text-gray-800">{profile.department}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Position</p>
                                <p className="text-lg font-semibold text-gray-800">{profile.position}</p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
