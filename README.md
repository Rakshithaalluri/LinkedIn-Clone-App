 💼 LinkedIn Clone App

A full-stack LinkedIn-like web application built using **React.js**, **Node.js**, **Express**, and **SQLite**. This app allows users to register, log in, view their profile, and post content — all with smooth navigation and a clean UI.


## 🚀 Live Demo

- **Frontend (Vercel)**: [https://linkedin-clone-app.vercel.app](https://linkedin-clone-app.vercel.app)  
- **Backend (Railway)**: [https://linkedin-backend-production.up.railway.app](https://linkedin-backend-production.up.railway.app)

## 🛠️ Tech Stack

| Layer | Tech Used |
| Frontend | React.js, CSS |
| Backend | Node.js, Express |
| Database | SQLite |
| Deployment | Vercel (Frontend) |
| | Railway (Backend - SQLite support) |


## 🧩 Features

- 🔐 User Registration & Login
- 📝 Post Feed with Live Posting
- 👤 Profile Page with User Posts
- 🌙 Light/Dark Mode Toggle
- ✅ Protected Routes (based on login)
- 🎨 Styled Components (Responsive + Clean)


## 📦 How to Run Locally

### 🔹 Backend
cd backend
npm install
node server.js


Runs server at http://localhost:3000

###🔹 Frontend
cd frontend
npm install
npm start
Runs client at http://localhost:3001 or the default React port


Deployment Info
🔸 Backend (Railway)
SQLite does not work on Render due to native binaries.
So this app uses Railway which fully supports SQLite and handles deployment properly.

🔸 Frontend (Vercel)
Vercel automatically detects the frontend/ directory and builds React apps efficiently.


