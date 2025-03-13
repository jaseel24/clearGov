import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/user/Home";
import UserProfile from "../pages/user/UserProfile";
import TenderView from "../pages/tender/TenderView";
import SearchResults from "../pages/tender/SearchResults";
import ContractorRegister from "../pages/contractor/ContractorRegister";
import UserDashboard from "../pages/user/UserDashboard";
import TenderDetails from "../pages/tender/TenderDetails";
import NotFound from "../pages/NotFound/NotFound";
import SubmitReports from "../pages/user/SubmitReports";
import Projects from "../pages/user/Projects";
import ProjectView from "../pages/user/ProjectView";
import ProtectedRoute from "../components/ProtectedRoute";

const UserRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contractor-registration" element={<ContractorRegister />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/" element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tender-details" element={<TenderDetails />} />
                    <Route path="/reports" element={<SubmitReports />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/tender/:tenderId" element={<TenderView />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:projectId" element={<ProjectView />} />
                    <Route path="/search-results/:searchQuerry" element={<SearchResults />} />
                </Route>
                <Route path="/*" element={<NotFound />} />a{" "}
            </Routes>
        </div>
    );
};

export default UserRoutes;
