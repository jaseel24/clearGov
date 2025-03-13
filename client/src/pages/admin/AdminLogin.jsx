import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { addUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post("/auth/adminlogin", formData)
            .then((res) => {
                console.log(res);
                dispatch(addUser(res.data.user));
                toast.success("Login success!");
                navigate("/admin/dashboard");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message)
            });
    };

    return (
        <>
            <div
                className="container mx-auto h-screen px-4 bg-cover"
                style={{
                    backgroundImage:
                        "url('https://t3.ftcdn.net/jpg/04/47/19/30/360_F_447193040_0MTKO703A5olX1bC1lON7F4kHiPKEtte.jpg')",
                }}
            >
                <div className="flex content-center items-center justify-center h-full ">
                    <div className="w-full lg:w-4/12 px-4 bg-transparent ">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                            style={{ backgroundColor: "rgba(200,200,200,.3)" }}
                        >
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <p className=" mt-2">Sign In</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            value={formData.email}
                                            required
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Password"
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            value={formData.password}
                                            required
                                        />
                                    </div>

                                    <div className="text-center mt-6">
                                        <button className="bg-blue-800 text-white  active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
