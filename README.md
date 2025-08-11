# 💰 MERN Expense Tracker App

A **full-stack personal finance management application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js) to help you **track income, expenses, budgets, and savings goals** with AI-powered recommendations.

This app provides **interactive analytics, goal tracking, receipt scanning**, and **intelligent categorization** for a seamless money management experience.

---

## 🚀 Features

### **Core Functionality**
- 🔐 **Secure Authentication** – Login & Signup with JWT-based Access + Refresh token system.
- ➕ **Add, Edit, Delete Transactions** – Manage income & expenses easily.
- 🧠 **AI Auto Categorization** – NLP-based categorization of expenses using OpenAI.
- 🎯 **Budget Goals** – Set saving targets & track progress visually.
- 📊 **Charts & Analytics** – Interactive data visualization for better financial insights.
- 🌗 **Dark/Light Mode** – Modern and user-friendly UI theme toggle.

### **AI & Forecasting**
- 💡 **Smart Savings Tips** – AI-driven recommendations based on spending patterns.
- 📈 **Income vs Expense Forecasting** – Predictive analytics to check if you’re on track.

---

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

## 📂 Project Structure



AI Expense-tracker/
│
├── server/ # Node.js + Express API
│ ├── database/ # DB connection, env config
│ ├── controllers/ # API route handlers
│ ├── middleware/ # Auth, error handling
│ ├── model/ # Mongoose models
│ ├── routes/ # API routes
│ ├── utils/ # Helper functions
│ └── server.js # Entry point
│
├── client/ # React + Vite app
│ ├── public/ # Static files
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # App pages
│ │ ├── redux/ # Redux slices & store
│ │ ├── context/ # Context
│ │ ├── hooks/ # Custom hooks
│ │ ├── utils/ # Axios instance, helpers
│ │ └── App.jsx
│ └── vite.config.js
│
└── README.md



---

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

---


## 📸 Screenshots

### Dashboard
![Dashboard Screenshot](./screenshots/Screenshot%202025-08-07%20193759.png)

### Add Income Transaction
![Add Income Transaction Screenshot](./screenshots/Screenshot%202025-08-02%20181355.png)

### Add Expense Transaction
![Add Expense Transaction Screenshot](./screenshots/Screenshot%202025-08-02%20181426.png)

### Transaction History
![Transaction History Screenshot](./screenshots/Screenshot%202025-08-02%20181439.png)





👨‍💻 Author
Nishant Sapkal
Full Stack Developer | MERN | AI Integrations
📧 Email: nishantsapkal2304@gmail.com
🔗 GitHub: https://github.com/nishant23042002
🔗 LinkedIn: www.linkedin.com/in/nishant-sapkal2304