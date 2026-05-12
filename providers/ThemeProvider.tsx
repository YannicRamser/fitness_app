import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';
import { Colors, type ThemeName } from '@/constants/theme';
import { getItem, setItem } from '@/lib/storage';

type Preference = 'system' | 'light' | 'dark';

interface ThemeContextValue {
  preference: Preference;
  effective: ThemeName;
  setPreference: (p: Preference) => void;
  colors: typeof Colors['light'];
}

const PREF_KEY = 'theme-preference';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function useOptionalTheme(): ThemeContextValue | null {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<Preference>('system');
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    getItem<Preference>(PREF_KEY).then((saved) => {
      if (saved) setPreferenceState(saved);
    });

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    return () => sub.remove();
  }, []);

  const setPreference = useCallback((p: Preference) => {
    setPreferenceState(p);
    setItem(PREF_KEY, p);
  }, []);

  const effective: ThemeName =
    preference === 'system' ? ((systemScheme ?? 'light') as ThemeName) : preference;

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, effective, setPreference, colors: Colors[effective] }),
    [preference, effective, setPreference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
