import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios.config";
import UserEditForm from "../admin/UserEditForm";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UserList = ({ users, setUsers }) => {
    const [searchQuerry, setSearchQuerry] = useState("");
    const [uidForDelete, setUidForDelete] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");

    // Filter users based on search query and status
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch = user.username?.toLowerCase().includes(searchQuerry.toLowerCase());
            const matchesStatus =
                statusFilter === "All" || (statusFilter === "Active" ? user.isActive : !user.isActive);
            return matchesSearch && matchesStatus;
        });
    }, [searchQuerry, users, statusFilter]);

    // Delete a user
    const handleDelete = () => {
        try {
            axios
                .delete(`/admin/users/${uidForDelete}/delete`)
                .then((res) => {
                    console.log(res);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    // Toggle user status
    const handleUserStatus = (e, userId) => {
        axios
            .put(`/admin/users/${userId}/status`)
            .then((res) => {
                console.log(res);
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === userId ? { ...user, isActive: !user.isActive } : user))
                );
                toast.success(res.data.message);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="min-h-screen px-5 sm:px-10 md:px-20 py-8">
            <div className="">
                <div className="flex justify-between items-center">
                    <div className="relative w-fit">
                        <input
                            className="my-3 rounded-md px-3 py-1 border-b outline-none"
                            value={searchQuerry}
                            onChange={(e) => setSearchQuerry(e.target.value)}
                            placeholder="Search users"
                            type="text"
                            name="searchquerry"
                            id="searchquerry"
                        />
                        <img className="w-6 absolute top-4 right-2" src="/assets/Search.svg" alt="search icon" />
                    </div>
                    <div className="relative font-medium w-fit flex flex-col justify-center items-center sm:block">
                        Filter By:
                        <select
                            className="ml-1 rounded-md px-3 py-1 outline-none text-sm select select-sm select-bordered"
                            name="filterBy"
                            id="filterBy"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Non-Active">Non-Active</option>
                        </select>
                        <button className="btn btn-xs sm:btn-sm btn-outline ml-2">
                            <Link to={"/admin/dashboard/add-user"}>Add User</Link>
                        </button>
                    </div>
                </div>
                <div className="mx-auto">
                    <div className="p-4 rounded-lg border bg-white shadow-md sm:p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold leading-none text-gray-900">Latest Customers</h3>
                        </div>
                        <div className="flow-root overflow-x-auto">
                            <ul role="list" className="divide-gray-200">
                                {filteredUsers.map((user) => {
                                    return (
                                        <li key={user._id} className="py-3 sm:py-4 border-b">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="w-8 h-8 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                                        alt="Neil image"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {user.username}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                                </div>
                                                <div className="flex-1 items-center text-base font-semibold text-gray-900">
                                                    {user.role}
                                                </div>
                                                <div className="items-center text-base flex gap-2 font-semibold">
                                                    {user.isActive ? "Active" : "Disabled"}
                                                    <input
                                                        type="checkbox"
                                                        onChange={(e) => handleUserStatus(e, user._id)}
                                                        className="toggle toggle-success"
                                                        defaultChecked={user.isActive}
                                                    />
                                                </div>
                                                <img
                                                    src="/assets/trash.svg"
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        document.getElementById("my_modal_5").showModal();
                                                        setUidForDelete(user._id);
                                                    }}
                                                    alt="ds"
                                                    width={30}
                                                />
                                                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                    <div className="modal-box">
                                                        <h3 className="font-bold text-lg">Are you sure!</h3>
                                                        <p className="py-4">
                                                            Press ESC key or click Cancel button below to Cancel the
                                                            process
                                                        </p>
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                <button className="btn">Cancel</button>
                                                                <button
                                                                    onClick={handleDelete}
                                                                    className="btn bg-red-500 ml-2 text-white"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                                <button
                                                    className="btn btn-ghost"
                                                    onClick={() => document.getElementById("my_modal_4").showModal()}
                                                >
                                                    <img src="/assets/edit.svg" alt="ds" width={30} />
                                                </button>
                                                <dialog id="my_modal_4" className="modal">
                                                    <div className="modal-box">
                                                        <UserEditForm user={user} />
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                <button className="btn">Close</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                                <div className="items-center text-base font-semibold text-gray-500">
                                                    <Link to={`/admin/dashboard/user/${user._id}`}>View</Link>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                                {filteredUsers.length === 0 && (
                                    <h1 className="font-bold text-center text-red-500 text-xl">No users found!</h1>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
