// State trung tâm của ứng dụng: danh sách sách + các nghiệp vụ
import React, {createContext, useContext, useEffect, useState} from 'react';
import {loadBooks, saveBooks} from '../storage/bookStorage';

const BooksContext = createContext(null);

export function BooksProvider({children}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lần chạy đầu tiên: đọc dữ liệu từ AsyncStorage (có khởi tạo sách mẫu)
  useEffect(() => {
    loadBooks().then(data => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  // Mọi thay đổi đều được lưu lại ngay
  const updateBooks = next => {
    setBooks(next);
    saveBooks(next);
  };

  const addBook = book => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
      borrowed: 0,
    };
    updateBooks([...books, newBook]);
  };

  const updateBook = (id, data) => {
    updateBooks(books.map(b => (b.id === id ? {...b, ...data} : b)));
  };

  const deleteBook = id => {
    updateBooks(books.filter(b => b.id !== id));
  };

  // Cho mượn: tăng borrowed thêm 1 (chỉ khi còn sách)
  const borrowBook = id => {
    updateBooks(
      books.map(b =>
        b.id === id && b.borrowed < b.quantity
          ? {...b, borrowed: b.borrowed + 1}
          : b,
      ),
    );
  };

  // Nhận trả: giảm borrowed đi 1 (chỉ khi đang có người mượn)
  const returnBook = id => {
    updateBooks(
      books.map(b =>
        b.id === id && b.borrowed > 0 ? {...b, borrowed: b.borrowed - 1} : b,
      ),
    );
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        addBook,
        updateBook,
        deleteBook,
        borrowBook,
        returnBook,
      }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}
