import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Stack } from 'expo-router';
import Screen from '@/components/ui/Screen';
import { useTheme } from '@/providers/ThemeProvider';

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <Screen scroll padded>
      <Stack.Screen options={{ title: 'About' }} />
      <Text style={[styles.title, { color: colors.text }]}>About</Text>
      <Text style={[styles.body, { color: colors.textMuted }]}>
        Fitness App v1.0.0. Built with Expo and React Native. This app helps you track workouts,
        set fitness goals, and monitor your progress over time.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  body: { fontSize: 15, lineHeight: 22 },
});
