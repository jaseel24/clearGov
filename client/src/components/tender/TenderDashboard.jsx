import React from "react";

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <nav className="bg-gray-800 text-white p-4 flex justify-between">
                <div className="text-xl font-bold">Tender Management Dashboard</div>
                <div className="space-x-4">
                    <a href="#" className="hover:text-yellow-300">
                        Active Tenders
                    </a>
                    <a href="#" className="hover:text-yellow-300">
                        Tenders by Closing Date
                    </a>
                    <a href="#" className="hover:text-yellow-300">
                        Corrigendum
                    </a>
                    <a href="#" className="hover:text-yellow-300">
                        Results
                    </a>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card for Active Tenders */}
                    <div className="bg-white shadow-lg p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Active Tenders</h3>
                        <p className="text-gray-600">Number of active tenders: 25</p>
                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            View All
                        </button>
                    </div>

                    {/* Card for Tenders by Closing Date */}
                    <div className="bg-white shadow-lg p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Tenders Closing Soon</h3>
                        <p className="text-gray-600">3 tenders closing in the next 7 days</p>
                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            View Details
                        </button>
                    </div>

                    {/* Card for Recent Corrigendum */}
                    <div className="bg-white shadow-lg p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Recent Corrigendum</h3>
                        <p className="text-gray-600">5 recent changes to tenders</p>
                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            View Corrigendum
                        </button>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Stat: Total Tenders */}
                    <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
                        <h4 className="text-lg font-bold">Total Tenders</h4>
                        <p className="text-2xl">120</p>
                    </div>

                    {/* Stat: Tenders by Category */}
                    <div className="bg-indigo-500 text-white p-4 rounded-lg shadow-lg">
                        <h4 className="text-lg font-bold">Tenders by Category</h4>
                        <p className="text-2xl">Construction, IT, Supplies</p>
                    </div>

                    {/* Stat: Closed Tenders */}
                    <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
                        <h4 className="text-lg font-bold">Closed Tenders</h4>
                        <p className="text-2xl">80</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">&copy; 2024 Tender Management System</footer>
        </div>
    );
};

export default Dashboard;
