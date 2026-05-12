import { Stack } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

export default function SettingsLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.tint,
        headerTitleStyle: { color: colors.text, fontWeight: '600' },
        headerShadowVisible: false,
      }}
    />
  );
}
