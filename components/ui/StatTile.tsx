import React, { memo } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/providers/ThemeProvider';

interface StatTileProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'flat';
  style?: StyleProp<ViewStyle>;
}

const StatTile = memo(function StatTile({ value, label, icon, trend, style }: StatTileProps) {
  const { colors } = useTheme();

  const trendColor =
    trend === 'up' ? colors.success :
    trend === 'down' ? colors.danger :
    colors.textMuted;

  const trendSymbol = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <Card style={[styles.card, style]}>
      {icon && <View style={styles.iconRow}>{icon}</View>}
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      {trend && (
        <View style={[styles.trend, { backgroundColor: trendColor + '22' }]}>
          <Text style={[styles.trendText, { color: trendColor }]}>{trendSymbol}</Text>
        </View>
      )}
    </Card>
  );
});

export { StatTile };

const styles = StyleSheet.create({
  card: { minWidth: 90 },
  iconRow: { marginBottom: 8 },
  value: { fontSize: 28, fontWeight: '700' },
  label: { fontSize: 12, marginTop: 2 },
  trend: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  trendText: { fontSize: 11, fontWeight: '600' },
});
