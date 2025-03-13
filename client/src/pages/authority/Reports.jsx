import React, { useEffect, useState } from "react";
import UserReports from "../../components/authority/UserReports";
import axiosInstance from "../../config/axios.config";

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/govauth/user-reports")
            .then((res) => {
                setReports(res.data.reports);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <div>
            <UserReports reports={reports} />
        </div>
    );
};

export default Reports;
