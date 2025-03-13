import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className=" shadow-md border border-gray-200 ">
            <header className=" p-5 flex w-full justify-between bg-slate-100">
                <div className=" text-xl sm:text-2xl md:text-3xl font-bold ">
                    <Link to={"/authority"}>Authority Dashboard</Link>
                </div>
                <nav className=" flex-1 w-full font-semibold ">
                    <ul className=" hidden  w-full sm:flex justify-evenly items-center h-full">
                        <li>
                            <Link to={"/authority/create-tender"}>Create Tender</Link>
                        </li>
                        <li>
                            <Link to={"/authority/projects"}>Projects</Link>
                        </li>
                        <li>
                            <Link to={"/authority/create-project"}>Create project</Link>
                        </li>
                        <li>
                            <Link to={"/authority/bids"}>Bids</Link>
                        </li>
                        <li>
                            <Link to={"/authority/reports"}>User reports</Link>
                        </li>
                        <li>
                            <Link to={"/authority/profile"}>Account</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
