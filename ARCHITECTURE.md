# Architecture & Deployment Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         END USERS                                │
└──────┬──────────────────────────────────────┬───────────────────┘
       │                                      │
       ▼                                      ▼
┌──────────────────────┐         ┌─────────────────────────┐
│  Vercel Server       │         │  Heroku/Railway Server  │
│  (Frontend/React)    │         │  (Backend/Express API)  │
└──────────┬───────────┘         └────────┬────────────────┘
           │                              │
           │  HTTPS                       │  HTTPS/TCP
           │                              │
           └──────────────┬───────────────┘
                          │
                ┌─────────▼──────────┐
                │   CloudSQL/AWS RDS │
                │   MySQL Database   │
                └────────────────────┘
```

## Deployment Topology

```
┌─────────────────────────────────────────────────────────┐
│              GITHUB REPOSITORY                          │
│  Contains: Frontend + Backend + Database Schema         │
└──────────────┬──────────────────────────────────────────┘
               │
               ├─ GitHub Actions Workflow 1
               │  └─> Auto Deploy to VERCEL (Frontend)
               │
               ├─ GitHub Actions Workflow 2
               │  └─> Auto Deploy to HEROKU (Backend)
               │
               └─ GitHub Actions Workflow 3
                  └─> Auto Deploy to RAILWAY (Backend)

Manual Setup:
└─> Database Setup to AWS/Azure/DigitalOcean
```

## Technology Stack Separation

```
┌──────────────────────────────────────────────────────────┐
│                    FRONTEND                              │
├──────────────────────────────────────────────────────────┤
│ Technology: React 18 + Tailwind CSS + React Router       │
│ Platform:   Vercel (Serverless)                          │
│ Port:       3000 (dev) / 443 (prod)                      │
│ Entry:      public/index.html                            │
│ Config:     vercel.json + .env.production                │
└──────────────────────────────────────────────────────────┘
                         │ API Calls (JSON)
                         │
┌──────────────────────────────────────────────────────────┐
│                    BACKEND API                           │
├──────────────────────────────────────────────────────────┤
│ Technology: Node.js 18 + Express.js                      │
│ Platform:   Heroku / Railway (Containerless)             │
│ Port:       5000 (dev) / 443 (prod)                      │
│ Entry:      src/index.js                                 │
│ Routes:     /api/auth, /api/employees, etc.              │
│ Config:     Procfile (Heroku) + .env                     │
└──────────────────────────────────────────────────────────┘
                         │ SQL Queries
                         │
┌──────────────────────────────────────────────────────────┐
│                   DATABASE                               │
├──────────────────────────────────────────────────────────┤
│ Technology: MySQL 8.0+                                   │
│ Platform:   AWS RDS / Azure / DigitalOcean               │
│ Port:       3306                                         │
│ Database:   employee_management_db                       │
│ Tables:     8 (users, employees, leaves, etc.)           │
│ Schema:     SQL-Database/employee_management_db.sql      │
└──────────────────────────────────────────────────────────┘
```

## Data Flow

```
Browser Request
    │
    ▼
┌──────────────────┐
│  React Frontend  │
│  (Vercel)        │
└────────┬─────────┘
         │ HTTP Request
         │ (ApiService.js)
         ▼
┌────────────────────────────────┐
│  Express.js Backend            │
│  (Heroku/Railway)              │
│  - Validates JWT Token         │
│  - Checks User Roles           │
│  - Routes to correct handler   │
└────────┬───────────────────────┘
         │ SQL Query
         ▼
┌────────────────────────────────┐
│  MySQL Database                │
│  (AWS RDS/Azure/DigitalOcean)  │
│  - Executes Query              │
│  - Returns Results             │
└────────┬───────────────────────┘
         │ JSON Response
         ▼
┌────────────────────────────────┐
│  Express Backend               │
│  - Formats Response            │
│  - Sets HTTP Headers           │
└────────┬───────────────────────┘
         │ HTTP Response
         ▼
┌────────────────────────────────┐
│  React Frontend                │
│  - Receives Data               │
│  - Updates State               │
│  - Re-renders UI               │
└────────┬───────────────────────┘
         │
         ▼
      User sees updated content
