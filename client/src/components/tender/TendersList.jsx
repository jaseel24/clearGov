import React from "react";
import { Link } from "react-router-dom";

const TendersList = ({ tenders }) => {
    console.log(tenders);

    return (
        <div className=" p-2 sm:p-8 md:p-10">
            <div className="overflow-x-auto">
                <table className=" relative table text-xs  h-full  text-[10px]    md:table-sm   ">
                    <tr className=" bg-blue-950 sticky top-0 text-[10px] md:text-sm text-white    ">
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
                                    <Link to={`/admin/dashboard/tender/${tender.tenderID}`}>{tender.workItemDetails.title}</Link>
                                </td>
                                <td>{tender.tenderReferenceNumber}</td>
                                <td>{new Date(tender.criticalDates.bidSubmissionEndDate).toLocaleDateString()}</td>
                                <td>{new Date(tender.criticalDates.bidOpeningDate).toLocaleDateString()}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};

export default TendersList;
