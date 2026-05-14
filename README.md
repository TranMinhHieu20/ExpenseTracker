# 💰 Expense Tracker - Personal Finance Management App

![Project Banner](image-1.png)

**Expense Tracker** là một ứng dụng quản lý tài chính cá nhân toàn diện được xây dựng trên nền tảng MERN Stack (MongoDB, Express, React, Node.js). Ứng dụng giúp người dùng theo dõi thu nhập, chi tiêu hàng ngày một cách trực quan thông qua các biểu đồ phân tích và báo cáo chi tiết, từ đó tối ưu hóa thói quen quản lý tiền bạc.

---

## ✨ Tính năng nổi bật

- **📊 Dashboard Trực quan:** Cái nhìn tổng thể về Số dư (Balance), Tổng Thu nhập (Income) và Tổng Chi phí (Expense).
- **📈 Biểu đồ Phân tích:** 
  - Biểu đồ tròn (Pie Chart) phân tích tỷ trọng thu nhập và chi tiêu.
  - Biểu đồ cột (Bar Chart) theo dõi xu hướng chi tiêu theo danh mục.
- **📝 Quản lý Giao dịch:** Thêm, xóa và phân loại các khoản thu/chi dễ dàng với các biểu tượng (icons) sinh động.
- **📥 Xuất Báo cáo:** Hỗ trợ xuất dữ liệu giao dịch ra file Excel (.xlsx) chuyên nghiệp.
- **🔐 Bảo mật:** Hệ thống xác thực người dùng (Đăng ký/Đăng nhập) sử dụng **JWT (JSON Web Token)** và mã hóa mật khẩu với **Bcrypt**.
- **📱 Responsive Design:** Giao diện hiện đại, mượt mà trên mọi thiết bị từ Desktop đến Mobile nhờ Tailwind CSS.

---

## 🛠 Công nghệ sử dụng

### Frontend
- **React.js (Vite):** Thư viện UI hiện đại, tốc độ cao.
- **Tailwind CSS:** Framework CSS tối ưu cho giao diện Responsive.
- **Recharts:** Thư viện vẽ biểu đồ mạnh mẽ và linh hoạt.
- **Axios:** Xử lý các yêu cầu HTTP đến Backend.
- **React Router Dom:** Quản lý điều hướng trong ứng dụng.
- **Moment.js:** Xử lý và định dạng thời gian.

### Backend
- **Node.js & Express:** Môi trường chạy server và framework xử lý API.
- **MongoDB & Mongoose:** Cơ sở dữ liệu NoSQL và thư viện quản lý schema.
- **JSON Web Token:** Cơ chế xác thực người dùng an toàn.
- **Multer:** Xử lý upload hình ảnh (Avatar người dùng).
- **XLSX:** Thư viện tạo và xử lý file Excel.

---

## 📂 Kiến trúc dự án

```text
expense-tracker/
├── frontend/               # Mã nguồn React (Client)
│   ├── src/
│   │   ├── components/     # Các thành phần UI dùng chung
│   │   ├── pages/          # Các trang chính (Dashboard, Auth, Expense...)
│   │   ├── hooks/          # Custom hooks (Auth, State...)
│   │   ├── utils/          # Các hàm tiện ích (Axios instance, formatters...)
│   │   └── assets/         # Hình ảnh, icon, font
├── backend/                # Mã nguồn Node.js (Server)
│   ├── config/             # Cấu hình DB (MongoDB)
│   ├── controllers/        # Logic xử lý yêu cầu API
│   ├── models/             # Định nghĩa Schema dữ liệu (User, Income, Expense)
│   ├── routes/             # Định nghĩa các endpoint API
│   ├── middleware/         # Các hàm trung gian (Auth Guard)
│   └── uploads/            # Lưu trữ file upload cục bộ
└── README.md
```

---

## ⚙️ Hướng dẫn cài đặt

Để chạy dự án này trên máy của bạn, hãy thực hiện các bước sau:

### 1. Clone dự án
```bash
git clone https://github.com/TranMinhHieu20/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Cấu hình Backend
Di chuyển vào thư mục backend và cài đặt dependencies:
```bash
cd backend
npm install
```
Tạo file `.env` trong thư mục `backend` với các thông số sau:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
Chạy server backend:
```bash
npm run dev
```

### 3. Cấu hình Frontend
Di chuyển vào thư mục frontend và cài đặt dependencies:
```bash
cd ../frontend
npm install
```
Chạy ứng dụng:
```bash
npm run dev
```

---

## 🔗 Danh mục API chính

- **Auth:** `POST /api/v1/auth/register`, `POST /api/v1/auth/login`
- **Dashboard:** `GET /api/v1/dashboard` (Lấy dữ liệu tổng hợp)
- **Income:** `GET /api/v1/income/getIncomes`, `POST /api/v1/income/add`
- **Expense:** `GET /api/v1/expense/getExpenses`, `POST /api/v1/expense/add`

---

## 📸 Hình ảnh minh họa

| Dashboard Tổng quan | Danh sách Giao dịch |
|:---:|:---:|
| ![Dashboard](image.png) | ![Recent Transactions](image-1.png) |

---

## 🤝 Đóng góp và Liên hệ

Nếu bạn có bất kỳ thắc mắc hoặc đóng góp nào cho dự án, vui lòng liên hệ:
- **Tác giả:** Trần Minh Hiếu
- **Github:** [TranMinhHieu20](https://github.com/TranMinhHieu20)
- **Email:** [liên_hệ_của_bạn]@email.com

---
*Chúc bạn quản lý tài chính hiệu quả với Expense Tracker!*
