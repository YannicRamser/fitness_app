import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useTheme } from '@/providers/ThemeProvider';

const GOALS = [
  { emoji: '🏋️', title: 'Bench press 80kg', subtitle: 'Target: May 30', value: 0.62 },
  { emoji: '🏃', title: 'Run 50km this month', subtitle: 'Target: Apr 30', value: 0.4 },
  { emoji: '💧', title: 'Drink 2L water daily', subtitle: 'Target: Ongoing', value: 0.85 },
];

export default function GoalsPage() {
  const { colors } = useTheme();

  return (
    <Screen scroll padded>
      <Text style={[styles.title, { color: colors.text }]}>My goals</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>3 active</Text>

      {GOALS.map((goal, i) => (
        <Card key={i} style={styles.card}>
          <View style={styles.goalHeader}>
            <View style={styles.emojiRow}>
              <Text style={styles.emoji}>{goal.emoji}</Text>
              <View style={styles.ml}>
                <Text style={[styles.goalTitle, { color: colors.text }]}>{goal.title}</Text>
                <Text style={[styles.goalSub, { color: colors.textMuted }]}>{goal.subtitle}</Text>
              </View>
            </View>
            <Text style={[styles.percent, { color: colors.tint }]}>
              {Math.round(goal.value * 100)}%
            </Text>
          </View>
          <ProgressBar value={goal.value} />
        </Card>
      ))}

      <Button title="Add new goal" onPress={() => {}} variant="ghost" fullWidth />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', marginBottom: 2 },
  subtitle: { fontSize: 14, marginBottom: 20 },
  card: { marginBottom: 12 },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  emojiRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  emoji: { fontSize: 24 },
  ml: { marginLeft: 10, flex: 1 },
  goalTitle: { fontSize: 15, fontWeight: '600' },
  goalSub: { fontSize: 12, marginTop: 2 },
  percent: { fontSize: 14, fontWeight: '700', marginLeft: 8 },
});
