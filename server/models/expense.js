const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    contractor: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    verified: {
        type: Boolean,
        default: false,
    },
    file: { type: String, required: false },
});

const expenseModel = mongoose.model("Expense", ExpenseSchema);

module.exports = expenseModel;
