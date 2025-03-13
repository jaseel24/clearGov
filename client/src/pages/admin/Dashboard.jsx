import axios from "../.././config/axios.config";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../../components/admin/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className=" w-full  min-h-screen flex flex-col  ">
                <div className="  h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
