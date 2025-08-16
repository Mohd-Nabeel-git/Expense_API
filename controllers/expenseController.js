import { Expense } from "../models/Expense.js";

// @desc Add new expense
// @desc Add new expense
export const addExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  try {
    const expense = await Expense.create({
      userId: req.user.id,
      amount,
      category,
      description,
      date
    });

    // Budget check
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const expenses = await Expense.find({
      userId: req.user.id,
      date: {
        $gte: new Date(year, month, 1),
        $lte: new Date(year, month + 1, 0)
      }
    });

    const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);

    let response = { expense };
    if (req.user.monthlyBudget && totalSpent > req.user.monthlyBudget) {
      response.alert = `⚠️ You exceeded your monthly budget of ${req.user.monthlyBudget}`;
    }

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Get all expenses for logged-in user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update an expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user.id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get monthly summary
export const getMonthlySummary = async (req, res) => {
  try {
    const now = new Date();
    const month = now.getMonth(); // current month (0-11)
    const year = now.getFullYear();

    // Get all expenses for this month
    const expenses = await Expense.find({
      userId: req.user.id,
      date: {
        $gte: new Date(year, month, 1),
        $lte: new Date(year, month + 1, 0)
      }
    });

    const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);

    // Group by category
    const byCategory = {};
    expenses.forEach(exp => {
      byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
    });

    res.json({ totalSpent, byCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

