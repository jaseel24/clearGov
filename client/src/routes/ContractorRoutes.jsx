import React from "react";
import { Route, Routes } from "react-router-dom";
import ContractorRegister from "../pages/contractor/ContractorRegister";
import Dashboard from "../pages/contractor/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import Tenders from "../pages/tender/Tenders";
import ContractorLayout from "../layouts/ContractorLayout";
import BidSubmission from "../pages/contractor/BidSubmission";
import TenderView from "../pages/tender/TenderView";
import MyBidsPage from "../pages/contractor/MyBidsPage";
import BidView from "../pages/contractor/BidView";
import Profile from "../pages/contractor/Profile";
import ExpenseReport from "../pages/contractor/ExpenseReport";
import ViewExpenses from "../pages/contractor/ViewExpenses";
import UpcomingDeadlines from "../pages/tender/UpComingDeadlines";
import ProjectsPage from "../pages/contractor/ProjectsPage";
import UpdateProgressPage from "../pages/contractor/UpdateProgressPage";

const ContractorRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/contractor-register" element={<ContractorRegister />} />
                <Route path="/" element={<ContractorLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/tenders" element={<Tenders />} />
                    <Route path="/tenders/:tenderId" element={<TenderView />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:tenderId" element={<UpdateProgressPage />} />
                    <Route path="/bids" element={<MyBidsPage />} />
                    <Route path="/bids/:bidId" element={<BidView />} />
                    <Route path="/bid-submission/:tenderId" element={<BidSubmission />} />
                    <Route path="/latest-tenders" element={<Tenders />} />
                    <Route path="/upcoming-deadlines" element={<UpcomingDeadlines />} />
                    <Route path="/expense-report-form" element={<ExpenseReport />} />
                    <Route path="/view-expense" element={<ViewExpenses />} />
                </Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default ContractorRoutes;
