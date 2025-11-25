# Content Warehouse App

Ứng dụng quản lý kho tài nguyên multimedia cho quy trình sản xuất video.

## Tính năng

- 📦 Quản lý projects theo từng giai đoạn
- 🖼️ Upload và lưu trữ hình ảnh, audio, video
- 📝 Quản lý kịch bản và transcript
- ☁️ Đồng bộ tự động lên Google Sheets
- 💾 Mỗi asset được lưu vào cell riêng (tránh giới hạn 50k ký tự)

## Cài đặt

1. Clone repo
2. Chạy server local:
```bash
npx serve .
```
3. Mở trình duyệt: `http://localhost:3000`

## Google Sheets Setup

1. Tạo Google Sheet mới
2. Vào Extensions → Apps Script
3. Copy code từ `apps-script.js` vào
4. Deploy as Web App
5. Copy URL deployment vào `APPS_SCRIPT_URL` trong file HTML

## Cấu trúc dữ liệu

- **Sheet "Projects"**: Thông tin project (không chứa binary data)
- **Sheet "Assets"**: Mỗi ảnh/video/audio một hàng riêng

## Tech Stack

- Vanilla JavaScript
- Tailwind CSS
- Google Apps Script
- Google Sheets API
