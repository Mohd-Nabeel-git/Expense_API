import express from 'express'
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import authRoutes from './routes/authRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

// Swagger setup
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "💰 Expense Tracker API is live 🚀",
    docs: "/api-docs",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login"
      },
      expenses: {
        add: "POST /api/expenses",
        getAll: "GET /api/expenses",
        update: "PUT /api/expenses/:id",
        delete: "DELETE /api/expenses/:id",
        summary: "GET /api/expenses/summary"
      }
    }
  });
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
  }
};

startServer();