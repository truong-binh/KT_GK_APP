// Ô nhập liệu có nhãn và thông báo lỗi ngay bên dưới (Câu 2, Câu 7)
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {colors, fonts, spacing} from '../theme/colors';

export default function FormField({
  label,
  value,
  onChangeText,
  error,
  keyboardType,
  placeholder,
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || 'default'}
        placeholder={placeholder}
        placeholderTextColor={colors.disabled}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fonts.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fonts.body,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger, // ô nhập sai có viền đỏ
  },
  errorText: {
    color: colors.danger,
    fontSize: fonts.small,
    marginTop: spacing.xs,
  },
});
