# ⚡ QUICK REFERENCE CARD

Print this or keep it open while setting up!

---

## 🎯 Starting Point

```
NEVER executed anything? Start here:
👉 Open: INDEX.md
👉 Then open: ACTION_PLAN.md (Phase 1)
👉 Then run: cd SQL-Database && setup.bat
```

---

## 📋 Phase 1: Local Setup (30 min)

```
Step 1: Database
$ cd SQL-Database
$ setup.bat (Windows) or bash setup.sh (Mac/Linux)

Step 2: Backend (Terminal 1)
$ cd Backend-dacn
$ npm install
$ cp .env.example .env
[EDIT .env - add your MySQL password]
$ npm run dev
→ http://localhost:5000/api/health ✓

Step 3: Frontend (Terminal 2)  
$ cd Frontend-dacn
$ npm install
$ npm start
→ http://localhost:3000 ✓

Step 4: Test
Login: admin / admin123
Everything works? ✓ → Ready for Phase 2
```

---

## 🚀 Phase 2: Production Setup (1-2 hours)

### 2a. Database on Cloud (20 min)
```
Choose ONE:
✓ AWS RDS → aws.amazon.com/rds
✓ Azure MySQL → azure.microsoft.com  
✓ DigitalOcean → digitalocean.com
✓ Linode → linode.com

Get: connection_string
Run: mysql -h host -u user -p < SQL-Database/employee_management_db.sql
```

### 2b. Backend to Heroku/Railway (30 min)

**Heroku:**
```
1. Create account: heroku.com
2. Create app: heroku create employee-api-prod
3. Set env vars: heroku config:set DB_HOST=... DB_USER=... etc
4. Deploy: git push heroku main
5. Get URL: https://employee-api-prod.herokuapp.com/api
```

**Railway:**
```
1. Create account: railway.app
2. Connect GitHub
3. Set env vars in dashboard
4. Auto-deploys when you push
5. Get URL from dashboard
```

### 2c. Frontend to Vercel (20 min)
```
1. Create account: vercel.com
2. Import project from GitHub
3. Set env var: REACT_APP_API_URL = your-backend-url
4. Deploy
5. Get URL: https://xxx.vercel.app
```

### 2d. Connect Frontend ↔ Backend (5 min)
```
After backend deployed get URL
Go to Vercel dashboard → Settings → Env Vars
Update: REACT_APP_API_URL = your-backend-url
Redeploy frontend
Test: Login in production ✓
```

---

## ⚙️ Phase 3: Auto-Deploy Setup (30 min)

```
Go to GitHub repo → Settings → Secrets and variables → Actions

Add for Vercel (get from Vercel account):
VERCEL_TOKEN = xxxxx
VERCEL_ORG_ID = xxxxx
VERCEL_PROJECT_ID = xxxxx
REACT_APP_API_URL = https://your-backend.com/api

Add for Heroku (get from Heroku account):
HEROKU_API_KEY = xxxxx
HEROKU_APP_NAME = employee-api-prod

Now whenever you push to GitHub:
✅ Frontend auto-deploys to Vercel
✅ Backend auto-deploys to Heroku
```

---

## 🔧 Configuration Files

### Backend `.env`
```
PORT=5000
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=employee_management_db
JWT_SECRET=generate_random_string
NODE_ENV=production
```

### Frontend `.env.production`
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 📚 Documentation Map

```
First time? → Read this order:
1. INDEX.md (2 min)
2. ACTION_PLAN.md (30 min)
3. Follow instructions

Need details? Check these:
✓ DEPLOYMENT_GUIDE.md → Full details
✓ ARCHITECTURE.md → System design  
✓ SETUP.md → Setup checklist
✓ Backend-dacn/README.md → API docs
✓ SQL-Database/README.md → Database docs
```

---

## 🧪 Test Logins

```
Admin:
  Username: admin
  Password: admin123

Employee:
  Username: employee  
  Password: emp123
```

---

## ✅ Verification Checklist

