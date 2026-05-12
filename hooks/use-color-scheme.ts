import { useColorScheme as useRNColorScheme } from 'react-native';
import { useOptionalTheme } from '@/providers/ThemeProvider';

export function useColorScheme(): 'light' | 'dark' {
  const theme = useOptionalTheme();
  const rn = useRNColorScheme();
  return theme ? theme.effective : (rn ?? 'light');
}
