import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Screen from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useTheme } from '@/providers/ThemeProvider';

type Preference = 'system' | 'light' | 'dark';

const THEME_OPTIONS = [
  {
    label: 'System',
    value: 'system',
    icon: <Ionicons name="phone-portrait-outline" size={14} color="#999" />,
  },
  {
    label: 'Light',
    value: 'light',
    icon: <Ionicons name="sunny-outline" size={14} color="#999" />,
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: <Ionicons name="moon-outline" size={14} color="#999" />,
  },
];

const SWATCHES = [
  { label: 'Background', key: 'background' },
  { label: 'Surface', key: 'surface' },
  { label: 'Card', key: 'card' },
  { label: 'Tint', key: 'tint' },
  { label: 'Text', key: 'text' },
  { label: 'Success', key: 'success' },
  { label: 'Warning', key: 'warning' },
  { label: 'Danger', key: 'danger' },
] as const;

export default function AppearanceScreen() {
  const { colors, preference, setPreference } = useTheme();

  return (
    <Screen scroll padded>
      <Stack.Screen options={{ title: 'Appearance' }} />

      <Text style={[styles.heading, { color: colors.text }]}>Theme</Text>
      <Text style={[styles.sub, { color: colors.textMuted }]}>
        Choose how the app looks on your device.
      </Text>

      <SegmentedControl
        fullWidth
        value={preference}
        options={THEME_OPTIONS}
        onChange={(v) => setPreference(v as Preference)}
      />

      <Text style={[styles.previewLabel, { color: colors.textMuted }]}>Preview</Text>
      <Card>
        <View style={styles.swatchGrid}>
          {SWATCHES.map(({ label, key }) => (
            <View key={key} style={styles.swatch}>
              <View style={[styles.swatchColor, { backgroundColor: colors[key] }]} />
              <Text style={[styles.swatchLabel, { color: colors.textMuted }]}>{label}</Text>
            </View>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  sub: { fontSize: 14, marginBottom: 20 },
  previewLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 24,
    marginBottom: 10,
  },
  swatchGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  swatch: { alignItems: 'center', width: 64 },
  swatchColor: { width: 44, height: 44, borderRadius: 12, marginBottom: 4 },
  swatchLabel: { fontSize: 10, textAlign: 'center' },
});
