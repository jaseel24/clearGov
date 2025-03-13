import React, { useContext, useEffect, useState } from "react";
import axios from "../../config/axios.config";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

const Home = () => {
    const [tenders, setTenders] = useState([]);
    const [filterQuerry, setFilterQuerry] = useState("");

    const user = useSelector((state) => state.user);

    console.log(user);

    useEffect(() => {
        axios
            // .get(`/tender/tender?category=${filterQuerry}`)
            .get(`/tender/tenders`)
            .then((res) => {
                setTenders(res.data.tenders);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br bg-slate-100 from-slate-50 to-slate-100  ">
            <section className=" px-5 md:px-10 py-2">
                <div className=" flex justify-between">
                    <h1 className=" my-4 text-lg md:text-2xl font-bold">Latest Tenders</h1>
                    {!Object.keys(user).length && (
                        <div className=" flex gap-2">
                            <div className=" ">
                                <button className="  text-[10px]  p-2 rounded border mt-3  sm:text-[15px] hover:bg-green-500 hover:translate-x-2 hover:text-white transition-all duration-1000">
                                    <Link to={"/authority/register"}>Register as a Government Authority</Link>
                                </button>
                            </div>
                            <div className=" ">
                                <button className="  text-[10px]  p-2 rounded border mt-3  sm:text-[15px] hover:bg-green-500 hover:translate-x-2 hover:text-white transition-all duration-1000">
                                    <Link to={"/contractor/contractor-register"}>Online Bidder Enrollment</Link>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col ">
                    <div className=" ">
                        <div className="border overflow-y-auto  md:h-fit   rounded-md">
                            <div className=" ">
                                <table className=" relative table text-xs  md:text-lg font-thin h-full  text-[10px]    md:table-sm   ">
                                    <tr className=" bg-blue-950 sticky top-0 text-[10px] md:text-lg text-white    ">
                                        <th></th>
                                        <th className=" p-2">Tender Title </th>
                                        <th>Reference No </th>
                                        <th>Closing Date </th>
                                        <th>Bid Opening Date</th>
                                    </tr>

                                    {tenders.map((tender, indx) => {
                                        return (
                                            <tr className=" my-2 border border-blue-100" key={tender._id}>
                                                <th>{indx + 1}</th>
                                                <td className=" hover:underline">
                                                    <Link to={`/tender/${tender.tenderID}`}>
                                                        {tender.workItemDetails.title}
                                                    </Link>
                                                </td>
                                                <td>{tender.tenderReferenceNumber}</td>
                                                <td>
                                                    {new Date(
                                                        tender.criticalDates.bidSubmissionEndDate
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    {new Date(tender.criticalDates.bidOpeningDate).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <div className="overflow-x-auto z-0 px-5 md:px-10 py-2 relative">
                <h1 className=" my-4 text-lg md:text-2xl font-bold">Latest Corrigendums</h1>
                <table className="min-w-full   border border-gray-300 shadow-md rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-blue-950 border-b text-[10px] md:text-sm">
                            <th className="p-4 text-left font-semibold text-gray-200">Corrigendum Title</th>
                            <th className="p-4 text-left font-semibold text-gray-200">Reference No</th>
                            <th className="p-4 text-left font-semibold text-gray-200">Closing Date</th>
                            <th className="p-4 text-left font-semibold text-gray-200">Bid Opening Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((ele, i) => (
                            <tr key={i} className="hover:bg-gray-50 text-[10px] md:text-sm">
                                <td className="p-4 border-t border-gray-300">Title 1</td>
                                <td className="p-4 border-t border-gray-300">Ref001</td>
                                <td className="p-4 border-t border-gray-300">2024-11-15</td>
                                <td className="p-4 border-t border-gray-300">2024-11-16</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default Home;
