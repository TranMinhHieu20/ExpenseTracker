# 💰 Expense Tracker - Ứng dụng Quản lý Thu chi Cá nhân

![Main Dashboard](link_anh_screenshot_cua_ban_neu_co)

**Expense Tracker** là một ứng dụng Fullstack (MERN) giúp người dùng theo dõi thu nhập, chi tiêu hàng ngày một cách trực quan thông qua biểu đồ và báo cáo chi tiết.

---

## 🚀 Tính năng chính

- **Dashboard Tổng quan:** Hiển thị tổng thu nhập, chi phí và số dư hiện tại.
- **Quản lý Thu nhập & Chi tiêu:** Thêm, sửa, xóa các giao dịch với các danh mục khác nhau.
- **Biểu đồ trực quan:** Sử dụng `Recharts` để hiển thị xu hướng thu chi dưới dạng Area Chart và Bar Chart.
- **Xuất báo cáo:** Hỗ trợ tải về chi tiết giao dịch dưới dạng file Excel (.xlsx).
- **Xác thực người dùng:** Đăng ký/Đăng nhập bảo mật với JWT (JSON Web Token).
- **Giao diện Responsive:** Tối ưu hóa trải nghiệm trên cả Desktop và Mobile với Tailwind CSS.

---

## 🛠 Công nghệ sử dụng

### Frontend

- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **Recharts** (Biểu đồ)
- **Axios** (Kết nối API)

### Backend

- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **JSON Web Token (JWT)** (Authentication)
- **xlsx** (Xử lý file Excel)

---

## ⚙️ Cài đặt dự án

Để chạy dự án này trên máy cục bộ, hãy làm theo các bước sau:

### 1. Clone dự án

```bash
git clone [https://github.com/TranMinhHieu20/ExpenseTracker.git](https://github.com/TranMinhHieu20/ExpenseTracker.git)
cd ExpenseTracker

2. Cấu hình Backend

Di chuyển vào vào thư mục Backend:
cd backend
npm install

Tạo file .env trong folder backend

PORT = 3000
MONGO_URI = mongodb+srv://tranhieu200304_db_user:gVDTwaTPbZqrd27v@cluster0.5hsdlyg.mongodb.net/?appName=expense-tracker(có thể tự tạo database, copy dán vào đây, nhớ bật quyền ip truy cập là tất cả 0.0.0.0)
JWT_SECRET = tùy ý của bạn
CLIENT_URL = http://localhost:5173(trùng với localhost frontend)


Chạy server:
npm run dev


3. Cấu hình Frontend

cd frontend
npm install
npm run dev
```

Chúc bạn may mắn!

Dashboard
![alt text](image.png)
