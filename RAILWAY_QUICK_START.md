# 🚆 Hướng Dẫn Kết Nối Railway - Tóm Tắt

## ⚡ Cách Nhanh Nhất (5 phút)

### 1. Tạo Railway Account
```
→ railway.app
→ Sign up (chọn "Continue with GitHub")
→ Authorize Railway
```

### 2. Deploy Backend
```
1. New Project
2. Deploy from GitHub repo
3. Chọn Backend-dacn
4. Railway tự tạo MySQL database
5. Set variables: DATABASE_URL, JWT_SECRET
6. Deploy! (2-5 min)
```

### 3. Deploy Frontend
```
1. vercel.com → New Project
2. Chọn repository
3. Set: REACT_APP_API_URL = Railway backend URL + /api
4. Deploy! (1-2 min)
```

### 4. Test
```
→ Mở frontend URL
→ Login: admin / admin123
→ Xong! ✅
```

---

## 📚 Tài Liệu Chi Tiết

👉 **[RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)** - Hướng dẫn đầy đủ với ảnh chụp từng bước

---

## 🆘 Lỗi Phổ Biến

| Lỗi | Giải Pháp |
|-----|----------|
| **CORS error** | Kiểm tra CORS config ở backend src/index.js |
| **Cannot connect to DB** | Kiểm tra DATABASE_URL ở Railway variables |
| **Login fails** | Chạy: `curl -X POST your-backend-url/api/auth/reset-sample-accounts` |
| **API returns 404** | Kiểm tra public URL endpoint (thêm `/api` nếu cần) |

---

## 📖 Danh Sách Document

- **[RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)** ← Chi tiết từng bước
- **[QUICKSTART.md](./QUICKSTART.md)** - Khởi động nhanh
- **[ACTION_PLAN.md](./ACTION_PLAN.md)** - Kế hoạch từng phase
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Hướng dẫn toàn diện
- **[INDEX.md](./INDEX.md)** - Chỉ mục tất cả documents

---

**Sẵn sàng deploy? → [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) 🚀**
