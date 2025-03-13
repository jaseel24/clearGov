import React from "react";

const ExpenseReportView = ({ expenses }) => {
    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Expense Report</h1>
            <div className="overflow-x-auto">
                <table border={1} className="table-auto   w-full">
                    <thead>
                        <tr className="bg-gray-200 text-start ">
                            <th className="px-4 py-2 ">Date</th>
                            <th className="px-4 py-2 ">Contractor</th>
                            <th className="px-4 py-2 ">Description</th>
                            <th className="px-4 py-2 ">Amount</th>
                            <th className="px-4 py-2 ">Attachments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense._id} className="bg-white border-b">
                                <td className="px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{expense.contractor}</td>
                                <td className="px-4 py-2">{expense.description}</td>
                                <td className="px-4 py-2">${expense.amount.toFixed(2)}</td>
                                <td className="px-4 py-2">
                                    {expense.file ? (
                                        <a href={expense.file} className="text-blue-500 ">
                                            View
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseReportView;
