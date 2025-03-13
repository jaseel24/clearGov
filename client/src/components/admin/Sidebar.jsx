import React from "react";

const Sidebar = ({ setActiveSection }) => {
    return (
        <aside className="w-64 bg-blue-600 text-white flex flex-col">
            <div className="p-4 text-lg font-semibold">Admin Dashboard</div>
            <nav className="flex-grow">
                <ul>
                    <li
                        className="p-4 hover:bg-blue-700 cursor-pointer"
                        onClick={() => setActiveSection("UserManagement")}
                    >
                        User Management
                    </li>
                    <li
                        className="p-4 hover:bg-blue-700 cursor-pointer"
                        onClick={() => setActiveSection("TenderManagement")}
                    >
                        Tender Management
                    </li>
                    <li className="p-4 hover:bg-blue-700 cursor-pointer" onClick={() => setActiveSection("Reports")}>
                        Reports
                    </li>
                    <li className="p-4 hover:bg-blue-700 cursor-pointer" onClick={() => setActiveSection("Settings")}>
                        Settings
                    </li>
                </ul>
            </nav>
            <div className="p-4 text-sm">© 2025 eTender</div>
        </aside>
    );
};

export default Sidebar;
