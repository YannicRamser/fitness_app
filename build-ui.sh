#!/usr/bin/env bash
# build-ui.sh
# ----------------------------------------------------------------------------
# Prompts for Claude Code CLI that build a basic-but-cool UI for fitness_app
# and add a full light/dark theme system with a user-selectable preference.
#
# Usage:
#   chmod +x build-ui.sh
#   ./build-ui.sh
#
# Run from project root. Each `claude -p` call is independent — reorder or
# comment out freely. This script assumes scaffold-structure.sh has already
# been run (so api/, providers/, lib/, components/ui/, features/ all exist).
# ----------------------------------------------------------------------------

set -euo pipefail

# ═══════════════════════════════════════════════════════════════════════════
# PART A — THEME SYSTEM
# ═══════════════════════════════════════════════════════════════════════════

# --- A1. Expanded color palette ---------------------------------------------
echo "[A1] Expand constants/theme.ts with a full semantic palette"
claude -p "Rewrite constants/theme.ts so the Colors export has richer semantic keys for both light and dark. Keys per theme: text, textMuted, background, surface, card, border, tint (brand), tintMuted, icon, tabIconDefault, tabIconSelected, buttonBackground, buttonText, success, warning, danger. Use brand color #0bd2ec as tint/buttonBackground/tabIconSelected. For light: background #ffffff, surface #f5f7fa, card #ffffff, border #e4e7eb, text #11181c, textMuted #687076, icon #687076, tintMuted #cbf4fb, buttonText #ffffff, success #16a34a, warning #f59e0b, danger #dc2626. For dark: background #0b0f14, surface #141a22, card #1a222c, border #1f2a36, text #ecedee, textMuted #9ba1a6, icon #9ba1a6, tintMuted #0b4a55, buttonText #0b0f14, success #4ade80, warning #fbbf24, danger #f87171. Keep the existing Fonts export unchanged. Export a TypeScript type 'ThemeName = \"light\" | \"dark\"'."

# --- A2. ThemeProvider (preference stored in AsyncStorage) ------------------
echo "[A2] providers/ThemeProvider.tsx — preference-aware theme context"
claude -p "Create providers/ThemeProvider.tsx exporting default ThemeProvider and a useTheme() hook. Context shape: { preference: 'system'|'light'|'dark'; effective: 'light'|'dark'; setPreference(p): void; colors: typeof Colors['light']; }. Read the system scheme with Appearance.getColorScheme() + Appearance.addChangeListener. Persist preference via storage helpers from '@/lib/storage' under key 'theme-preference' (default 'system'). Compute 'effective' = preference === 'system' ? systemScheme ?? 'light' : preference. Expose 'colors = Colors[effective]'. Use useMemo for the value so it only changes when effective/preference change. Types from '@/constants/theme'."

# --- A3. Override use-color-scheme to consume our context --------------------
echo "[A3] hooks/use-color-scheme.ts — prefer context over RN Appearance"
claude -p "Rewrite hooks/use-color-scheme.ts to: try to read the effective theme from '@/providers/ThemeProvider' via useTheme(); if no provider is mounted (hook throws), fall back to react-native's useColorScheme. Also rewrite hooks/use-color-scheme.web.ts to do the same. Keep the default export as a function returning 'light' | 'dark'."

# --- A4. Wire ThemeProvider into the root layout -----------------------------
echo "[A4] Wrap app/_layout.tsx with ThemeProvider"
claude -p "In app/_layout.tsx, wrap the existing tree with <ThemeProvider> (imported from '@/providers/ThemeProvider') as the outermost app provider, outside QueryProvider and AuthProvider. Use useTheme() inside a small inner component to pick DarkTheme/DefaultTheme for react-navigation's ThemeProvider so native nav colors follow the preference. Keep 'unstable_settings' and StatusBar. StatusBar style should be 'auto'."

# ═══════════════════════════════════════════════════════════════════════════
# PART B — REUSABLE UI KIT UPGRADES
# ═══════════════════════════════════════════════════════════════════════════

# --- B1. Upgraded Screen primitive ------------------------------------------
echo "[B1] components/ui/Screen.tsx — themed safe-area container"
claude -p "Rewrite components/ui/Screen.tsx to use useTheme() for background color, SafeAreaView from react-native-safe-area-context, support props { children, scroll?: boolean, padded?: boolean (default true), header?: ReactNode }. Padded adds 20 horizontal + 16 vertical padding. If scroll, wrap content in ScrollView with showsVerticalScrollIndicator={false}. Header renders above the content."

