# Employee Management System - Complete Setup Guide

## 📜 Hướng dẫn Deployment

**Để tránh tài liệu quá dài, chúng tôi chia thành các hướng dẫn riêng:**

| Nền tảng | Hướng dẫn Chi tiết |
|----------|-------------------|
| **Railway** (Recommended) | 👉 [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) |
| **Heroku** | Xem phần dưới |
| **Vercel (Frontend)** | Xem phần dưới |

---

## Project Structure

```
.
├── Frontend-dacn/           # React Frontend (Deploy to Vercel)
├── Backend-dacn/            # Node.js/Express API (Deploy to Railway/Heroku)
└── SQL-Database/            # MySQL Database Schema
```

## Prerequisites

- Node.js 18+ installed
- MySQL Server running locally
- Git account
- Vercel account (for frontend)
- Railway or Heroku account (for backend)

---

## 🚀 Quick Deploy Path

### Quickest Way (Railway + Vercel)

```bash
# Step 1: Push code to GitHub
git add .
git commit -m "deploy"
git push

# Step 2: Go to railway.app → Deploy Backend
# (See RAILWAY_DEPLOYMENT.md for details)

# Step 3: Go to vercel.com → Deploy Frontend
# Set REACT_APP_API_URL to Railway backend URL
```

**Total time: ~15 minutes** ⚡

---

## 1. Database Setup

### Local Development

1. Install MySQL Server from [mysql.com](https://www.mysql.com/downloads/)

2. Create database and run schema:
```bash
mysql -u root -p < SQL-Database/employee_management_db.sql
```

3. Verify connection:
```bash
mysql -u root -p -e "USE employee_management_db; SHOW TABLES;"
```

### Production Database Options

**Recommended:**
- 🏆 **Railway MySQL** - Easiest, integrated with backend
- ⭐ **AWS RDS MySQL** - Most reliable
- 🟦 **Azure Database for MySQL** - Great with Microsoft stack
- 💧 **DigitalOcean Managed Database** - Good price/performance

**Connection String Format:**
```
mysql://user:password@host:port/database_name
```

---

## 2. Frontend Setup & Deployment (Vercel)

### Local Development

```bash
cd Frontend-dacn
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

### Deploy to Vercel

**Option 1: Using Vercel CLI**

```bash
npm install -g vercel
cd Frontend-dacn
vercel login
vercel --prod
```

**Option 2: GitHub Integration (Recommended)**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"Add New..."** → **"Project"**
4. Select your repository
5. Add environment variable:
   - Name: `REACT_APP_API_URL`
   - Value: Your backend URL (e.g., `https://your-api.up.railway.app/api`)
6. Click **"Deploy"**

**Environment Variables:**
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 3. Backend Deployment

### Option A: Railway (Recommended ⭐)

**👉 Full guide: [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)**

**Quick summary:**
```bash
1. railway.app → New Project
2. Deploy from GitHub (select Backend-dacn)
3. Add DATABASE_URL & JWT_SECRET variables
4. Deploy (auto from GitHub)
5. Get public URL
```

### Option B: Heroku

**Prerequisites:**
- Heroku account
- Heroku CLI installed

**Steps:****

1. Create Heroku app:
```bash
heroku login
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set DB_HOST=your_mysql_host
heroku config:set DB_USER=your_db_user
heroku config:set DB_PASSWORD=your_db_password
heroku config:set DB_NAME=your_db_name
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production
```

3. Deploy:
```bash
cd Backend-dacn
git push heroku main
```

4. View logs:
```bash
heroku logs --tail
```

### Deploy to Railway

**Prerequisites:**
- Railway account
- Railway CLI

**Steps:**

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login:
```bash
railway login
```

3. Create project:
```bash
cd Backend-dacn
railway init
```

4. Set environment variables:
```bash
railway variable set DB_HOST your_mysql_host
railway variable set DB_USER your_db_user
railway variable set DB_PASSWORD your_db_password
railway variable set DB_NAME your_db_name
railway variable set JWT_SECRET your_jwt_secret
railway variable set NODE_ENV production
```

5. Deploy:
```bash
railway up
```

## 4. Environment Configuration Summary

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### Backend (.env)
```
PORT=5000
DB_HOST=your-mysql-host.com
DB_USER=db_username
DB_PASSWORD=db_password
DB_NAME=employee_management_db
JWT_SECRET=your_very_secure_jwt_secret_key
NODE_ENV=production
```

## 5. Test the Deployment

### Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Employee Account:**
- Username: `employee`
- Password: `emp123`

### API Health Check
```bash
curl https://your-backend-domain.com/api/health
```

## 6. CI/CD with GitHub Actions

The project includes GitHub Actions workflows for automated deployment:

- `.github/workflows/deploy-frontend.yml` - Deploy frontend to Vercel
- `.github/workflows/deploy-backend-heroku.yml` - Deploy backend to Heroku
- `.github/workflows/deploy-backend-railway.yml` - Deploy backend to Railway

### Setup GitHub Secrets

For Vercel (Frontend):
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
REACT_APP_API_URL
```

For Heroku (Backend):
```
HEROKU_API_KEY
HEROKU_APP_NAME
```

For Railway (Backend):
```
RAILWAY_TOKEN
```

## 7. Troubleshooting

### Frontend Issues

**CORS Errors:** Ensure backend API URL is correct in `.env.production`

**API not found:** Check backend is running and accessible

**Blank page:** Check browser console for errors

### Backend Issues

**Database connection error:** Verify credentials and network access

**Port already in use:** Change PORT in .env file

**JWT errors:** Verify JWT_SECRET is set correctly

### Database Issues

**Can't connect remotely:** Check firewall rules and database user permissions

**Tables not created:** Run SQL schema file on production database

## 8. Production Checklist

- [ ] Database created and tables initialized
- [ ] Backend environment variables configured
- [ ] Frontend environment variables configured
- [ ] API endpoints tested
- [ ] Login functionality working
- [ ] CORS properly configured
- [ ] JWT secret is secure and unique
- [ ] Database backups configured
- [ ] SSL/HTTPS enabled
- [ ] Rate limiting configured (recommended)
- [ ] Error logging setup
- [ ] Monitor performance

## 9. Support

For issues or questions:
1. Check the logs: `heroku logs --tail` or Railway dashboard
2. Test locally first
3. Check network connectivity
4. Verify all environment variables are set

---

**Last Updated:** March 2026
