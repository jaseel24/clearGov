import React, { useEffect, useState } from "react";
import ExpenseReportView from "../../components/contractor/ExpenseReportView";
import axiosInstance from "../../config/axios.config";

const ViewExpenses = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/contractor/my-expenses")
            .then((res) => {
                console.log(res.data);
                setExpenses(res.data.expenses);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <ExpenseReportView expenses={expenses} />
        </div>
    );
};

export default ViewExpenses;
