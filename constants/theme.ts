import { Platform } from 'react-native';

export type ThemeName = 'light' | 'dark';

export const Colors = {
  light: {
    text: '#11181c',
    textMuted: '#687076',
    background: '#ffffff',
    surface: '#f5f7fa',
    card: '#ffffff',
    border: '#e4e7eb',
    tint: '#0bd2ec',
    tintMuted: '#cbf4fb',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0bd2ec',
    buttonBackground: '#0bd2ec',
    buttonText: '#ffffff',
    success: '#16a34a',
    warning: '#f59e0b',
    danger: '#dc2626',
  },
  dark: {
    text: '#ecedee',
    textMuted: '#9ba1a6',
    background: '#0b0f14',
    surface: '#141a22',
    card: '#1a222c',
    border: '#1f2a36',
    tint: '#0bd2ec',
    tintMuted: '#0b4a55',
    icon: '#9ba1a6',
    tabIconDefault: '#9ba1a6',
    tabIconSelected: '#0bd2ec',
    buttonBackground: '#0bd2ec',
    buttonText: '#0b0f14',
    success: '#4ade80',
    warning: '#fbbf24',
    danger: '#f87171',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
