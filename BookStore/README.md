# 📚 Ứng dụng Web BOOKSTORE

Chào mừng đến với ứng dụng web **BOOKSTORE**! Đây là một ứng dụng web đáp ứng hoàn toàn, hấp dẫn về mặt trực quan được xây dựng bằng công nghệ MERN stack (Neo4j, Express.js, React, Node.js) với Vite và được tạo kiểu bằng Tailwind CSS.

Tôi đã xây dựng ứng dụng web này với công nghệ MERN stack (Neo4j, Express, React, Node.js), Vite và Tailwind CSS. Ứng dụng bao gồm bảng điều khiển admin để xuất bản, chỉnh sửa và xóa sách, cũng như chức năng người dùng để duyệt và đọc sách. Tích hợp chế độ tối/sáng, đăng ký và đăng nhập an toàn, cùng với các tuyến đường được bảo vệ để nâng cao trải nghiệm người dùng và bảo mật. Dự án này thể hiện kỹ năng của tôi trong phát triển full-stack, thiết kế đáp ứng và xây dựng các ứng dụng an toàn, hiệu suất cao.

## 🌟 Tính năng

- Được xây dựng với **Vite** để có bản dựng nhanh chóng, hiệu quả.
- Front-end **React** với **Tailwind CSS** cho giao diện người dùng hiện đại, đáp ứng.
- **Node.js** và **Express** để xử lý phía máy chủ.
- Cơ sở dữ liệu đồ thị **Neo4j** để quản lý dữ liệu linh hoạt và hiệu quả.
- Thiết kế hoàn toàn **đáp ứng**, được tối ưu hóa cho mọi kích thước màn hình.
- Thân thiện với người dùng và hấp dẫn về mặt trực quan.

## 🚀 Bắt đầu

Hãy làm theo các bước sau để chạy ứng dụng trên máy của bạn.

### Điều kiện tiên quyết

Đảm bảo bạn đã cài đặt những thứ sau:

- Node.js
- Cơ sở dữ liệu Neo4j
- Git

### Hướng dẫn cài đặt

1. **Sao chép mã nguồn:**
   ```bash
   git clone https://github.com/nhawngkun/BTlon-udpt-.git
   cd BTlon-udpt-/BookStore
   ```
2. **Cài đặt Frontend:**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```
3. **Cài đặt Backend:**
   ```bash
   cd ../Backend
   npm install
   npm run dev
   ```
   
   Nếu bạn đang sử dụng nodemon cho phát triển:
   ```bash
   npx nodemon index.js
   ```
   
4. **Thiết lập biến môi trường:**
   Tạo một file `.env` trong thư mục backend và thiết lập các biến môi trường sau:
   ```bash
   NEO4J_URI=bolt://localhost:7690
   NEO4J_USERNAME=neo4j
   NEO4J_PASSWORD=thang044
   PORT=5000
   ```

Khi cả hai máy chủ đều đang chạy, bạn có thể xem ứng dụng trong trình duyệt của mình tại http://localhost:5173 (hoặc cổng được chỉ định trong Vite).  
**Backend production:** https://bs-noqz.onrender.com  
**Backend local:** http://localhost:5000 (hoặc cổng tùy chỉnh của bạn)

## 🛠 Được xây dựng bằng
- Vite
- React
- Tailwind CSS
- Node.js
- Express.js
- Neo4j



