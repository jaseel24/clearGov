import React, { useEffect, useState } from "react";
import Chart from "../../components/tender/Chart";
import axios from "../../config/axios.config";

const TenderDetails = () => {
    const [filterType, setFilterType] = useState("tenderCategory");

    const [tenders, setTenders] = useState([]);
    const [chartType, setChartType] = useState("pie");

    useEffect(() => {
        axios
            .get(`/tender/filter/${filterType}`)
            .then((res) => {
                console.log(res);
                setTenders(res.data.tenders);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [filterType]);

    const handleFilterChange = (filterType) => {
        setFilterType(filterType);
    };

    return (
        <div className="block">
            <div x-data="{ open : false }">
                <div className="bg-white shadow">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex justify-between gap-2">
                            <div className=" flex overflow-auto whitespace-nowrap">
                                <button
                                    onClick={() => handleFilterChange("tenderCategory")}
                                    className={`flex ${
                                        filterType === "tenderCategory" && "bg-red-500 text-white"
                                    }  items-center px-3 py-1 mr-3 border text-xs font-medium rounded `}
                                >
                                    Tenders By Category
                                </button>
                                <button
                                    onClick={() => handleFilterChange("organisationChain")}
                                    className={`flex ${
                                        filterType === "organisationChain" && "bg-red-500 text-white"
                                    }  items-center px-3 py-1 mr-3 border text-xs font-medium rounded `}
                                >
                                    Tenders By Organisation Chain
                                </button>
                                <button
                                    onClick={() => handleFilterChange("tenderLocation")}
                                    className={`flex ${
                                        filterType === "tenderLocation" && "bg-red-500 text-white"
                                    }  items-center px-3 py-1 mr-3 border text-xs font-medium rounded `}
                                >
                                    Tenders By Location
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-4 py-4 mx-auto">
                <div className="flex">
                    <div className="w-full">
                        <div className="rounded-md p-6  shadow">
                            <div className="mb-2 pb-2">
                                <div className=" flex mb-3 gap-5 items-center">
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-600">Tender chart</h3>
                                        <p className="text-sm text-gray-500">Amount of tenders</p>
                                    </div>
                                    <div className=" tooltip tooltip-right" data-tip="Choose chart type">
                                        <select
                                            onChange={(e) => setChartType(e.target.value)}
                                            className=" shadow cursor-pointer bg border rounded outline-none px-3 py-1"
                                            name="chartType"
                                            id="chartType"
                                            value={chartType}
                                        >
                                            <option value="pie">Pie</option>
                                            <option value="bar">Bar</option>
                                            <option value="area">Area</option>
                                        </select>
                                    </div>
                                </div>

                                <Chart chartType={chartType} tenders={tenders} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenderDetails;
