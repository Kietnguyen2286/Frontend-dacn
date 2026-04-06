# ⚡ Employee Management System - Quick Start

## 🎯 Choose Your Path

### Path 1: Local Development (5 min)
→ Run everything on your computer

### Path 2: Deploy to Production (Railway + Vercel - 15 min)
→ Go public with railway.app & vercel.com

---

## 📍 Local Development

### 1️⃣ Setup Database

```bash
cd SQL-Database

# Windows
setup.bat

# macOS/Linux
bash setup.sh
```

**Test Accounts:**
- Admin: `admin` / `admin123`
- Employee: `employee` / `emp123`

### 2️⃣ Start Backend

**Terminal 1:**
```bash
cd Backend-dacn
npm install
cp .env.example .env
# Edit .env with your MySQL credentials
npm run dev
```

✅ Backend running: `http://localhost:5000`

### 3️⃣ Start Frontend

**Terminal 2:**
```bash
cd Frontend-dacn
npm install
npm start
```

✅ Frontend running: `http://localhost:3000`

### 4️⃣ Login & Test
- Open http://localhost:3000
- Login with: `admin` / `admin123`

---

## 🚀 Production Deployment (Railway + Vercel)

### 👉 Full Guide
See **[RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)** for complete step-by-step instructions

### Quick Summary

#### Step 1: Deploy Backend to Railway

```bash
1. railway.app → Sign up (with GitHub)
2. New Project → Deploy from GitHub
3. Select Backend-dacn folder
4. Set environment variables:
   - DATABASE_URL: Railway MySQL connection
   - JWT_SECRET: Your secret key
5. Deploy (takes 2-5 min)
6. Copy public URL
```

#### Step 2: Deploy Frontend to Vercel

```bash
1. vercel.com → New Project
2. Select your GitHub repository
3. Set environment variable:
   - REACT_APP_API_URL: https://your-railway-backend/api
4. Deploy
```

#### Step 3: Test Production
- Open your Vercel URL
- Login with `admin` / `admin123`

---

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Cannot connect to database"** | Check MySQL is running / .env credentials |
| **"Invalid credentials" error** | Run: `curl -X POST http://localhost:5000/api/auth/reset-sample-accounts` |
| **"CORS error"** | Check backend CORS config in `src/index.js` |
| **"Port already in use"** | Change PORT in .env or kill process |
| **Login doesn't work on production** | Check REACT_APP_API_URL in Vercel env vars |

---

## 📚 More Info

| Topic | Link |
|-------|------|
| **Full Deployment Guide** | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| **Railway Setup (Detailed)** | [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) |
| **Backend API Docs** | [Backend-dacn/README.md](./Backend-dacn/README.md) |
| **Database Docs** | [SQL-Database/README.md](./SQL-Database/README.md) |
| **Architecture** | [ARCHITECTURE.md](./ARCHITECTURE.md) |

---

## ✅ Deployment Checklist

**Before deploying to Railway:**
- [ ] Code pushed to GitHub
- [ ] Backend can start locally (`npm run dev` works)
- [ ] .env.example has all required variables
- [ ] package.json has correct start script

**After deploying to Railway:**
- [ ] Backend public URL is accessible
- [ ] Database URL is correct
- [ ] Sample accounts work
- [ ] Vercel REACT_APP_API_URL is set to Railway URL

**After deploying to Vercel:**
- [ ] Frontend loads without errors
- [ ] Login redirects to dashboard
- [ ] All pages load correctly

---

**🎉 You're ready to launch! Happy deploying!**
