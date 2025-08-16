import express from "express";
import {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getMonthlySummary
} from "../controllers/expenseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addExpense);         // Add expense
router.get("/", getExpenses);         // Get all expenses
router.put("/:id", updateExpense);    // Update expense
router.delete("/:id", deleteExpense); // Delete expense
router.get("/summary", getMonthlySummary); // Get monthly summary

export default router;
