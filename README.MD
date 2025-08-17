# 💰 Expense Tracker API

A simple and secure **backend API** built with **Node.js, Express, and MongoDB** that helps users track their expenses, manage budgets, and get monthly summaries.  
Built as part of my internship (**Week 3 project**).

---

## 🚀 Features
- 🔑 **User Authentication** (JWT-based Register & Login)
- ➕ **Add Expenses** with category, description, and date
- 📜 **View All Expenses** for a logged-in user
- ✏️ **Update / Delete Expenses**
- 📊 **Monthly Summary** (total + per category breakdown)
- ⚠️ **Budget Alerts** when monthly budget is exceeded
- 🔒 Secure routes using **JWT middleware**
- 📖 **Swagger API Docs** for easy testing

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT + bcrypt  
- **Deployment:** Render  
- **Testing:** Postman & Swagger  

---

## 🌐 Live Demo
- 🚀 API Root: [https://expense-api-1-hyg5.onrender.com](https://expense-api-1-hyg5.onrender.com)  
- 📖 Swagger Docs: [https://expense-api-1-hyg5.onrender.com/api-docs](https://expense-api-1-hyg5.onrender.com/api-docs)  

---

## 🔑 Authentication Routes
- **Register:** `POST /api/auth/register`  
- **Login:** `POST /api/auth/login`  

---

## 💵 Expense Routes
- **Add Expense:** `POST /api/expenses`  
- **Get All Expenses:** `GET /api/expenses`  
- **Update Expense:** `PUT /api/expenses/:id`  
- **Delete Expense:** `DELETE /api/expenses/:id`  
- **Monthly Summary:** `GET /api/expenses/summary`  

---

## 🧪 Testing
- Use **Swagger UI**: [https://expense-api-1-hyg5.onrender.com/api-docs](https://expense-api-1-hyg5.onrender.com/api-docs)  
- Or test with **Postman** using the above endpoints.  

---

## 📌 Setup Locally
```bash
# Clone the repo
git clone https://github.com/your-username/Expense_API.git

# Install dependencies
npm install

# Add environment variables
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=3000

# Run server
npm run dev



