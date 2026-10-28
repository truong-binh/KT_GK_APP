// Câu 1 - Một dòng sách dạng thẻ (card): tên, tác giả, thể loại, số cuốn còn lại
import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {colors, fonts, spacing} from '../theme/colors';

export default function BookCard({book, onPress, onLongPress}) {
  const remaining = book.quantity - book.borrowed;
  const outOfStock = remaining === 0;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      android_ripple={{color: colors.primaryLight}}
      style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{book.category}</Text>
        </View>
      </View>
      <View style={styles.right}>
        {outOfStock ? (
          <Text style={styles.outOfStock}>Hết sách</Text>
        ) : (
          <>
            <Text style={styles.remaining}>{remaining}</Text>
            <Text style={styles.remainingLabel}>còn lại</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    // Đổ bóng (Android: elevation, iOS: shadow)
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.85,
  },
  info: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    fontSize: fonts.heading,
    fontWeight: '700',
    color: colors.text,
  },
  author: {
    fontSize: fonts.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: spacing.sm,
  },
  badgeText: {
    fontSize: fonts.small,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  right: {
    alignItems: 'center',
    minWidth: 60,
  },
  remaining: {
    fontSize: fonts.title,
    fontWeight: '700',
    color: colors.success,
  },
  remainingLabel: {
    fontSize: fonts.small,
    color: colors.textSecondary,
  },
  outOfStock: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: fonts.body,
    backgroundColor: colors.dangerLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
