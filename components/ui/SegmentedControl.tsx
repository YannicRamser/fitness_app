import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

const SegmentedControl = memo(function SegmentedControl({
  value,
  options,
  onChange,
  fullWidth = false,
}: SegmentedControlProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
      ]}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[
              styles.option,
              fullWidth && styles.flex,
              active && [styles.activeOption, { backgroundColor: colors.card }],
            ]}
          >
            {opt.icon && <View style={styles.icon}>{opt.icon}</View>}
            <Text
              style={[
                styles.label,
                { color: active ? colors.text : colors.textMuted },
                active && styles.activeLabel,
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});

export { SegmentedControl };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9,
  },
  flex: { flex: 1 },
  activeOption: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: { marginRight: 6 },
  label: { fontSize: 14, fontWeight: '500' },
  activeLabel: { fontWeight: '700' },
});
