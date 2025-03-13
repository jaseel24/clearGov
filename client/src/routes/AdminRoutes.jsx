import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import Users from "../pages/admin/Users";
import User from "../pages/admin/User";
import AdminLogin from "../pages/admin/AdminLogin";
import AddUser from "../pages/admin/AddUser";
import NotFound from "../pages/NotFound/NotFound";
import Tenders from "../pages/tender/Tenders";
import Tender from "../pages/admin/Tender";
import Projects from "../pages/authority/Projects";
import ProjectDetails from "../pages/authority/ProjectDetails";
import ProjectStatus from "../pages/authority/ProjectStatus";
import TenderManagement from "../pages/admin/TenderManagement";

const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/" element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<Users />} />
                        {/* <Route path="/dashboard/tenders" element={<Tenders />} /> */}
                        <Route path="/dashboard/tenders" element={<TenderManagement />} />
                        <Route path="/dashboard/tender/:tenderId" element={<Tender />} />
                        <Route path="/dashboard/user/:id" element={<User />} />
                        <Route path="/dashboard/add-user" element={<AddUser />} />
                        <Route path="/dashboard/projects" element={<Projects />} />
                        <Route path="/dashboard/project/:projectId" element={<ProjectDetails />} />
                        <Route path="/dashboard/project/status/:projectId" element={<ProjectStatus />} />
                    </Route>
                </Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default AdminRoutes;
