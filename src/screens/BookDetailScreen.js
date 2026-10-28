// Câu 4 - Chi tiết sách và nghiệp vụ Cho mượn / Nhận trả
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useBooks} from '../context/BooksContext';
import AppButton from '../components/AppButton';
import {colors, fonts, spacing} from '../theme/colors';

function InfoRow({label, value, valueColor}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, valueColor && {color: valueColor}]}>
        {value}
      </Text>
    </View>
  );
}

export default function BookDetailScreen({navigation, route}) {
  const {books, borrowBook, returnBook} = useBooks();
  const book = books.find(b => b.id === route.params.id);

  // Sách vừa bị xoá trong khi màn hình còn mở
  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Không tìm thấy sách</Text>
      </View>
    );
  }

  const remaining = book.quantity - book.borrowed;
  const canBorrow = remaining > 0; // hết sách thì không cho mượn
  const canReturn = book.borrowed > 0; // borrowed = 0 thì không nhận trả

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>

        <View style={styles.divider} />

        <InfoRow label="Thể loại" value={book.category} />
        <InfoRow label="Năm xuất bản" value={String(book.year)} />
        <InfoRow label="Tổng số cuốn" value={String(book.quantity)} />
        <InfoRow
          label="Đang được mượn"
          value={String(book.borrowed)}
          valueColor={colors.warning}
        />
        <InfoRow
          label="Còn lại"
          value={remaining === 0 ? 'Hết sách' : String(remaining)}
          valueColor={remaining === 0 ? colors.danger : colors.success}
        />
      </View>

      {/* Nghiệp vụ mượn / trả */}
      <View style={styles.actions}>
        <AppButton
          title="Cho mượn"
          onPress={() => borrowBook(book.id)}
          disabled={!canBorrow}
          style={styles.actionButton}
        />
        <AppButton
          title="Nhận trả"
          onPress={() => returnBook(book.id)}
          disabled={!canReturn}
          color={colors.success}
          style={styles.actionButton}
        />
      </View>

      <AppButton
        title="Sửa thông tin sách"
        onPress={() => navigation.navigate('BookForm', {id: book.id})}
        color={colors.warning}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  notFound: {
    fontSize: fonts.heading,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: fonts.title,
    fontWeight: '700',
    color: colors.text,
  },
  author: {
    fontSize: fonts.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  rowLabel: {
    fontSize: fonts.body,
    color: colors.textSecondary,
  },
  rowValue: {
    fontSize: fonts.body,
    fontWeight: '600',
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
