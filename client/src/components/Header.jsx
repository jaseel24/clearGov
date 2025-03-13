import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const user = useSelector((state) => state.user);

    const handleSearchTenders = (e) => {
        e.preventDefault();
        if (searchQuery !== "") {
            window.location.replace(`/search-results/${searchQuery}`);
            setSearchQuery("");
        }
    };

    return (
        <div
            className={` transition-transform bg-gradient-to-br from-blue-950 to-blue-600  z-10 duration-700 ease-in sticky top-0  w-full `}
        >
            <div className=" w-full ">
                <header className=" p-4  bg-white border-b shadow-md">
                    <div className="container px-4 flex justify-between items-center">
                        <div className=" md:hidden bg-red-3f00 rounded">
                            <label htmlFor="my-drawer-4" className="drawer-button ">
                                <img width={40} className=" bg-orange-600 rounded-sm" src="/assets/hamburger.svg" alt="menu" />
                            </label>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold ">Tenders Kerala</h1>
                            <p className=" text-sm first-letter:text-orange-500 text-orange-800">
                                eProcurement system of Govt. of Kerala
                            </p>
                        </div>

                        <form onSubmit={handleSearchTenders} className=" w-[25%] relative hidden md:block">
                            <input
                                className=" placeholder:text-sm placeholder:text-gray-400 px-2 py-1 w-full rounded-md text-black outline-none border-2 focus:border-orange-600 "
                                type="text"
                                name="searchQuery"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                id=""
                                placeholder=" Search tenders (ID/RefNo/Title)"
                            />
                            <button>
                                <img
                                    className="  absolute right-1 bg-orange-100 cursor-pointer rounded-md top-[3px]"
                                    width={30}
                                    src="/assets/Search.svg"
                                    alt="search"
                                />
                            </button>
                        </form>

                        <nav className=" space-x-4 font-semibold justify-center items-center hidden text-orange-500 md:flex">
                            <Link to="/" className=" hover:underline ">
                                Home
                            </Link>
                            <Link to="/tender-details" className=" hover:underline">
                                Tenders
                            </Link>
                            <Link to="/projects" className=" hover:underline">
                                Projects
                            </Link>

                            <Link to="/reports" className=" hover:underline">
                                Report
                            </Link>

                            <Link to="/about" className=" hover:underline whitespace-nowrap">
                                About Us
                            </Link>
                            <Link to="/contact" className="hover:underline">
                                Contact
                            </Link>

                            {user && user.role !== "Citizen" && (
                                <Link className="hover:underline" to={"/login"}>
                                    Login
                                </Link>
                            )}

                            {user.role === "Citizen" && (
                                <div className=" w-10 h-10 rounded-full bg-red-200">
                                    <Link to={"/profile"}>
                                        <div className=" w-full h-full object- overflow-hidden rounded-full">
                                            <img
                                                className=" w-full h-full object-cover"
                                                src={user.avatar}
                                                alt="profile"
                                            />
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>

                    <div className="drawer drawer-start">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-side ">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-gradient-to-tl from-[#000040] to-black text-lg  text-orange-500  space-y-5 min-h-full w-60 p-4 pl-10 ">
                                <li className=" items-end">
                                    <label htmlFor="my-drawer-4" className="drawer-button ">
                                        <img width={30 }  src="/assets/close.svg" alt="close" />
                                    </label>
                                </li>
                                <Link to="/" className=" hover:underline hover:bg-orange-200 rounded-md p-2 ">
                                    Home
                                </Link>
                                <Link to="/tenders" className=" hover:underline hover:bg-orange-200 rounded-md p-2">
                                    Tenders
                                </Link>
                                <Link to="/reports" className=" hover:underline hover:bg-orange-200 rounded-md p-2">
                                    Report
                                </Link>
                                <Link to="/projects" className=" hover:underline">
                                    Projects
                                </Link>

                                <Link to="/about" className=" hover:underline hover:bg-orange-200 rounded-md p-2">
                                    About Us
                                </Link>
                                <Link to="/contact" className="hover:underline hover:bg-orange-200 rounded-md p-2">
                                    Contact
                                </Link>
                                {!user.username && (
                                    <Link to="/login" className="hover:underline hover:bg-orange-200 rounded-md p-2 ">
                                        <button className=" hover:underline">Login</button>
                                    </Link>
                                )}
                                <div className="  flex-1 flex items-end pb-5 ">
                                    {user.role === "Citizen" && (
                                        <Link className=" flex items-center  gap-2" to={"/profile"}>
                                            <div className=" w-10  h-10 rounded-full overflow-hidden bg-red-50">
                                                <img className=" h-full w-full object-cover" src={user.avatar} />
                                            </div>
                                            <p>{user.username}</p>
                                        </Link>
                                    )}
                                </div>
                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default Header;
