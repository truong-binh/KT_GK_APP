// Câu 6 - Lưu trữ dữ liệu bằng AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../constants';
import {SAMPLE_BOOKS} from '../data/sampleBooks';

// Đọc danh sách sách; lần chạy đầu tiên (chưa có dữ liệu) thì khởi tạo sách mẫu
export async function loadBooks() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json !== null) {
      return JSON.parse(json);
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_BOOKS));
    return SAMPLE_BOOKS;
  } catch (e) {
    console.warn('Lỗi đọc dữ liệu:', e);
    return SAMPLE_BOOKS;
  }
}

export async function saveBooks(books) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (e) {
    console.warn('Lỗi lưu dữ liệu:', e);
  }
}
