import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatTile } from '@/components/ui/StatTile';
import { useTheme } from '@/providers/ThemeProvider';

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const COMPLETED = [true, true, false, true, true, false, false];

export default function HomePage() {
  const { colors } = useTheme();

  return (
    <Screen scroll padded>
      <View style={styles.greetingRow}>
        <Text style={[styles.greetingSmall, { color: colors.textMuted }]}>Good morning,</Text>
        <Text style={[styles.greetingBig, { color: colors.text }]}>Yannick 👋</Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.iconCircle, { backgroundColor: colors.tintMuted }]}>
            <Text style={styles.flame}>🔥</Text>
          </View>
          <View style={styles.ml}>
            <Text style={[styles.streakNum, { color: colors.text }]}>7</Text>
            <Text style={[styles.mutedText, { color: colors.textMuted }]}>Day streak</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Full body · 45 min</Text>
        <Text style={[styles.mutedText, { color: colors.textMuted }]}>6 exercises</Text>
        <View style={styles.mt}>
          <Button title="Start workout" onPress={() => {}} />
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly activity</Text>
        <View style={styles.weekRow}>
          {WEEK_DAYS.map((day, i) => (
            <View key={i} style={styles.dayCol}>
              <View
                style={[
                  styles.dayCircle,
                  { backgroundColor: COMPLETED[i] ? colors.tint : colors.surface },
                ]}
              />
              <Text style={[styles.dayLabel, { color: colors.textMuted }]}>{day}</Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={styles.statsRow}>
        <StatTile value="4" label="Workouts this week" style={styles.statTile} />
        <StatTile value="175" label="Minutes" style={styles.statTile} />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick actions</Text>
      <View style={styles.actionsRow}>
        <Button title="Log weight" onPress={() => {}} variant="ghost" size="sm" />
        <Button title="Add goal" onPress={() => {}} variant="ghost" size="sm" />
        <Button title="History" onPress={() => {}} variant="ghost" size="sm" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  greetingRow: { marginBottom: 20 },
  greetingSmall: { fontSize: 14, marginBottom: 2 },
  greetingBig: { fontSize: 28, fontWeight: '700' },
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flame: { fontSize: 22 },
  ml: { marginLeft: 12 },
  streakNum: { fontSize: 24, fontWeight: '700' },
  mutedText: { fontSize: 13, marginTop: 2 },
  cardTitle: { fontSize: 17, fontWeight: '600' },
  mt: { marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  dayCol: { alignItems: 'center', gap: 4 },
  dayCircle: { width: 28, height: 28, borderRadius: 14 },
  dayLabel: { fontSize: 11 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  statTile: { flex: 1 },
  actionsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
});
