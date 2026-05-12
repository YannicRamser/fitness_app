import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useOptionalTheme } from '@/providers/ThemeProvider';

export function useColorScheme(): 'light' | 'dark' {
  const [hasHydrated, setHasHydrated] = useState(false);
  const theme = useOptionalTheme();
  const rn = useRNColorScheme();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (theme) return theme.effective;
  if (hasHydrated) return rn ?? 'light';
  return 'light';
}
