# 🚀 Deploy Frontend lên Railway

Hướng dẫn deploy React Frontend của Employee Management System lên Railway.

## 📋 Điều kiện tiên quyết

- ✅ Backend đã deploy trên Railway (có URL)
- ✅ Database đã tạo trên Railway
- ✅ Code đã push lên GitHub
- ✅ Railway account

---

## 🎯 Các bước Deploy Frontend

### Step 1: Chuẩn bị - Lấy Backend URL

1. Vào **[railway.app](https://railway.app)** Dashboard
2. Tìm Backend service đã deploy
3. Vào tab **"Network"** → Copy **Public URL**
4. Ví dụ: `https://your-api.up.railway.app`

### Step 2: Cập nhật .env.production

Cập nhật file `.env.production` với Backend URL thực tế:

```bash
# File: Frontend-dacn/.env.production
REACT_APP_API_URL=https://your-backend-url.up.railway.app/api
```

**Thay `your-backend-url` bằng URL Backend của bạn**

### Step 3: Push Code lên GitHub

```bash
cd Frontend-dacn

# Cập nhật & commit
git add .
git commit -m "chore: add frontend server config for Railway"
git push origin main
# hoặc: git push origin kiet (nếu dùng branch khác)
```

### Step 4: Deploy trên Railway Dashboard

**Option A: Deploy từ GitHub UI (Khuyến nghị)**

1. Vào **[railway.app](https://railway.app)**

2. Vào Project của bạn (nơi có Backend)

3. Click **"+ New"** → **"Service"**

4. Chọn **"GitHub Repo"**

5. Select repository của bạn

6. Chọn **Root Directory**: `/` (hoặc để trống)
   - Railway sẽ auto-detect `Procfile` và `package.json`
   - ⚠️ **Quan trọng**: Đảm bảo là Frontend folder, không phải Backend!

7. Click **"Create Service"**2

8. Chờ Railway build (2-3 phút)

9. Vào tab **"Network"** copy Public URL

---

**Option B: Deploy từ Railway CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Move to Frontend folder
cd Frontend-dacn

# Link với Railway project
railway link
# (Chọn project + service khi được hỏi)

# Deploy
railway up
```

---

### Step 5: Cấu hình Environment Variables trên Railway

1. Vào Railway Dashboard
2. Click Frontend service vừa tạo
3. Vào tab **"Variables"**
4. Thêm biến:

```
REACT_APP_API_URL = https://your-backend-url.up.railway.app/api
NODE_ENV = production
```

5. Click **"Save"** → Railway sẽ tự động redeploy

---

## ✅ Test Deployment

### 1. Check Health Endpoint
```bash
curl https://your-frontend-url.up.railway.app/health
```

Kết quả mong muốn:
```json
{"status":"ok","timestamp":"2026-04-11T..."}
```

### 2. Test Frontend Load
Mở browser:
```
https://your-frontend-url.up.railway.app/
```

✅ Nếu thấy trang login → Deploy thành công!

### 3. Test Backend Connection
1. Login với account test
2. Vào Dashboard
3. Nếu load dữ liệu → Backend connection ok!

---

## 🔧 Troubleshooting

### ❌ Lỗi: "Cannot GET /"

**Nguyên nhân**: Railway chưa rebuild hoặc Procfile lỗi

**Giải pháp**:
1. Vào Railway Dashboard
2. Tìm Frontend service
3. Kích nút **"..." (3 chấm)** → **"Redeploy"**
4. Chờ build hoàn thành
5. Check **Deployment** tab xem có error không

---

### ❌ Lỗi: "API not found" / "Cannot connect to backend"

**Nguyên nhân**: `REACT_APP_API_URL` sai

**Giải pháp**:
1. Vào Railway Frontend service
2. Tab **"Variables"**
3. Kiểm tra `REACT_APP_API_URL` đúng chưa
4. Testconnect: `curl REACT_APP_API_URL/health`
5. Nếu error, fix Backend URL rồi **Redeploy**

---

### ❌ Lỗi: "Build failed"

**Xem logs**:
```bash
railway logs
# hoặc trên Dashboard: Deployment → Logs
```

**Phổ biến**:
- Missing `node_modules` → Chạy: `npm install`
- React build error → Check `npm run build` locally
- Port conflict → Check `PORT` env var

---

### ❌ Frontend loads nhưng không có dữ liệu

**Nguyên nhân**: Backend hoặc Database có issue

**Kiểm tra**:
1. Kiểm tra Backend logs
2. Test Backend health: `curl https://your-backend.up.railway.app/api/health`
3. Kiểm tra Database kết nối
4. Xem browser Console (F12) - có CORS error không?

---

### ✅ Cấu hình CORS (nếu cần)

Nếu thấy lỗi CORS trong browser console, cập nhật Backend:

File: `Backend-dacn/src/index.js`

```javascript
import cors from 'cors';

const allowedOrigins = [
  'https://your-frontend-url.up.railway.app',
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

---

## 📊 Kiến trúc Deploy

```
┌─────────────────────────────────────────────────┐
│          Railway Project                         │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌────────────────────┐  ┌────────────────────┐ │
│  │   Frontend Service │  │  Backend Service   │ │
│  ├────────────────────┤  ├────────────────────┤ │
│  │ URL: ...ac.app     │  │ URL: ...ap.app     │ │
│  │ Port: 3000         │  │ Port: 5000         │ │
│  │ Procfile: ✓        │  │ Procfile: ✓        │ │
│  └────────────────────┘  └────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │    MySQL Database                          │ │
│  ├────────────────────────────────────────────┤ │
│  │ Host: railway host                         │ │
│  │ Port: 3306                                 │ │
│  │ Tables: ✓ (user, employee, leaves, etc)   │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 📝 Checklist Deploy

- [ ] Backend URL copied từ Railway
- [ ] `.env.production` cập nhật với Backend URL
- [ ] Code pushed lên GitHub
- [ ] Frontend service created trên Railway
- [ ] Environment variables set trên Railway
- [ ] `/health` endpoint returning 200
- [ ] Frontend loads (không thấy "Cannot GET /")
- [ ] Login works
- [ ] Dashboard load dữ liệu

---

## 🎉 Hoàn thành Deploy!

Nếu các bước trên đều ✓, Frontend đã deploy thành công!

**Next steps**:
- Thêm custom domain (nếu có)
- Set up SSL (Railway tự động)
- Monitor logs & performance
- Setup auto-backup Database

---

**Cần hỗ trợ?** Check logs trên Railway Dashboard hoặc liên hệ support.

---

**Last Updated**: April 11, 2026
