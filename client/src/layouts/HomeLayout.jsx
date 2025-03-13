import React from "react";
import Header from "../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const HomeLayout = () => {
    

    return (
        <div>
            <Header />
            <div className=" min-h-screen ">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default HomeLayout;
