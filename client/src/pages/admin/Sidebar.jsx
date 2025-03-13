import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className=" border-r-2 ">
            <div className="drawer lg:drawer-open z-[100]">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle absolute" />
                <div className="drawer-content flex">
                    {/* Page content here */}
                    <button className="relative group ">
                        <label htmlFor="my-drawer-2" className="z-50 drawer-button lg:hidden">
                            <div className="absolute top-3 left-2  flex overflow-hidden items-center justify-center  w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                                <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden group-focus:translate-x-1.5">
                                    <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:rotate-[42deg] group-focus:w-2/3 delay-150"></div>
                                    <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10"></div>
                                    <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg] group-focus:w-2/3 delay-150"></div>
                                </div>
                            </div>
                        </label>
                    </button>
                </div>
                <div className="drawer-side  min-h-screen ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className=" h-full flex flex-col bg-white z-50">
                        <div className=" flex-1 overflow-y-scroll sidebar">
                            <div className=" rounded">
                                <p className=" text-lg bg-gray-500 text-white font-thin  px-4 py-2">User Management </p>
                                <ul className="menu  text-base-content text-[16px]  w-80 p-4">
                                    {/* Sidebar content here */}
                                    <li>
                                        <Link to="/admin/dashboard">Users</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className=" text-lg bg-gray-500 text-white font-thin  px-4 py-2">
                                    Tender Management{" "}
                                </p>
                                <ul className="menu  text-base-content text-[16px]  w-80 p-4">
                                    {/* Sidebar content here */}
                                    <li>
                                        <Link to="/admin/dashboard/tenders">Tenders</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className=" text-lg bg-gray-500 text-white font-thin  px-4 py-2">
                                    Project Management{" "}
                                </p>
                                <ul className="menu  text-base-content text-[16px]  w-80 p-4">
                                    {/* Sidebar content here */}
                                    <li>
                                        <Link to="/admin/dashboard/projects">Projects</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
