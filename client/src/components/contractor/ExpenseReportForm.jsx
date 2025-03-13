import { useState } from "react";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";

const ExpenseReportForm = () => {
    const [formData, setFormData] = useState({
        date: "",
        description: "",
        amount: "",
        file: null,
    });

    const [Loading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "file") {
            setFormData({ ...formData, file: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const expenseData = new FormData();
        expenseData.append("date", formData.date);
        expenseData.append("description", formData.description);
        expenseData.append("amount", formData.amount);
        if (formData.file) {
            expenseData.append("file", formData.file);
        }

        try {
            axiosInstance
                .post("/contractor/expense", expenseData)
                .then((res) => {
                    toast.success("Report submitted successfully!");
                })
                .catch((err) => {
                    toast.error(err.response.data.error);
                })
                .finally(() => {
                    setIsLoading(false);
                    setFormData({ date: "", description: "", amount: "", file: null });
                });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className=" max-w-xl flex mx-auto min-h-screen p-10">
            <form onSubmit={handleSubmit} className="space-y-4 ">
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="file"
                    name="file"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    {Loading ? "Loading..." : "Add Expense"}
                </button>
            </form>
        </div>
    );
};

export default ExpenseReportForm;