# --- B2. Upgraded Button with variants --------------------------------------
echo "[B2] components/ui/Button.tsx — brand-aware button"
claude -p "Rewrite components/ui/Button.tsx as a React.memo component. Props { title, onPress, variant?: 'primary'|'secondary'|'ghost', size?: 'sm'|'md'|'lg' (default md), disabled?, loading?, iconLeft?: ReactNode, fullWidth?: boolean }. Use useTheme() colors. Primary = tint bg + buttonText fg. Secondary = surface bg + text fg + border. Ghost = transparent bg + tint fg. Sizes map to heights 36/44/52 and font 14/16/17. Show ActivityIndicator when loading and disable press. Use Pressable with opacity pressed style. Border radius 14."

# --- B3. Card with shadow ---------------------------------------------------
echo "[B3] components/ui/Card.tsx — rounded surface"
claude -p "Rewrite components/ui/Card.tsx as React.memo. Props { children, style?, onPress?, padding?: number (default 16) }. Use useTheme() colors.card + colors.border (1px). Border radius 20, shadow on iOS (opacity 0.06, radius 12, y 4) and elevation 2 on Android. If onPress provided, render as Pressable with pressed opacity 0.9."

# --- B4. ProgressBar ---------------------------------------------------------
echo "[B4] components/ui/ProgressBar.tsx — animated progress bar"
claude -p "Create components/ui/ProgressBar.tsx using react-native-reanimated. Props { value: number (0-1), height?: number (default 8), color?: string, trackColor?: string }. Animate width via useSharedValue + withTiming (300ms). Border radius height/2. Use useTheme() colors for defaults (color = tint, trackColor = surface). React.memo the component."

# --- B5. SegmentedControl ----------------------------------------------------
echo "[B5] components/ui/SegmentedControl.tsx — three-way picker for settings"
claude -p "Create components/ui/SegmentedControl.tsx. Props { value: string, options: { label: string; value: string; icon?: ReactNode }[], onChange(value): void, fullWidth?: boolean }. Render a rounded pill container (bg = colors.surface, border = colors.border). Active option has bg = colors.card + shadow + bold text. Use Pressable per option. Border radius 12, internal padding 4. React.memo."

# --- B6. StatTile -----------------------------------------------------------
echo "[B6] components/ui/StatTile.tsx — number + label card"
claude -p "Create components/ui/StatTile.tsx wrapping Card. Props { value: string|number, label: string, icon?: ReactNode, trend?: 'up'|'down'|'flat' }. Shows icon top-left, big value (28 bold), small muted label, optional trend chip. React.memo."

# ═══════════════════════════════════════════════════════════════════════════
# PART C — SCREENS (basic but cool)
# ═══════════════════════════════════════════════════════════════════════════

# --- C1. Home dashboard ------------------------------------------------------
echo "[C1] app/(tabs)/index.tsx — Home dashboard"
claude -p "Replace the contents of app/(tabs)/index.tsx (or create it — delete app/(tabs)/index/ subfolder first if it exists) with a dashboard using components from '@/components/ui': Screen (scroll). Sections in order: 1) Greeting header — 'Good morning,' small muted, 'Yannick 👋' 28 bold. 2) Today card (Card) — current streak number with flame icon on left, 'Day streak' label, subtle. 3) Today's workout Card with title 'Full body · 45 min', subtitle '6 exercises', and a primary Button 'Start workout'. 4) Weekly activity row — 7 small circles (Mon..Sun), filled with tint for completed days (mock [true,true,false,true,true,false,false]). 5) A row with two StatTile: 'Workouts this week' 4 and 'Minutes' 175. 6) Section heading 'Quick actions' and a Row of 3 ghost Buttons: 'Log weight', 'Add goal', 'History'. Use useTheme() for colors. Use @expo/vector-icons Ionicons. No state — static UI for now."

# --- C2. Workouts list -------------------------------------------------------
echo "[C2] app/(tabs)/myWorkouts/index.tsx — workouts list"
claude -p "Replace app/(tabs)/myWorkouts/index.tsx with: Screen (padded false, scroll false) containing a header (padded section) with title 'My workouts' 28 bold + subtitle muted '12 workouts saved', a search TextInput styled as a pill (bg colors.surface, rounded 16, icon left), and a horizontal ScrollView of Chip pills ['All','Strength','Cardio','Mobility','HIIT']. Below that a FlashList (from @shopify/flash-list) with estimatedItemSize 96 rendering Card items for a mock array of 6 workouts: { id, name, durationMin, exercises, accent }. Each row shows name (16 semibold), subtitle '{durationMin} min · {exercises} exercises' muted, and a circular icon container (size 44, bg colors.tintMuted, icon 'barbell-outline'). Include a floating primary Button 'New workout' fixed bottom-right (position absolute). Use useTheme()."

