import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axios.config";
import { jwtDecode } from "jwt-decode";

const TenderView = () => {
    const { tenderId } = useParams();

    const [tender, setTender] = useState(null);

    useEffect(() => {
        axios
            .get(`/tender/tender/${tenderId}`)
            .then((res) => {
                setTender(res.data.tender);
            })
            .catch((err) => {
                console.log(err.response.message);
            });
    }, [tenderId]);

    return (
        <div className="max-w-4xl mx-auto tender-details mb-96 my-3 p-5  rounded-lg ">
            <h1 className="text-2xl font-bold mb-4">Tender Details</h1>
            <div className=" flex flex-col gap-4 mb-4 ">
                <div className="card bg-gray-50 p-4 rounded-lg leading-10">
                    <h2 className="text-lg md:text-xl border-b border-gray-300 my-1 pb-2 font-bold text-orange-600 ">
                        Basic details
                    </h2>
                    <div className=" my-5 grid  gap-2 md:gap-6  text-sm md:text-lg ">
                        <div className=" flex flex-col gap-2">
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Organisation Chain:</strong>
                                {tender?.organisationChain}
                            </p>
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Tender Reference Number:</strong>
                                {tender?.tenderReferenceNumber}
                            </p>
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Tender ID:</strong>
                                {tender?.tenderID}
                            </p>

                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Category:</strong> {tender?.tenderCategory}
                            </p>

                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Payment Mode:</strong>
                                {tender?.paymentMode}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className=" p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">No. of Covers:</strong> {tender?.covers?.length}
                            </p>
                            <p className=" p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Covers:</strong>{" "}
                                {tender?.covers.map((cover, i) => {
                                    return <li key={i}>{cover}</li>;
                                })}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card bg-gray-50 p-4 rounded-lg leading-10">
                    <h2 className="text-lg md:text-xl border-b border-gray-300 my-1 pb-2 font-bold text-orange-600 ">
                        Work item details
                    </h2>
                    <div className=" my-5 grid  gap-2 md:gap-6  text-sm md:text-lg ">
                        <div className=" flex flex-col gap-2">
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Title:</strong>
                                <p>{tender?.workItemDetails?.title}</p>
                            </p>
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Description:</strong>
                                {<p>{tender?.workItemDetails?.description}</p>}
                            </p>
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Location:</strong>
                                {<p>{tender?.workItemDetails?.location}</p>}
                            </p>
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Tender Value:</strong>
                                {<p>{tender?.workItemDetails?.tenderValue}</p>}
                            </p>

                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Payment Mode:</strong>
                                {tender?.paymentMode}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card bg-gray-50 p-4 rounded-lg leading-10">
                    <h2 className="text-lg md:text-xl border-b border-gray-300 my-1 pb-2 font-bold text-orange-600 ">
                        Critical Dates
                    </h2>
                    <div className=" my-5   gap-2 md:gap-6  text-sm md:text-lg ">
                        <div className=" flex flex-col gap-2">
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Bid opening date:</strong>
                                <p>{new Date(tender?.criticalDates?.bidOpeningDate).toLocaleDateString()}</p>
                            </p>
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Bid submission end date:</strong>
                                <p>{new Date(tender?.criticalDates?.bidSubmissionEndDate).toLocaleDateString()}</p>
                            </p>
                            <p className=" flex gap-2 p-2 bg-gray-100 rounded-sm">
                                <strong className=" text-blue-950">Bid published date:</strong>
                                <p>{new Date(tender?.criticalDates?.publishedDate).toLocaleDateString()}</p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenderView;
