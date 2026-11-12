# 🦷 Dental Lab Management System

<p align="center">
  A modern full-stack web application designed to simplify and manage daily dental laboratory operations.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge&logo=express" />
</p>

## 🌐 Live Demo

- **Frontend:** https://dental-lab-frontend-zwyv.onrender.com
- **Backend API:** https://dental-lab-backend-nizu.onrender.com

## 📌 About The Project

Dental Lab Management System is a full-stack MERN application built to manage dental laboratory workflows in one place.

It helps administrators manage doctors, patient cases, challans, payments, billing, and reports through a centralized dashboard.

The goal is to reduce manual record-keeping, improve workflow organization, and make daily lab operations easier.

## ✨ Features

- **Dashboard** — Overview of laboratory activities and key statistics.
- **Doctor Management** — Add, view, edit, and manage doctor records.
- **Case Management** — Create, track, update, and manage patient cases.
- **Challan Management** — Organize and track laboratory challans.
- **Payment Management** — Record payments and view payment history.
- **Billing System** — Track work amounts, received payments, and outstanding balances.
- **Reports** — View financial and operational reports.
- **Authentication** — Admin login with JWT authentication.
- **Form Validation** — Input validation for important forms.
- **Responsive Interface** — Dashboard layout adapted for different screen sizes.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JSON Web Token, bcryptjs |
| HTTP Client | Axios |
| Security | Helmet, CORS |
| Icons | Lucide React |
| Deployment | Render |

## 📂 Project Structure

```text
dental-lab/
├── client/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── app.js
│   └── server.js
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zakimujawar21/dental-lab.git
cd dental-lab
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_NAME=Your Admin Name
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend: `http://localhost:5000`

### 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

## 🔐 Security

- JWT-based authentication.
- Password hashing using bcryptjs.
- Protected backend routes.
- Environment variables for sensitive configuration.
- Helmet security headers.
- Restricted CORS configuration.

**Important:** Never commit `.env` files, database credentials, JWT secrets, or admin passwords to GitHub.

## 📸 Screenshots

Application screenshots coming soon.

## 🚀 Deployment

- **Frontend:** Render Static Site
- **Backend:** Render Web Service
- **Database:** MongoDB Atlas

## 👨‍💻 Author

**Zaki Mujawar**

BCA Student | Full-Stack Project

- GitHub: [@zakimujawar21](https://github.com/zakimujawar21)

---

<p align="center">
  Built with ❤️ to simplify dental laboratory management.
</p>