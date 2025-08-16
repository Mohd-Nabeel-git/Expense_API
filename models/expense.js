import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Food", "Travel", "Shopping", "Bills", "Other"], // Example categories
    },
    description: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    },
},
    {
        timestamps: true
    });

export const Expense = mongoose.model("Expense", expenseSchema);