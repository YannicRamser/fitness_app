#!/usr/bin/env bash
# fix-appearance.sh
# ----------------------------------------------------------------------------
# Single Claude Code CLI prompt that makes the Appearance (System/Light/Dark)
# setting actually work end-to-end across fitness_app.
#
# Usage:
#   chmod +x fix-appearance.sh
#   ./fix-appearance.sh
#
# Run from the project root.
# ----------------------------------------------------------------------------

set -euo pipefail

claude -p "Make the Appearance setting (System / Light / Dark) actually drive every color in fitness_app end-to-end. Do the following, in order, and keep all strict TypeScript happy:

1) constants/theme.ts
   - Ensure Colors has both 'light' and 'dark' objects with the full semantic keys: text, textMuted, background, surface, card, border, tint, tintMuted, icon, tabIconDefault, tabIconSelected, buttonBackground, buttonText, success, warning, danger.
   - Brand color is #0bd2ec (tint, buttonBackground, tabIconSelected for both themes).
   - Export types: 'export type ThemeName = \"light\" | \"dark\"' and 'export type ThemePreference = \"system\" | \"light\" | \"dark\"' and 'export type AppColors = typeof Colors.light'. Keep the existing Fonts export.

2) lib/storage.ts
   - Make sure there is a typed helper getItem<T>/setItem<T>/removeItem wrapping @react-native-async-storage/async-storage and export a constant 'THEME_PREFERENCE_KEY = \"theme-preference\"'.

3) providers/ThemeProvider.tsx (rewrite)
   - Default export ThemeProvider({ children }): JSX.Element.
   - Named export 'useTheme()' returning { preference: ThemePreference; effective: ThemeName; setPreference(p: ThemePreference): void; colors: AppColors; isReady: boolean }.
   - Internally:
     * Use useState<ThemePreference>('system') for preference.
     * Use useState<ColorSchemeName>(() => Appearance.getColorScheme()) for systemScheme, subscribed via Appearance.addChangeListener; remember to remove() on unmount.
     * On mount, read THEME_PREFERENCE_KEY from storage and setPreference if present. Track an isReady flag so the first render before storage hydrates does not flip the theme.
     * effective = preference === 'system' ? (systemScheme ?? 'light') : preference.
     * setPreference writes to storage (fire-and-forget, but catch errors) before updating state.
     * useMemo the context value so it only changes when preference / effective / isReady change. colors = Colors[effective].
   - If useTheme is called outside a provider, throw a clear Error.

4) hooks/use-color-scheme.ts AND hooks/use-color-scheme.web.ts
   - Export default useColorScheme(): 'light' | 'dark'.
   - Try to call useTheme() inside a try/catch by using the context directly (import the context object or use a separate 'useOptionalTheme' helper). If no provider is mounted, fall back to react-native's Appearance.useColorScheme() ?? 'light'.
   - Do NOT throw in this hook.

5) app/_layout.tsx
   - Order providers outermost-to-innermost: ThemeProvider > QueryProvider > AuthProvider > (existing ThemeProvider from @react-navigation/native).
   - Add a small internal component 'NavThemeBridge({ children })' that calls useTheme() and passes value={effective === 'dark' ? DarkTheme : DefaultTheme} to @react-navigation/native's ThemeProvider — so native navigator colors follow the preference too.
   - Replace <StatusBar style=\"auto\" /> with a 'ThemedStatusBar' component that calls useTheme() and sets style={effective === 'dark' ? 'light' : 'dark'}.
   - Keep 'unstable_settings' and both Stack.Screen entries.

6) providers/ThemeProvider.tsx export
   - Also export the React Context object as 'ThemeContext' so the color-scheme hook can read it defensively via React.useContext without throwing.

7) app/settings/appearance.tsx
   - Must use useTheme() to drive everything (no Colors imports).
   - SegmentedControl value = preference, onChange = setPreference. Options:
       { label: 'System', value: 'system', icon: <Ionicons name='phone-portrait-outline' /> },
       { label: 'Light',  value: 'light',  icon: <Ionicons name='sunny-outline' /> },
       { label: 'Dark',   value: 'dark',   icon: <Ionicons name='moon-outline' /> }
   - Below the control render a Card titled 'Preview' containing six small swatch rows (background, surface, card, tint, success, danger) — each row is a 36x36 rounded square of that color + label + hex value. All colors come from useTheme().colors so the swatches live-update when the user taps a segment.
   - Add light haptic feedback (expo-haptics) on preference change.

8) components/ui/*
   - Audit Screen.tsx, Button.tsx, Card.tsx, ProgressBar.tsx, SegmentedControl.tsx, StatTile.tsx, ListItem.tsx and replace any 'Colors[colorScheme]' / hardcoded hex usage with useTheme().colors.
   - They must re-render when the theme changes (no stale closures — read colors inside the component body, not in module scope).

9) app/(tabs)/_layout.tsx
   - Read tab bar colors from useTheme() (tabBarActiveTintColor = colors.tint, inactive = colors.textMuted, tabBarStyle.backgroundColor = colors.card, borderTopColor = colors.border). Do NOT use the old useColorScheme + Colors[scheme] pattern.

10) Audit the tab screens (app/(tabs)/index.tsx, myWorkouts/index.tsx, myGoals/index.tsx, myProfile/index.tsx)
    - Replace every hardcoded color (#007AFF, 'white', '#666', etc.) with semantic useTheme() values: buttons use colors.tint / colors.buttonText, muted text uses colors.textMuted, card bg uses colors.card, screen bg is handled by <Screen>.

11) Finally, run 'npx tsc --noEmit' and list any remaining type errors without attempting to auto-fix them. Also run a quick grep for hardcoded hex colors under app/ and components/ui/ and list any leftover occurrences (so I can review).

Constraints:
- Do not add new dependencies beyond what's already installed (@react-native-async-storage/async-storage, expo-haptics, @expo/vector-icons, react-native-reanimated).
- Keep existing @/* path aliases.
- Don't reformat unrelated files."

echo
echo "Done. Reload the Metro cache (npx expo start -c) and toggle Settings → Appearance to verify live theme switching."
