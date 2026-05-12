import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import QueryProvider from '@/providers/QueryProvider';
import AuthProvider from '@/providers/AuthProvider';
import ThemeProvider, { useTheme } from '@/providers/ThemeProvider';

export const unstable_settings = {
  anchor: '(tabs)',
};

function NavigationThemeWrapper({ children }: { children: React.ReactNode }) {
  const { effective } = useTheme();
  return (
    <NavThemeProvider value={effective === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </NavThemeProvider>
  );
}

function ThemedStatusBar() {
  const { effective } = useTheme();
  return <StatusBar style={effective === 'dark' ? 'light' : 'dark'} />;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <NavigationThemeWrapper>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
            </Stack>
            <ThemedStatusBar />
          </NavigationThemeWrapper>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
