# Setup Instructions Summary

## Quick Setup (5 minutes)

### 1. Database
```bash
mysql -u root -p < SQL-Database/employee_management_db.sql
```

### 2. Backend
```bash
cd Backend-dacn
npm install
cp .env.example .env
# Edit .env with your database details
npm run dev
```

### 3. Frontend
```bash
cd Frontend-dacn
npm install
npm start
```

### 4. Test
- Open: http://localhost:3000
- Login with: admin / admin123

## Deployment Checklist

### Frontend (Vercel)
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Set environment variable: REACT_APP_API_URL
- [ ] Deploy

### Backend (Heroku or Railway)
- [ ] Create database on cloud provider (AWS RDS, Azure, DigitalOcean, etc.)
- [ ] Create Heroku/Railway account
- [ ] Set database environment variables
- [ ] Deploy

### Database
- [ ] Create MySQL database on cloud
- [ ] Run SQL schema file: SQL-Database/employee_management_db.sql
- [ ] Verify tables created

## Project Folders

| Folder | Purpose | Deploy To |
|--------|---------|-----------|
| Frontend-dacn | React app | Vercel |
| Backend-dacn | Node.js API | Heroku/Railway |
| SQL-Database | MySQL schema | Any MySQL host |

## Important Files

| File | Purpose |
|------|---------|
| DEPLOYMENT_GUIDE.md | Complete step-by-step guide |
| QUICKSTART.md | Quick reference |
| Backend-dacn/.env.example | Backend config template |
| Backend-dacn/Procfile | Heroku deployment config |

## Default Test Users

- **Admin**: username: `admin`, password: `admin123`
- **Employee**: username: `employee`, password: `emp123`

## Production Deployment Steps

1. **Database Setup**
   - Set up MySQL on cloud (AWS RDS, Azure, etc.)
   - Run SQL schema
   
2. **Backend Deployment**
   - Configure environment variables
   - Deploy to Heroku or Railway
   - Get API URL

3. **Frontend Deployment**
   - Update REACT_APP_API_URL with backend URL
   - Deploy to Vercel

4. **Test Everything**
   - Test login
   - Test API calls
   - Check logs for errors

## Help

- See DEPLOYMENT_GUIDE.md for detailed instructions
- Check Backend-dacn/README.md for API documentation
- Check SQL-Database/README.md for database setup

---

You're all set! 🚀
