import React, { useContext } from "react";
import Header from "../components/contractor/Header";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/contractor/Footer";
import { AuthContext } from "../context/AuthContext";

const ContractorLayout = () => {
    const { user } = useContext(AuthContext);

    if (user && user.role !== "Contractor") {
        return <Navigate to={"/login"} />;
    }
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default ContractorLayout;
