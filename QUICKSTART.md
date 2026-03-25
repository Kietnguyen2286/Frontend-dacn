# Employee Management System - Quick Start

## 🚀 Fast Track Deployment

### 1. Database Setup (MySQL)

```bash
# Run SQL schema
mysql -u root -p < SQL-Database/employee_management_db.sql

# Verify
mysql -u root -p -e "USE employee_management_db; SELECT COUNT(*) as tables FROM information_schema.tables WHERE table_schema='employee_management_db';"
```

**Test Accounts:**
- Admin: `admin` / `admin123`
- Employee: `employee` / `emp123`

### 2. Local Development

**Terminal 1 - Backend:**
```bash
cd Backend-dacn
npm install
cp .env.example .env
# Edit .env with your mysql credentials
npm run dev
```

Backend: `http://localhost:5000/api`

**Terminal 2 - Frontend:**
```bash
cd Frontend-dacn
npm install
npm start
```

Frontend: `http://localhost:3000`

### 3. Production Deployment

#### Frontend (Vercel)
```bash
cd Frontend-dacn
npm install -g vercel
vercel login
vercel --prod
# Set REACT_APP_API_URL environment variable
```

#### Backend (Choose One)

**Option A: Heroku**
```bash
cd Backend-dacn
heroku login
heroku create your-app-name
# Set database environment variables
heroku config:set DB_HOST=xxx DB_USER=xxx DB_PASSWORD=xxx DB_NAME=xxx JWT_SECRET=xxx
git push heroku main
```

**Option B: Railway**
```bash
cd Backend-dacn
npm install -g @railway/cli
railway login
railway init
# Set database environment variables
railway variable set DB_HOST=xxx ...
railway up
```

### 4. Connect Frontend to Backend

After backend deployment, update frontend environment variable:

**Vercel Dashboard:**
1. Go to Project Settings
2. Environment Variables
3. Set `REACT_APP_API_URL` = your backend URL
4. Redeploy

---

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.
