# 💰 MERN AI Expense Tracker

A **full-stack personal finance management application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with **AI-powered expense categorization and recommendations**.

This app helps you **track income, expenses, budgets, and savings goals** while offering **interactive analytics, goal tracking, receipt scanning**, and **intelligent categorization** for a seamless money management experience.

---

## 🚀 Features

### **Core Functionality**
- 🔐 **Secure Authentication** – JWT-based Access & Refresh token system.
- ➕ **Add, Edit, Delete Transactions** – Manage income & expenses with ease.
- 🧠 **AI Auto Categorization** – NLP-based categorization of expenses using OpenAI.
- 🎯 **Budget Goals** – Set saving targets & track progress visually.
- 📊 **Charts & Analytics** – Interactive data visualization.
- 🌗 **Dark/Light Mode** – User-friendly UI theme toggle.

### **AI & Forecasting**
- 💡 **Smart Savings Tips** – AI-driven recommendations based on spending patterns.
- 📈 **Income vs Expense Forecasting** – Predictive analytics to stay on track.


## 🛠 Tech Stack

**Frontend**
- React.js (Vite)
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router DOM
- Recharts

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (File Uploads)
- Cloudinary (Image Hosting)
- JWT Authentication

**AI & Extras**
- OpenAI API (Recommendations & NLP)
- bcrypt.js (Password Hashing)
- CORS (Security)

---

## ⚙️ Installation & Setup

### **1️⃣ Clone Repositories**
```bash
# Clone backend
git clone https://github.com/nishant23042002/AI-Expense-Tracker-Backend
# Clone frontend
git clone https://github.com/nishant23042002/AI-Expense-Tracker

### 1 Backend Setup
cd AI-Expense-Tracker-Backend/server
npm install



---

## 📁 Screenshots

### 🏠 Homepage
![Dashboard Screenshot](./screenshots/Screenshot%202025-08-07%20193759.png)

### Add Income Transaction
![Add Income Transaction Screenshot](./screenshots/Screenshot%202025-08-02%20181355.png)

### Add Expense Transaction
![Add Expense Transaction Screenshot](./screenshots/Screenshot%202025-08-02%20181426.png)

### Transaction History
![Transaction History Screenshot](./screenshots/Screenshot%202025-08-02%20181439.png)

---


**Create a .env file in backend/ and add:**
MONGO_URI=your_mongodb_connection_string
PORT=4001
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production

**Run backend:**
npm start


### 2 Frontend Setup
cd AI-Expense-Tracker/client
npm install

**Create a .env file inside client/ with:**
VITE_BASE_URL=https://ai-expense-tracker-backend-4cy9.onrender.com/api/v1


**Run frontend:**
npm run dev


