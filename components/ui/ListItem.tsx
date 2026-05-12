import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Colors } from '@/constants/theme';

interface ListItemProps {
  leadingIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
}

const ListItem = memo(function ListItem({
  leadingIcon,
  title,
  subtitle,
  onPress,
  showChevron = true,
}: ListItemProps) {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      {leadingIcon && <View style={styles.leading}>{leadingIcon}</View>}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.icon }]}>{subtitle}</Text>
        )}
      </View>
      {showChevron && onPress && (
        <Text style={[styles.chevron, { color: colors.icon }]}>›</Text>
      )}
    </TouchableOpacity>
  );
});

export { ListItem };

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  leading: { marginRight: 12 },
  content: { flex: 1 },
  title: { fontSize: 15, fontWeight: '500' },
  subtitle: { fontSize: 13, marginTop: 2 },
  chevron: { fontSize: 22, lineHeight: 22 },
});
