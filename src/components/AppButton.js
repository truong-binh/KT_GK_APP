// Nút bấm dùng chung: có hiệu ứng khi nhấn, trạng thái disabled màu xám (Câu 7)
import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {colors, fonts, spacing} from '../theme/colors';

export default function AppButton({title, onPress, disabled, color, style}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{color: 'rgba(255,255,255,0.3)'}}
      style={({pressed}) => [
        styles.button,
        {backgroundColor: color || colors.primary},
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    backgroundColor: colors.disabledBg,
  },
  text: {
    color: colors.white,
    fontSize: fonts.body,
    fontWeight: '600',
  },
  textDisabled: {
    color: colors.disabled,
  },
});
