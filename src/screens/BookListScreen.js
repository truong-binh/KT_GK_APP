// Câu 1 - Danh sách sách; Câu 3 - Xoá (onLongPress); Câu 5 - Tìm kiếm và lọc
import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useBooks} from '../context/BooksContext';
import BookCard from '../components/BookCard';
import CategoryFilter from '../components/CategoryFilter';
import AppButton from '../components/AppButton';
import {colors, fonts, spacing} from '../theme/colors';

export default function BookListScreen({navigation}) {
  const {books, loading, deleteBook} = useBooks();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');

  // Câu 5: tìm kiếm (không phân biệt hoa/thường) và lọc hoạt động đồng thời
  const filteredBooks = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return books.filter(b => {
      const matchSearch =
        keyword === '' ||
        b.title.toLowerCase().includes(keyword) ||
        b.author.toLowerCase().includes(keyword);
      const matchCategory = category === 'Tất cả' || b.category === category;
      return matchSearch && matchCategory;
    });
  }, [books, search, category]);

  // Câu 1: tổng số đầu sách và tổng số cuốn đang được mượn
  const totalTitles = books.length;
  const totalBorrowed = books.reduce((sum, b) => sum + b.borrowed, 0);

  // Câu 3: nhấn giữ để xoá, hỏi xác nhận; không xoá sách đang có người mượn
  const handleLongPress = book => {
    if (book.borrowed > 0) {
      Alert.alert(
        'Không thể xoá',
        `Sách "${book.title}" đang có ${book.borrowed} cuốn được mượn.`,
      );
      return;
    }
    Alert.alert('Xác nhận xoá', `Bạn có chắc muốn xoá "${book.title}"?`, [
      {text: 'Huỷ', style: 'cancel'},
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => deleteBook(book.id),
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Thống kê */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalTitles}</Text>
          <Text style={styles.statLabel}>Đầu sách</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, {color: colors.warning}]}>
            {totalBorrowed}
          </Text>
          <Text style={styles.statLabel}>Đang mượn</Text>
        </View>
      </View>

      {/* Câu 5: ô tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm theo tên sách hoặc tác giả..."
        placeholderTextColor={colors.disabled}
        value={search}
        onChangeText={setSearch}
      />

      {/* Câu 5: lọc theo thể loại */}
      <CategoryFilter selected={category} onSelect={setCategory} />

      {/* Câu 1: danh sách bằng FlatList */}
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetail', {id: item.id})}
            onLongPress={() => handleLongPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Không có sách nào</Text>
            <Text style={styles.emptyText}>
              Thử đổi từ khoá tìm kiếm hoặc thêm sách mới.
            </Text>
          </View>
        }
      />

      {/* Câu 2: nút thêm sách */}
      <View style={styles.footer}>
        <AppButton
          title="+ Thêm sách"
          onPress={() => navigation.navigate('BookForm')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  statNumber: {
    fontSize: fonts.title,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: fonts.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  searchInput: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    fontSize: fonts.body,
    color: colors.text,
  },
  listContent: {
    paddingBottom: spacing.md,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: fonts.heading,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  emptyText: {
    fontSize: fonts.body,
    color: colors.disabled,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
});
