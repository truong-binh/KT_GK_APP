// Câu 2 - Form thêm / sửa sách (dùng chung một form)
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {useBooks} from '../context/BooksContext';
import FormField from '../components/FormField';
import AppButton from '../components/AppButton';
import {colors, fonts, spacing} from '../theme/colors';
import {CATEGORIES, MIN_YEAR, CURRENT_YEAR} from '../constants';

export default function BookFormScreen({navigation, route}) {
  const {books, addBook, updateBook} = useBooks();

  // Khi sửa: tìm sách theo id và điền sẵn dữ liệu cũ
  const editingId = route.params?.id;
  const editingBook = books.find(b => b.id === editingId);

  const [title, setTitle] = useState(editingBook ? editingBook.title : '');
  const [author, setAuthor] = useState(editingBook ? editingBook.author : '');
  const [category, setCategory] = useState(
    editingBook ? editingBook.category : CATEGORIES[0],
  );
  const [year, setYear] = useState(
    editingBook ? String(editingBook.year) : '',
  );
  const [quantity, setQuantity] = useState(
    editingBook ? String(editingBook.quantity) : '',
  );
  const [errors, setErrors] = useState({});

  // Kiểm tra dữ liệu, trả về object lỗi theo từng ô nhập
  const validate = () => {
    const errs = {};

    if (!title.trim()) {
      errs.title = 'Tên sách không được để trống';
    }
    if (!author.trim()) {
      errs.author = 'Tác giả không được để trống';
    }

    const yearNum = Number(year);
    if (year.trim() === '' || !Number.isInteger(yearNum)) {
      errs.year = 'Năm xuất bản phải là số nguyên';
    } else if (yearNum < MIN_YEAR || yearNum > CURRENT_YEAR) {
      errs.year = `Năm xuất bản phải từ ${MIN_YEAR} đến ${CURRENT_YEAR}`;
    }

    const quantityNum = Number(quantity);
    if (quantity.trim() === '' || !Number.isInteger(quantityNum)) {
      errs.quantity = 'Số lượng phải là số nguyên';
    } else if (quantityNum <= 0) {
      errs.quantity = 'Số lượng phải lớn hơn 0';
    } else if (editingBook && quantityNum < editingBook.borrowed) {
      // Khi sửa: số lượng không được nhỏ hơn số cuốn đang mượn
      errs.quantity = `Số lượng không được nhỏ hơn số cuốn đang mượn (${editingBook.borrowed})`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }
    const data = {
      title: title.trim(),
      author: author.trim(),
      category,
      year: Number(year),
      quantity: Number(quantity),
    };
    if (editingBook) {
      updateBook(editingBook.id, data);
    } else {
      addBook(data);
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <FormField
          label="Tên sách *"
          value={title}
          onChangeText={setTitle}
          error={errors.title}
          placeholder="Nhập tên sách"
        />
        <FormField
          label="Tác giả *"
          value={author}
          onChangeText={setAuthor}
          error={errors.author}
          placeholder="Nhập tên tác giả"
        />

        {/* Chọn thể loại */}
        <Text style={styles.label}>Thể loại</Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map(cat => {
            const active = category === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setCategory(cat)}
                style={({pressed}) => [
                  styles.chip,
                  active && styles.chipActive,
                  pressed && styles.pressedChip,
                ]}>
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <FormField
          label="Năm xuất bản *"
          value={year}
          onChangeText={setYear}
          error={errors.year}
          keyboardType="numeric"
          placeholder={`${MIN_YEAR} - ${CURRENT_YEAR}`}
        />
        <FormField
          label="Tổng số cuốn *"
          value={quantity}
          onChangeText={setQuantity}
          error={errors.quantity}
          keyboardType="numeric"
          placeholder="Lớn hơn 0"
        />

        <AppButton
          title={editingBook ? 'Lưu thay đổi' : 'Thêm sách'}
          onPress={handleSave}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  label: {
    fontSize: fonts.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressedChip: {
    opacity: 0.8,
  },
  chipText: {
    fontSize: fonts.small,
    color: colors.text,
    fontWeight: '500',
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
});
