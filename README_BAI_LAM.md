# Ứng dụng Quản lý Thư viện — Đề số 1

Bài kiểm tra môn Lập trình di động – React Native (React Native CLI, không dùng Expo).

## Chạy ứng dụng

```bash
npm install
npx react-native run-android
```

## Thư viện sử dụng (đúng danh sách cho phép)

- `@react-navigation/native`, `@react-navigation/native-stack`
- `react-native-screens`, `react-native-safe-area-context`
- `@react-native-async-storage/async-storage`

## Cấu trúc thư mục

```
src/
  constants.js            # Thể loại, key AsyncStorage, giới hạn năm
  theme/colors.js         # Bảng màu + cỡ chữ + khoảng cách dùng chung (Câu 7)
  data/sampleBooks.js     # 5 sách mẫu khởi tạo lần chạy đầu
  storage/bookStorage.js  # Đọc/ghi AsyncStorage (Câu 6)
  context/BooksContext.js # State trung tâm + nghiệp vụ thêm/sửa/xoá/mượn/trả
  components/
    AppButton.js          # Nút chung: hiệu ứng nhấn, disabled màu xám
    BookCard.js           # Thẻ sách: bo góc, đổ bóng, nhãn "Hết sách" đỏ
    CategoryFilter.js     # Hàng nút lọc thể loại
    FormField.js          # Ô nhập có nhãn + lỗi dưới ô, viền đỏ khi sai
  screens/
    BookListScreen.js     # Câu 1, 3, 5: danh sách, xoá (long press), tìm kiếm + lọc
    BookFormScreen.js     # Câu 2: thêm/sửa chung một form, validate
    BookDetailScreen.js   # Câu 4: chi tiết + Cho mượn / Nhận trả
App.tsx                   # Navigation stack 3 màn hình
```

## Đáp ứng yêu cầu

| Câu | Nội dung | Vị trí |
|-----|----------|--------|
| 1 | FlatList, số còn lại, nhãn "Hết sách" đỏ, thống kê tổng | `BookListScreen`, `BookCard` |
| 2 | Form thêm/sửa chung, điền sẵn khi sửa, validate + lỗi dưới ô | `BookFormScreen`, `FormField` |
| 3 | onLongPress xoá + Alert xác nhận, chặn xoá khi borrowed > 0 | `BookListScreen` |
| 4 | Chi tiết, Cho mượn / Nhận trả, nút disabled màu xám | `BookDetailScreen` |
| 5 | Tìm theo tên/tác giả (không phân biệt hoa thường) + lọc thể loại đồng thời | `BookListScreen`, `CategoryFilter` |
| 6 | AsyncStorage, khởi tạo 5 sách mẫu lần đầu | `bookStorage.js` |
| 7 | Theme chung, card bo góc đổ bóng, hiệu ứng nhấn, empty state, viền đỏ, KeyboardAvoidingView, bàn phím numeric, SafeArea | toàn bộ `src/` |
