import React, { memo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const SIZE_MAP = {
  sm: { height: 36, fontSize: 14 },
  md: { height: 44, fontSize: 16 },
  lg: { height: 52, fontSize: 17 },
} as const;

const Button = memo(function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  iconLeft,
  fullWidth = false,
  style,
}: ButtonProps) {
  const { colors } = useTheme();
  const { height, fontSize } = SIZE_MAP[size];

  const bgColor =
    variant === 'primary' ? colors.buttonBackground :
    variant === 'secondary' ? colors.surface :
    'transparent';

  const fgColor =
    variant === 'primary' ? colors.buttonText :
    variant === 'ghost' ? colors.tint :
    colors.text;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: bgColor,
          height,
          borderRadius: 14,
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: colors.border,
          opacity: pressed || disabled || loading ? 0.7 : 1,
          alignSelf: fullWidth ? 'stretch' : 'auto',
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={fgColor} />
      ) : (
        <View style={styles.inner}>
          {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
          <Text style={[styles.label, { color: fgColor, fontSize }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
});

export { Button };

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: { flexDirection: 'row', alignItems: 'center' },
  iconLeft: { marginRight: 8 },
  label: { fontWeight: '600' },
});
