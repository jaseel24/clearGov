import React from "react";
import Header from "../components/admin/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/admin/Footer";

const AdminLayout = () => {

    return (
        <div>
            <Header />
            {/* <div className="pt-20"> */}
            <Outlet />
            {/* </div> */}
            <Footer />
        </div>
    );
};

export default AdminLayout;