### Local (Phase 1)
- [ ] Database created (8 tables)
- [ ] Backend running at localhost:5000
- [ ] Frontend running at localhost:3000
- [ ] Can login as admin
- [ ] Dashboard displays
- [ ] No errors in console

### Production (Phase 2)
- [ ] Database on cloud
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Can login on production URL
- [ ] API calls work
- [ ] No CORS errors

### CI/CD (Phase 3)
- [ ] GitHub secrets set
- [ ] Workflows show in Actions tab
- [ ] Test push to GitHub
- [ ] Auto-deployment triggers
- [ ] Deployments complete successfully

---

## 🚨 Troubleshooting Quick Fix

| Problem | Fix |
|---------|-----|
| Can't connect to DB | Check .env credentials |
| Backend won't start | npm install again, check port |
| Frontend blank page | Check browser console F12 |
| CORS errors | Check REACT_APP_API_URL is correct |
| Login fails | Check backend is running |
| API not found | Check backend URL in frontend |

---

## 🎯 What Each Component Does

```
┌─────────────────────────────────┐
│ Frontend (React on Vercel)      │
│ What: User interface            │
│ Where: https://xxx.vercel.app   │
│ Port: 443 (HTTPS)               │
└─────────────┬───────────────────┘
              │
              ▼ API calls
┌─────────────────────────────────┐
│ Backend (Express on Heroku)     │
│ What: REST API endpoints        │
│ Where: https://xxx.herokuapp.com│
│ Port: 443 (HTTPS)               │
└─────────────┬───────────────────┘
              │
              ▼ SQL queries
┌─────────────────────────────────┐
│ Database (MySQL on AWS RDS)     │
│ What: Data storage              │
│ Where: mysql-xxx.amazonaws.com  │
│ Port: 3306                      │
└─────────────────────────────────┘
```

---

## 📊 API Endpoints Reference

```
Auth:
  POST /api/auth/login
  POST /api/auth/register

Employees:
  GET /api/employees
  POST /api/employees
  PUT /api/employees/:id
  DELETE /api/employees/:id

Leaves:
  GET /api/leaves
  POST /api/leaves
  PUT /api/leaves/:id

Attendance:
  GET /api/attendance
  POST /api/attendance/checkin
  POST /api/attendance/checkout

See Backend-dacn/README.md for all endpoints
```

---

## 💡 Pro Tips

```
✓ Keep one terminal for backend, one for frontend
✓ Save API URL in notes before deploying frontend
✓ Test locally BEFORE deploying
✓ Use GitHub actions for automatic deployment
✓ Check logs when something breaks (heroku logs --tail)
✓ Add error monitoring (optional but recommended)
✓ Backup database regularly in production
```

---

## ⏱️ Time Estimates

| Step | Time | Difficulty |
|------|------|-----------|
| Local Setup | 30 min | Easy |
| Cloud Database | 20 min | Easy |
| Backend Deploy | 30 min | Medium |
| Frontend Deploy | 20 min | Easy |
| CI/CD Setup | 30 min | Easy |
| **Total** | **2.5 hours** | **Beginner-friendly** |

---

## 🎊 Success Indicators

```
✅ Phase 1 Done:
   - Can login locally
   - Dashboard shows
   - No errors

✅ Phase 2 Done:
   - Backend has live URL
   - Frontend has live URL  
   - Can login in production
   - API calls work

✅ Phase 3 Done:
   - Push to GitHub
   - Deployments auto-run
   - Everything still works
   - You never touch deploy again!
```

---

## 📞 Need Help?

```
Problem? Check in this order:
1. Terminal output/logs
2. Browser console (F12)
3. DEPLOYMENT_GUIDE.md troubleshooting
4. Backend-dacn/README.md
5. SQL-Database/README.md
```

---

## 🚀 YOU ARE READY!

```
Next Action:
$ cd SQL-Database
$ setup.bat

Then read: ACTION_PLAN.md
```

**Good luck! 💪**