# --- C3. Goals screen --------------------------------------------------------
echo "[C3] app/(tabs)/myGoals/index.tsx — goals with progress bars"
claude -p "Replace app/(tabs)/myGoals/index.tsx with: Screen (scroll). Header 'My goals' 28 bold + subtitle muted '3 active'. Then a vertical list of 3 Card goals, each showing: emoji + title ('Bench press 80kg'), muted subtitle ('Target: May 30'), ProgressBar with value (0.62 etc.), and right-aligned percentage text. Mock goals: [{emoji:'🏋️', title:'Bench press 80kg', value:0.62},{emoji:'🏃', title:'Run 50km this month', value:0.4},{emoji:'💧', title:'Drink 2L water daily', value:0.85}]. Below the list a ghost Button 'Add new goal'. Use useTheme()."

# --- C4. Profile screen ------------------------------------------------------
echo "[C4] app/(tabs)/myProfile/index.tsx — profile"
claude -p "Replace app/(tabs)/myProfile/index.tsx with: Screen (scroll). Top: a Card with avatar circle (80, bg colors.tintMuted, initials 'YR' centered 28 bold tint), name 'Yannick Ramser' 20 bold, muted email 'yannickramser1@gmail.com'. Below a Row of 3 StatTile: Workouts 42, Day streak 7, Total minutes 1280. Then a section 'Settings' with ListItem rows (use '@/components/ui/ListItem'): 'Appearance' icon 'color-palette' → push '/settings/appearance', 'Notifications' icon 'notifications-outline' → push '/settings/notifications', 'About' icon 'information-circle-outline' → push '/settings/about'. Finally a ghost Button 'Sign out' danger-colored. Use useTheme() and expo-router's useRouter."

# --- C5. Settings stack + appearance screen (theme picker) ------------------
echo "[C5] app/settings/_layout.tsx + app/settings/appearance.tsx"
claude -p "Create app/settings/_layout.tsx exporting a Stack with headerShown:true, headerTitleStyle reflecting theme text color. Create app/settings/appearance.tsx titled 'Appearance' (set via Stack.Screen options or useNavigation). Screen (scroll). Big heading 'Theme' + muted subtitle 'Choose how the app looks on your device.'. Use SegmentedControl with fullWidth to pick between System / Light / Dark (icons: phone-portrait, sunny, moon). Wire value/onChange to useTheme().preference and setPreference. Below it a Card preview showing colored swatches of background, surface, card, tint, text, success, warning, danger so the user sees the active palette. Use useTheme()."

# --- C6. Minimal stubs for the other settings screens -----------------------
echo "[C6] app/settings/notifications.tsx + app/settings/about.tsx stubs"
claude -p "Create app/settings/notifications.tsx and app/settings/about.tsx as simple Screen pages with a centered title and one paragraph of placeholder text. They will be expanded later. Use useTheme() for colors."

# ═══════════════════════════════════════════════════════════════════════════
# PART D — POLISH
# ═══════════════════════════════════════════════════════════════════════════

# --- D1. Tab bar styling -----------------------------------------------------
echo "[D1] Tab bar — floating, rounded, theme-aware"
claude -p "Update app/(tabs)/_layout.tsx: use useTheme() for tabBarActiveTintColor (colors.tint), tabBarInactiveTintColor (colors.textMuted), tabBarStyle { backgroundColor: colors.card, borderTopColor: colors.border, height: 64, paddingTop: 6, paddingBottom: 10 }, tabBarLabelStyle { fontSize: 11, fontWeight: '600' }. Rename the titles to short forms: Home, Workouts, Goals, Profile. Keep HapticTab and IconSymbol usage. Ensure tabBarHideOnKeyboard on iOS."

# --- D2. Status bar follows theme -------------------------------------------
echo "[D2] StatusBar follows theme"
claude -p "In app/_layout.tsx, replace StatusBar style='auto' with a small inner component that reads useTheme().effective and passes style={effective === 'dark' ? 'light' : 'dark'}. Keep the existing imports."

# --- D3. Verify ---------------------------------------------------------
echo "[D3] Type-check"
claude -p "Run 'npx tsc --noEmit' and surface any errors without auto-fixing them."

echo
echo "UI + theme scaffold done. Next ideas:"
echo "  - add HapticFeedback on theme change"
echo "  - swap mock data in home/workouts/goals for real hooks from features/*"
echo "  - add a /workout/[id] detail screen using expo-image hero"
