import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Stack } from 'expo-router';
import Screen from '@/components/ui/Screen';
import { useTheme } from '@/providers/ThemeProvider';

export default function NotificationsScreen() {
  const { colors } = useTheme();

  return (
    <Screen scroll padded>
      <Stack.Screen options={{ title: 'Notifications' }} />
      <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
      <Text style={[styles.body, { color: colors.textMuted }]}>
        Notification preferences will be available here. You'll be able to configure workout
        reminders, goal check-ins, and weekly summaries.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  body: { fontSize: 15, lineHeight: 22 },
});
