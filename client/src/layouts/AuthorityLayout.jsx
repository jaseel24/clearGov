import React from "react";
import Header from "../components/authority/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/authority/Footer";

const AuthorityLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default AuthorityLayout;
