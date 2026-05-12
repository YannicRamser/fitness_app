# fitness_app — Issues Found

## Blocker bugs (will crash or throw warnings at runtime)

1. **`app/(tabs)/myGoals/index.tsx` line 17 — stray `v` character after `</TouchableOpacity>`**
   ```
   </TouchableOpacity>v
   ```
   React Native throws **"Text strings must be rendered within a <Text> component"** because the literal `v` is a text node directly under `<View>`. Remove the trailing `v`.

2. **`alert(...)` used in `myWorkouts/index.tsx`, `myGoals/index.tsx`, `myProfile/index.tsx`**
   `alert` is a browser API. It works on Expo Web but is not guaranteed on iOS/Android. Use `Alert.alert('Button pressed!')` from `react-native`.

## Unused imports / dead code (TS + ESLint warnings under `strict: true`)

3. **`app/(tabs)/myGoals/index.tsx`** imports `Text` from `react-native` but never uses it.
4. **`app/(tabs)/myProfile/index.tsx`** imports `Text` from `react-native` but never uses it.
5. **`app/(tabs)/index/index.tsx`** imports `useNavigation` and assigns `const navigation = useNavigation();` but never uses `navigation`.

## Routing / consistency issues

6. **`app/(tabs)/index/index.tsx`** uses `<Link href="/(tabs)/index/test">`. Inside a group route you should just use `/test` (the nested stack already scopes it) or the relative form. The current path duplicates the group prefix and can break if the group is later renamed.
7. The nested `index/` folder containing another `index.tsx` + `_layout.tsx` is a legal but confusing structure. If you don't actually need a nested Stack for the Home tab, flatten it to `app/(tabs)/index.tsx` to reduce one router level.

## Theme / design inconsistencies

8. **README says the "app special color" is `#0bd2ec`**, but `constants/theme.ts` defines `tintColorLight = '#0a7ea4'` and hardcodes `buttonBackground: '#007AFF'`. `#0bd2ec` is not referenced anywhere. Either update the README or add the brand color to `Colors` and use it for `tint` / `buttonBackground`.
9. Every page re-declares the same local `StyleSheet` (container / title / subtitle / button / buttonText) instead of importing `getGlobalStyles` from `constants/Styles.ts`, which was written for exactly this purpose. This causes drift (e.g. `#007AFF`, `white`, `#666` literals repeated in four places).
10. **`constants/Styles.ts` → `buttonText.color: colors.text`** — on light mode the button background is `#007AFF` and the button text becomes `#11181C` (almost black) which is low contrast. Should be `'#fff'` regardless of theme, or a dedicated `colors.buttonText`.

## API layer

11. **`api/config.ts` hardcodes `http://localhost:3000/api`**. This will not resolve from a real device or emulator (Android emulator needs `10.0.2.2`, a physical device needs your LAN IP). Replace with an environment-driven value, e.g. read from `expo-constants` `Constants.expoConfig?.extra` or `process.env.EXPO_PUBLIC_API_URL`.
12. No API client/fetch wrapper exists yet, so the wger integration defined in `config.ts` is unused. Consider adding a thin `fetchJson` helper with error handling and an AbortController.

## Minor / nice-to-have

13. Tab titles (`MyHome`, `MyWorkouts`, `MyGoals`, `MyProfile`) use PascalCase-with-My-prefix which can overflow on narrow devices. Consider `Home`, `Workouts`, `Goals`, `Profile`.
14. `app/(tabs)/myWorkouts/index.tsx` function is named `TestPage` but it's the MyWorkouts screen — rename to `MyWorkoutsPage` for clarity.
15. `tsconfig.json` has mtime `Oct 26 1985` — cosmetic, not functional. A `touch tsconfig.json` will fix it.
16. `eslint.config.js` exists but `lint` has not been run; running `npm run lint` will reveal issues 3–5 automatically.
