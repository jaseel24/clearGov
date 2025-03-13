import React, { useEffect, useState } from "react";
import axios from "../../config/axios.config";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const [tenders, setTenders] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        axios
            // .get(`/tender/tender?category=${filterQuerry}`)
            .get(`/tender/tenders`)
            .then((res) => {
                setTenders(res.data.tenders);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="h-screen bg-black  flex flex-col ">
            {/* Navbar */}
            <nav className="bg-white from-blue-900 bg-gradient-to-tr to-slate-500  shadow-md  border-b border-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center text-xl text-white font-bold">Tenderer Dashboard</div>
                        </div>
                        <div className="ml-6 flex items-center space-x-4">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn m-1">
                                    User
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content  whitespace-nowrap   menu bg-base-100 w-fit rounded-box z-[1]  p-2 shadow"
                                >
                                    <li>
                                        <a>Profile</a>
                                    </li>
                                    <li>
                                        <a className=" whitespace-nowrap">Log Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className=" flex flex-1 min-h-0 ">
                <div className="  h-full flex-col w-1/5 shadow-xl hidden md:flex">
                    <div className=" p-5  flex mb-2 border-b text-xl font-black bg-white ">Dashboard</div>
                    <div className="  h-full  overflow-auto px-4 scrollbar-custom bg-white">
                        <ul className=" flex  h-full font-semibold flex-col gap-5">
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                Search Active tenders
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                            <li className=" shadow rounded-sm p-2 border-x-2 cursor-pointer border-gray-500">
                                My Account
                            </li>
                        </ul>
                    </div>
                </div>
                <div className=" h-full overflow-auto mx-auto py-6  flex-1  sm:px-6 lg:px-8 text-blue-950  ">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-red-800">Active Tenders</h3>
                            <p className="text-2xl mt-4">12</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-green-700">Tenders Submitted</h3>
                            <p className="text-2xl mt-4">8</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-yellow-500 ">Pending Actions</h3>
                            <p className="text-2xl mt-4">3</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-[8px] sm:text-xs md:text-sm lg:text-lg  text-start">
                        <h2 className="text-xl font-semibold mb-4 ">Recent Tenders</h2>
                        <div className=" grid grid-cols-5 bg-gray-300 p-2 rounded-t-md ">
                            <p></p>
                            <p className=" border-l px-2">Tender ID</p>
                            <p className=" border-l px-2">Tender Ref</p>
                            <p className=" border-l px-2">Submission Date</p>
                            <p className=" border-l px-2">Opening Date</p>
                        </div>
                        {tenders.map((tender, indx) => {
                            return (
                                <div className=" my-2 grid grid-cols-5  border-b p-1  " key={tender._id}>
                                    <p className=" text-center  px-2">{indx + 1}</p>
                                    <p className=" hover:underline border-l px-2">
                                        <Link to={`/tender/${tender.tenderID}`}>{tender.workItemDetails.title}</Link>
                                    </p>
                                    <p className=" border-l px-2">{tender.tenderReferenceNumber}</p>
                                    <p className=" border-l px-2">
                                        {new Date(tender.criticalDates.bidSubmissionEndDate).toLocaleDateString()}
                                    </p>
                                    <p className=" border-l px-2">
                                        {new Date(tender.criticalDates.bidOpeningDate).toLocaleDateString()}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">Submit New Tender</h3>
                            <button className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600">
                                Submit Tender
                            </button>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">Manage Submitted Tenders</h3>
                            <button className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600">
                                View Tenders
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
