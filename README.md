# Employee Management System

A React-based employee management system with leave tracking, expense management, and salary administration.

**🚀 Deploy to Production with Railway:** [👉 Railway Deployment Guide](./RAILWAY_QUICK_START.md)

## Features

### Admin Features
- Dashboard overview
- Add and manage employees
- View employee details
- Approve/reject leave requests
- Manage expenses and salaries

### Employee Features
- View personal information
- Submit leave requests
- View leave history
- Edit/delete leave requests

## Quick Start

### 1. Local Setup (5 min)

```bash
# Terminal 1: Database
cd SQL-Database
setup.bat  # Windows or bash setup.sh for Mac/Linux

# Terminal 2: Backend
cd Backend-dacn
npm install
cp .env.example .env
npm run dev

# Terminal 3: Frontend
cd Frontend-dacn
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) and login with credentials below.

### 2. Deploy to Production (Railway + Vercel)

**👉 [RAILWAY_QUICK_START.md](./RAILWAY_QUICK_START.md)** - 5 minute deployment guide
**👉 [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)** - Complete step-by-step guide

## Default Login Credentials

**Admin:**
- Username: `admin`
- Password: `admin123`

**Employee:**
- Username: `employee`
- Password: `emp123`

## Technologies Used

- **Frontend:** React 18, React Router v6, Tailwind CSS
- **Backend:** Node.js, Express, MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:** Vercel (frontend), Railway (backend)
- Lucide React (icons)
