import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthorityLayout from "../layouts/AuthorityLayout";
import Dashboard from "../pages/authority/Dashboard";
import ProjectForm from "../pages/authority/ProjectForm";
import GovernmentAuthorityForm from "../pages/authority/GovernmentAuthorityForm";
import NotFound from "../pages/NotFound/NotFound";
import Projects from "../pages/authority/Projects";
import ProjectDetails from "../pages/authority/ProjectDetails";
import TenderForm from "../pages/authority/TenderForm";
import BidsPage from "../pages/authority/BidsPage";
import ProfilePage from "../pages/authority/ProfilePage";
import ProjectStatus from "../pages/authority/ProjectStatus";
import Reports from "../pages/authority/Reports";

const AuthorityRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AuthorityLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/create-project" element={<ProjectForm />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/project/:projectId" element={<ProjectDetails />} />
                    <Route path="/project/status/:projectId" element={<ProjectStatus />} />
                    <Route path="/create-tender" element={<TenderForm />} />
                    <Route path="/bids" element={<BidsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
                <Route path="/register" element={<GovernmentAuthorityForm />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default AuthorityRoutes;
