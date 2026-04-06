# 🚆 Railway Deployment Guide

Hướng dẫn chi tiết kết nối dự án Employee Management System với Railway.com

## 📋 Mục lục
1. [Chuẩn bị](#chuẩn-bị)
2. [Tạo Database trên Railway](#tạo-database-trên-railway)
3. [Deploy Backend lên Railway](#deploy-backend-lên-railway)
4. [Cấu hình Frontend](#cấu-hình-frontend)
5. [Test & Troubleshoot](#test--troubleshoot)

---

## Chuẩn bị

### Yêu cầu trước
- ✅ GitHub account (với code được push)
- ✅ Railway account (đăng ký tại [railway.app](https://railway.app))
- ✅ Backend code trong thư mục `Backend-dacn/`
- ✅ Database schema trong `SQL-Database/employee_management_db.sql`

### Tài khoản Railway
1. Truy cập **[railway.app](https://railway.app)**
2. Click **"Sign up"**
3. Chọn "Continue with GitHub" (khuyến nghị)
4. Authorize Railway để truy cập GitHub

---

## Tạo Database trên Railway

### Step 1: Tạo MySQL Database

1. Vào **[railway.app dashboard](https://railway.app)**
2. Click **"New Project"** (hoặc **+ button**)
3. Chọn **"Provision Database"** hoặc **"MySQL"**
4. Railway sẽ tạo MySQL instance tự động

```
🔄 Chờ 2-3 phút để Railway khởi động database
```

### Step 2: Lấy Connection String

1. Bấm vào Railway project
2. Vào tab **"MySQL"** (hoặc database name)
3. Bấm **"Connect"**
4. Copy **Connection String** hoặc lấy từng thông tin:

```
HOST: [host_railway]
PORT: 3306
USER: [username]
PASSWORD: [password]
DATABASE: [database_name]
```

**Ví dụ Connection String:**
```
mysql://user:password@host.railway.app:3306/railway
```

### Step 3: Import Database Schema

**Option A: Dùng Railway CLI (Recommended)**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
cd Backend-dacn
railway link

# Connect to MySQL database
railway run mysql -h [host] -P 3306 -u [user] -p[password] < ../SQL-Database/employee_management_db.sql
```

**Option B: Dùng Terminal MySQL**

```bash
# Connect to Railway MySQL
mysql -h [host] -P 3306 -u [user] -p[password] [database]

# Then run:
# mysql> source /path/to/employee_management_db.sql;
```

**Option C: Dùng GUI Tool (DBeaver / Workbench)**

1. Download [DBeaver](https://dbeaver.io/) hoặc MySQL Workbench
2. Tạo kết nối mới với Railway MySQL credentials
3. Chạy script: `SQL-Database/employee_management_db.sql`

### Step 4: Verify Database

```bash
mysql -h [host] -u [user] -p[password] -e "USE [database]; SHOW TABLES;"
```

Kết quả sẽ hiển thị các table: users, employees, leaves, attendance, etc.

---

## Deploy Backend lên Railway

### Step 1: Chuẩn bị Backend Code

1. **Kiểm tra `Backend-dacn/package.json`** có đúng `"type": "module"`:
```json
{
  "name": "employee-management-api",
  "version": "1.0.0",
  "type": "module",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

2. **Kiểm tra `Backend-dacn/.env.example`**:
```
PORT=5000
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
```

3. **Commit code lên GitHub**:
```bash
git add .
git commit -m "ready for railway deployment"
git push origin main
```

### Step 2: Tạo Backend Service trên Railway

1. Vào **Railway Dashboard**
2. Click **"+ New Project"**
3. Chọn **"Deploy from GitHub repo"**
4. Klik **"Configure GitHub App"** nếu chưa authorize
5. Chọn repository của bạn
6. Chọn thư mục **`Backend-dacn`**

### Step 3: Cấu hình Environment Variables

Railway sẽ tự động detect kết nối MySQL. Bạn cần thêm:

1. Vào tab **"Variables"** của project
2. Thêm các biến:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Railway MySQL connection string |
| `JWT_SECRET` | Tạo một secret key dài (VD: `your_super_secret_jwt_key_12345678`) |
| `NODE_ENV` | `production` |
| `PORT` | `5000` (hoặc bỏ, Railway tự gán) |

**Làm sao lấy DATABASE_URL?**
- Vào MySQL service trong Railway
- Tab "Variables"
- Copy toàn bộ `DATABASE_URL` value

### Step 4: Deploy

1. Railway tự động detect `package.json`
2. Chọn **"Start Command"**: `npm start`
3. Build sẽ tự chạy
4. Sau 2-5 phút, backend sẽ live tại URL như: `https://your-backend-railway.up.railway.app`

### Step 5: Lấy Backend URL

1. Vào Railway project
2. Tab "Settings"
3. Tìm **"Public URL"** hoặc **"Domain"**
4. Copy URL (ví dụ: `https://employee-api.up.railway.app`)

---

## Cấu hình Frontend

### Step 1: Cập nhật API URL

Edit `Frontend-dacn/.env.production`:

```
REACT_APP_API_URL=https://your-backend-railway.up.railway.app/api
```

Ví dụ:
```
REACT_APP_API_URL=https://employee-api.up.railway.app/api
```

### Step 2: Cấu hình CORS ở Backend

Cập nhật `Backend-dacn/src/index.js`:

```javascript
import cors from 'cors';

const app = express();

// Configure CORS
app.use(cors({
  origin: [
    'https://your-frontend-vercel-domain.vercel.app',
    'http://localhost:3000'  // For development
  ],
  credentials: true
}));
```

### Step 3: Deploy Frontend lên Vercel

```bash
cd Frontend-dacn
npm install
vercel --prod
```

Hoặc dùng GitHub integration:
1. Push code lên GitHub
2. Vercel sẽ tự detect và deploy

### Step 4: Cấu hình Vercel Environment Variable

1. Vercel Dashboard → Project Settings → Environment Variables
2. Thêm variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-railway.up.railway.app/api`
3. **Redeploy** Vercel project

---

## Test & Troubleshoot

### ✅ Test Backend

```bash
# Test health check
curl https://your-backend-railway.up.railway.app/api/auth/health

# Test login
curl -X POST https://your-backend-railway.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### ✅ Test Frontend

1. Mở frontend URL: `https://your-frontend-vercel.vercel.app`
2. Đăng nhập với tài khoản mẫu:
   - Username: `admin`
   - Password: `admin123`

### ❌ Troubleshoot CORS Error

**Lỗi**: "Access to XMLHttpRequest blocked by CORS policy"

**Giải pháp**:
1. Kiểm tra CORS config ở backend `src/index.js`
2. Thêm frontend domain vào `origin`:
```javascript
app.use(cors({
  origin: 'https://your-frontend.vercel.app',
  credentials: true
}));
```
3. Redeploy backend

### ❌ Troubleshoot Connection Error

**Lỗi**: "Cannot connect to database"

**Giải pháp**:
1. Kiểm tra `DATABASE_URL` ở Railway variables
2. Test connection:
```bash
railway run mysql -h [host] -u [user] -p[password] -e "USE [db]; SELECT 1;"
```

### ❌ Troubleshoot Login Error

**Lỗi**: "Invalid credentials"

**Giải pháp**:
1. Kiểm tra tài khoản mẫu đã được tạo:
```bash
railway run mysql -h [host] -u [user] -p[password] [db] -e "SELECT username, role FROM users;"
```

2. Nếu không có dữ liệu, reset sample accounts:
```bash
curl -X POST https://your-backend-railway.up.railway.app/api/auth/reset-sample-accounts
```

---

## 🎯 Deployment Checklist

- [ ] Railway account tạo
- [ ] MySQL database tạo trên Railway
- [ ] Database schema imported
- [ ] Sample accounts tạo (admin/employee)
- [ ] Backend code push lên GitHub
- [ ] Backend service tạo trên Railway
- [ ] DATABASE_URL & JWT_SECRET set ở Railway
- [ ] Backend deploy thành công
- [ ] Backend public URL lấy được
- [ ] Frontend .env.production update API URL
- [ ] Frontend push lên GitHub
- [ ] Frontend deploy lên Vercel
- [ ] Vercel REACT_APP_API_URL set
- [ ] Login test thành công ✅

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Vercel (Frontend)                   │
│  https://your-app.vercel.app                            │
└──────────────┬──────────────────────────────────────────┘
               │ HTTP/HTTPS (API calls)
               ↓
┌─────────────────────────────────────────────────────────┐
│                Railway (Backend API)                    │
│  https://your-api.up.railway.app                        │
├─────────────────────────────────────────────────────────┤
│  • Node.js/Express Server                               │
│  • Port 5000 (internal)                                 │
│  • Environment: production                              │
└──────────────┬──────────────────────────────────────────┘
               │ TCP Connection
               ↓
┌─────────────────────────────────────────────────────────┐
│              Railway (MySQL Database)                   │
│  host:port/database                                     │
├─────────────────────────────────────────────────────────┤
│  • Employee Management DB                               │
│  • Users, Employees, Leaves, etc.                       │
└─────────────────────────────────────────────────────────┘
```

---

## 📞 Support & Resources

- **Railway Docs**: https://docs.railway.app
- **Railway CLI**: https://docs.railway.app/cli
- **MySQL Connection**: https://docs.railway.app/databases/mysql
- **Node.js on Railway**: https://docs.railway.app/frameworks/nodejs

---

## 🚀 Next Steps

1. ✅ Database setup
2. ✅ Backend deployment
3. ✅ Frontend deployment
4. 📊 Monitor logs: Railway Dashboard → "Logs" tab
5. 🔐 Setup SSL/TLS (Railway handles automatically)
6. 📈 Scale as needed

**Happy deploying! 🎉**
