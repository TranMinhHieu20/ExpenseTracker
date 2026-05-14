# BÁO CÁO CHI TIẾT: HỆ THỐNG THÔNG TIN QUẢN LÝ
**Đề tài: Thiết kế và Xây dựng Hệ thống quản lý chi tiêu cá nhân (Expense Tracker)**

---

## CHƯƠNG 1: GIỚI THIỆU TỔNG QUAN

### 1.1. Lý do chọn đề tài
Trong bối cảnh kinh tế hiện đại, việc quản lý tài chính cá nhân không còn đơn thuần là ghi chép sổ sách mà đòi hỏi sự hỗ trợ của các công cụ công nghệ để phân tích và tối ưu hóa. Đề tài này tập trung giải quyết bài toán kiểm soát dòng tiền cá nhân, giúp người dùng tránh được các rủi ro tài chính và xây dựng kế hoạch tiết kiệm hiệu quả.

### 1.2. Mục tiêu nghiên cứu
- Ứng dụng công nghệ MERN Stack để xây dựng hệ thống quản lý thu chi.
- Đảm bảo tính bảo mật và toàn vẹn dữ liệu cho người dùng.
- Cung cấp trải nghiệm người dùng tối ưu thông qua Dashboard trực quan.

---

## CHƯƠNG 2: PHÂN TÍCH HỆ THỐNG CHI TIẾT

### 2.1. Các Tác nhân (Actors) trong hệ thống
Hệ thống xác định các tác nhân chính sau:

1.  **Khách (Guest):** 
    - Người dùng chưa đăng nhập vào hệ thống.
    - Quyền hạn: Xem trang giới thiệu, đăng ký tài khoản mới và đăng nhập.
2.  **Thành viên (User/Member):** 
    - Người dùng đã có tài khoản và được xác thực qua JWT.
    - Quyền hạn: Quản lý toàn bộ dữ liệu thu chi cá nhân, xem biểu đồ thống kê, xuất báo cáo Excel và quản lý hồ sơ cá nhân.
3.  **Hệ thống (System/Database):**
    - Đóng vai trò lưu trữ, xử lý logic tính toán số dư và tự động hóa việc vẽ biểu đồ.

### 2.2. Danh sách yêu cầu hệ thống

#### 2.2.1. Yêu cầu chức năng (Functional Requirements)
- **RF1 - Quản lý tài khoản:** Cho phép đăng ký, đăng nhập và bảo mật phiên làm việc.
- **RF2 - Quản lý Thu nhập:** Thêm, xóa, liệt kê các khoản thu.
- **RF3 - Quản lý Chi tiêu:** Thêm, xóa, liệt kê các khoản chi tiêu theo danh mục (Ăn uống, Di chuyển, v.v.).
- **RF4 - Thống kê Dashboard:** Tự động tính toán Tổng thu, Tổng chi và Số dư hiện tại.
- **RF5 - Trực quan hóa dữ liệu:** Vẽ biểu đồ tròn phân tích cơ cấu và biểu đồ cột theo dõi xu hướng.
- **RF6 - Xuất dữ liệu:** Hỗ trợ tải xuống file Excel chứa chi tiết các giao dịch.

#### 2.2.2. Yêu cầu phi chức năng (Non-functional Requirements)
- **Bảo mật:** Mật khẩu được mã hóa Bcrypt, giao tiếp qua HTTPS (nếu deploy).
- **Hiệu năng:** Thời gian phản hồi API dưới 2 giây.
- **Tính khả dụng:** Giao diện dễ sử dụng, hỗ trợ cả máy tính và điện thoại.

### 2.3. Sơ đồ Use Case và Đặc tả chi tiết
*(Chèn sơ đồ Use Case chuyên nghiệp đã vẽ ở đây)*

#### Đặc tả Use Case: Quản lý Chi tiêu (Thêm mới)
| Thành phần | Nội dung mô tả |
| :--- | :--- |
| **Tác nhân chính** | Thành viên (User) |
| **Mô tả** | Người dùng thêm một khoản chi mới vào hệ thống. |
| **Tiền điều kiện** | Người dùng đã đăng nhập thành công. |
| **Luồng sự kiện chính** | 1. Người dùng chọn chức năng "Add Expense". <br> 2. Hệ thống hiển thị form nhập liệu. <br> 3. Người dùng nhập: Số tiền, Danh mục, Ngày tháng. <br> 4. Hệ thống kiểm tra tính hợp lệ và lưu vào Database. <br> 5. Hệ thống cập nhật lại biểu đồ và số dư trên Dashboard. |
| **Hậu điều kiện** | Khoản chi mới được lưu và hiển thị trong danh sách giao dịch. |

---

## CHƯƠNG 3: THIẾT KẾ HỆ THỐNG VÀ CƠ SỞ DỮ LIỆU

### 3.1. Thiết kế Cơ sở dữ liệu (ERD) chi tiết
Hệ thống sử dụng cơ sở dữ liệu MongoDB với các Collection chính:

1.  **Users:** `{ _id, username, email, password, avatar }`
2.  **Incomes:** `{ _id, userId, amount, source, date, icon }`
3.  **Expenses:** `{ _id, userId, amount, category, date, icon }`

### 3.2. Thiết kế Giao diện người dùng
- **Dashboard:** Sử dụng Grid layout để sắp xếp các Widget thống kê và Biểu đồ.
- **Form Input:** Thiết kế tối giản, có thông báo lỗi (Validation) trực tiếp cho người dùng.

---

## KẾT LUẬN
Báo cáo đã trình bày chi tiết các bước từ phân tích nhu cầu đến thiết kế hệ thống quản lý chi tiêu. Với việc phân định rõ các tác nhân và yêu cầu chức năng, hệ thống đã đáp ứng được nhu cầu thực tế của người dùng trong việc quản lý tài chính cá nhân một cách thông minh và tiện lợi.
