import React, { useEffect, useState } from "react";
import StartProjectButton from "../../components/contractor/StartProjectButton ";
import axiosInstance from "../../config/axios.config";

const ProjectsPage = () => {
    const [tenders, setTenders] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(`/contractor/won-tenders`)
            .then((res) => {
                setTenders(res.data.tenders);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className=" min-h-screen">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Awarded Projects</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tender Name
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tender ID
                                </th>

                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tenders.map((tender) => {
                                return (
                                    <tr key={tender._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {tender.workItemDetails.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {tender.tenderID}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 capitalize py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">
                                                {tender.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-5 text-sm font-medium">
                                            {tender.status!=="started"?<StartProjectButton tenderId={tender._id} />:<a
                                                href={`/contractor/projects/${tender.tenderID}`}
                                                className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full hover:text-violet-900"
                                            >
                                                Update Progress
                                            </a>}
                                            <a
                                                href={`/contractor/tenders/${tender.tenderID}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View Details
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* Add more rows dynamically */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