```

## Development vs Production

```
┌─────────────────────────────────────────────────────────┐
│           DEVELOPMENT (Local Machine)                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Terminal 1:                                            │
│  $ cd Backend-dacn && npm run dev                       │
│  Server: http://localhost:5000                          │
│                                                         │
│  Terminal 2:                                            │
│  $ cd Frontend-dacn && npm start                        │
│  Server: http://localhost:3000                          │
│                                                         │
│  Terminal 3 (Optional):                                 │
│  $ mysql -u root -p                                     │
│  Database: localhost:3306                               │
│                                                         │
│  All on same network (localhost)                        │
│  Fast reload, easy debugging                            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│           PRODUCTION (Cloud Platforms)                   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend:                                               │
│  Deployed to Vercel @ https://your-app.vercel.app       │
│  CDN Enabled, Auto-scaling, SSL/HTTPS                   │
│                                                          │
│  Backend:                                                │
│  Deployed to Heroku @ https://your-api.herokuapp.com    │
│  or Railway @ https://your-api.railway.app              │
│  Auto-scaling, SSL/HTTPS                                │
│                                                          │
│  Database:                                               │
│  Deployed to AWS RDS @ mysql-prod.xxxxx.amazonaws.com   │
│  Automated Backups, High Availability                    │
│                                                          │
│  Connected via Internet (HTTPS)                          │
│  Production-grade security                              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Deployment Step-by-Step

```
STEP 1: Database Setup
├─ Create MySQL on Cloud (AWS RDS, Azure, DigitalOcean, etc.)
├─ Run SQL schema: employee_management_db.sql
└─ Note: Connection string

STEP 2: Backend Deployment
├─ Create account on Heroku or Railway
├─ Connect to GitHub
├─ Set environment variables (DB credentials, JWT secret)
├─ Auto-deploys from GitHub
└─ Get API URL: https://your-api.xxx.com/api

STEP 3: Frontend Deployment
├─ Create project on Vercel
├─ Connect to GitHub
├─ Set REACT_APP_API_URL = Backend API URL
├─ Auto-deploys from GitHub
└─ Get Frontend URL: https://your-app.vercel.app

STEP 4: Test Everything
├─ Visit Frontend URL
├─ Login with test credentials
├─ Test API calls
└─ Check logs for errors
```

## File Organization for Deployment

```
GitHub Repository Structure:
│
├── Frontend-dacn/               (Ready for Vercel)
│   ├── vercel.json
│   ├── .env.production
│   └── src/services/ApiService.js   (connects to backend)
│
├── Backend-dacn/                (Ready for Heroku/Railway)
│   ├── Procfile                 (Heroku)
│   ├── railway.example.json     (Railway)
│   ├── .env.example
│   └── src/index.js
│
├── SQL-Database/                (Setup for Cloud DB)
│   ├── employee_management_db.sql
│   ├── setup.sh                 (Linux/Mac)
│   └── setup.bat                (Windows)
│
├── .github/workflows/           (CI/CD Automation)
│   ├── deploy-frontend.yml      (→ Vercel)
│   ├── deploy-backend-heroku.yml (→ Heroku)
│   └── deploy-backend-railway.yml (→ Railway)
│
└── Documentation/
    ├── DEPLOYMENT_GUIDE.md      (Complete guide)
    ├── QUICKSTART.md            (Quick start)
    ├── PROJECT_SUMMARY.md       (This overview)
    └── PROJECT_STRUCTURE.md     (All files)
```

## Security Architecture

```
                    ┌──────────────────────┐
                    │   End User (Browser) │
                    └──────────┬───────────┘
                               │ HTTPS/SSL
                               ▼
                    ┌──────────────────────┐
                    │  Frontend (Vercel)   │
                    │  - CORS Enabled      │
                    │  - JWT Token         │
                    │  - Secure Storage    │
                    └──────────┬───────────┘
                               │ HTTPS/SSL
                               │ + JWT Token
                               ▼
                    ┌──────────────────────┐
                    │  Backend API         │
                    │  - Verify JWT        │
                    │  - Check Role        │
                    │  - Validate Input    │
                    │  - Hash Password     │
                    └──────────┬───────────┘
                               │ SSL
                               │ Encrypted Query
                               ▼
                    ┌──────────────────────┐
                    │  Database (MySQL)    │
                    │  - User Password     │
                    │  - Encrypted Data    │
                    │  - Access Control    │
                    └──────────────────────┘
```

## Scaling Architecture

```
Single User:
User → Frontend → Backend → Database
(Works fine)

Multiple Users:
Users → CDN (Vercel) → Frontend
        (Cached & distributed)
              ↓
        Backend Auto-scaling
        (Horizontal scaling)
              ↓
        Database Connection Pool
        (Multiple connections)
        
High Traffic:
Multiple CF ◄─→ Vercel CDN ◄─→ Multiple Backend Instances ◄─→ Database Cluster
(Worldwide)     (Cached)      (Load Balanced)              (Replication)
```

---

**This architecture ensures:**
- ✅ Separation of concerns (Frontend/Backend/Database)
- ✅ Independent scaling
- ✅ Easy maintenance
- ✅ Production-ready
- ✅ Auto-deployment via CI/CD
- ✅ Security best practices
