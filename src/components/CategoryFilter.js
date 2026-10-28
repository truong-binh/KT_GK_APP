// Câu 5 - Hàng nút lọc theo thể loại, nút đang chọn được làm nổi bật
import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {colors, fonts, spacing} from '../theme/colors';
import {CATEGORIES} from '../constants';

const ALL = 'Tất cả';

export default function CategoryFilter({selected, onSelect}) {
  const options = [ALL, ...CATEGORIES];

  return (
    <View style={styles.row}>
      {options.map(cat => {
        const active = selected === cat;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelect(cat)}
            style={({pressed}) => [
              styles.chip,
              active && styles.chipActive,
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {cat}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // xuống dòng khi hết chỗ, không bị cắt chip
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
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
  pressed: {
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
