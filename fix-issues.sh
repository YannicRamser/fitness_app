#!/usr/bin/env bash
# fix-issues.sh
# ----------------------------------------------------------------------------
# Fixes the issues documented in FIXES.md by delegating each one to the
# Claude Code CLI in non-interactive mode (`claude -p`). Each block is
# independent, so you can comment out or re-order any you don't want.
#
# Usage:
#   chmod +x fix-issues.sh
#   ./fix-issues.sh
#
# Pre-req: the `claude` CLI (Claude Code) must be installed and logged in.
#          Run from the project root (where package.json lives).
# ----------------------------------------------------------------------------

set -euo pipefail

# --- 1. Blocker: stray `v` in myGoals/index.tsx ------------------------------
echo "[1/9] Fixing stray 'v' after </TouchableOpacity> in myGoals/index.tsx"
claude -p "In app/(tabs)/myGoals/index.tsx there is a stray character 'v' right after </TouchableOpacity> on line 17. Remove only that trailing 'v' so the closing tag becomes </TouchableOpacity>. Do not touch anything else."

# --- 2. Replace web `alert(...)` with RN `Alert.alert(...)` ------------------
echo "[2/9] Replacing alert() with Alert.alert() across the (tabs) screens"
claude -p "In app/(tabs)/myWorkouts/index.tsx, app/(tabs)/myGoals/index.tsx and app/(tabs)/myProfile/index.tsx: (1) add 'Alert' to the existing import from 'react-native'; (2) replace every occurrence of alert('Button pressed!') with Alert.alert('Button pressed!'). Leave the rest of each file untouched."

# --- 3-4. Remove unused `Text` imports ---------------------------------------
echo "[3/9] Removing unused Text import from myGoals + myProfile"
claude -p "In app/(tabs)/myGoals/index.tsx and app/(tabs)/myProfile/index.tsx, the symbol 'Text' is imported from 'react-native' but never used. Remove 'Text' from those import lists. Keep the other imports (View, StyleSheet, TouchableOpacity, and – after the previous fix – Alert) in place."

# --- 5. Remove unused useNavigation in home page -----------------------------
echo "[4/9] Removing unused useNavigation in app/(tabs)/index/index.tsx"
claude -p "In app/(tabs)/index/index.tsx, 'useNavigation' is imported from 'expo-router' and called but its result ('const navigation = useNavigation();') is never used. Remove both the import symbol and the unused const. Do not change anything else."

# --- 6. Normalize Link path in home page -------------------------------------
echo "[5/9] Normalizing the Link href in app/(tabs)/index/index.tsx"
claude -p "In app/(tabs)/index/index.tsx change <Link href=\"/(tabs)/index/test\" asChild> to <Link href=\"/test\" asChild>. Leave all other Link elements alone."

# --- 8. Wire the brand color into the theme ----------------------------------
echo "[6/9] Adding brand color #0bd2ec to constants/theme.ts"
claude -p "In constants/theme.ts add a new constant 'const brand = \"#0bd2ec\";' near the top (below the existing tint constants). Use 'brand' for Colors.light.tint, Colors.light.tabIconSelected, Colors.light.buttonBackground, Colors.dark.tabIconSelected and Colors.dark.buttonBackground. Keep Colors.dark.tint as '#fff' and do not change the text/background/icon fields. Keep the existing Fonts export unchanged."

# --- 9. Refactor duplicated StyleSheet into getGlobalStyles ------------------
echo "[7/9] Refactoring each tab page to reuse getGlobalStyles"
claude -p "In app/(tabs)/index/index.tsx, app/(tabs)/myWorkouts/index.tsx, app/(tabs)/myGoals/index.tsx and app/(tabs)/myProfile/index.tsx: remove the local StyleSheet.create block and the 'StyleSheet' import. Import { useColorScheme } from 'react-native' and { getGlobalStyles } from '@/constants/Styles'. At the top of the component do: const theme = useColorScheme() ?? 'light'; const styles = getGlobalStyles(theme); Keep all JSX and other behavior identical so 'styles.container', 'styles.title', etc. still resolve."

# --- 10. Ensure button text stays white regardless of theme ------------------
echo "[8/9] Fixing low-contrast button text in constants/Styles.ts"
claude -p "In constants/Styles.ts change the buttonText color from colors.text to '#fff' so the white label always sits on the blue button background. Leave the rest of the file unchanged."

# --- 11. Externalize the backend base URL ------------------------------------
echo "[9/9] Making the backend base URL configurable via env"
claude -p "In api/config.ts replace the hardcoded 'const BE_BASE_URL = \"http://localhost:3000/api\";' with 'const BE_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? \"http://localhost:3000/api\";' so it can be overridden at build time. Leave everything else in the file untouched."

echo
echo "All fixes dispatched. Recommended next steps:"
echo "  npm run lint"
echo "  npx tsc --noEmit"
echo "  npx expo start -c"
