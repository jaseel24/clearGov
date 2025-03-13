import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-72">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Government Authority Info */}
                <div>
                    <h2 className="text-xl font-semibold">E-Tender Authority</h2>
                    <p className="mt-2 text-gray-400">
                        Government Procurement Department
                        <br /> Ministry of Public Works, Country Name
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold">Quick Links</h2>
                    <ul className="mt-2 space-y-2 text-gray-400">
                        <li>
                            <a href="/active-tenders" className="hover:text-white">
                                Active Tenders
                            </a>
                        </li>
                        <li>
                            <a href="/results" className="hover:text-white">
                                Tender Results
                            </a>
                        </li>
                        <li>
                            <a href="/corrigendum" className="hover:text-white">
                                Corrigendum
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-white">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h2 className="text-xl font-semibold">Contact Us</h2>
                    <p className="mt-2 text-gray-400">
                        Email: support@etender.gov
                        <br /> Phone: +123-456-7890
                        <br /> Address: Govt. Complex, Capital City
                    </p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-6 border-t border-gray-700 text-center pt-4 text-gray-400 text-sm">
                © {new Date().getFullYear()} Government of India. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
