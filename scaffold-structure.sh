#!/usr/bin/env bash
# scaffold-structure.sh
# ----------------------------------------------------------------------------
# Scaffolds a clean base structure for fitness_app by delegating each step to
# the Claude Code CLI in non-interactive mode (`claude -p`).
#
# Usage:
#   chmod +x scaffold-structure.sh
#   ./scaffold-structure.sh
#
# Run from the project root (where package.json lives). Each `claude -p`
# invocation is independent — comment out any step you don't want.
# ----------------------------------------------------------------------------

set -euo pipefail

# --- 0. Install the runtime dependencies we'll need --------------------------
echo "[0/14] Installing dependencies"
claude -p "Run 'npx expo install @tanstack/react-query @shopify/flash-list expo-image @react-native-async-storage/async-storage zod' and report the result. Do not edit any other files."

# --- 1. Create the new top-level folders ------------------------------------
echo "[1/14] Creating folder skeleton"
claude -p "Create these empty directories under the project root if they don't exist: api/endpoints, components/ui, features/auth/hooks, features/auth/components, features/workouts/hooks, features/workouts/components, features/goals/hooks, features/goals/components, features/profile/hooks, providers, lib, types. Do not create files yet."

# --- 2. Typed API client -----------------------------------------------------
echo "[2/14] api/client.ts — fetch wrapper with AbortController + typed errors"
claude -p "Create api/client.ts exporting an async function 'apiFetch<T>(url: string, init?: RequestInit & { signal?: AbortSignal }): Promise<T>' that: sets JSON headers, throws a custom ApiError class (status, message, body) on non-2xx, parses JSON responses, and re-throws AbortError cleanly. Also export a helper 'withTimeout(ms: number)' returning an AbortController auto-aborted after ms. Use strict TypeScript, no external deps."

# --- 3. Endpoint modules -----------------------------------------------------
echo "[3/14] api/endpoints/*.ts — domain endpoint helpers"
claude -p "Create api/endpoints/auth.ts, api/endpoints/workouts.ts, api/endpoints/goals.ts and api/endpoints/wger.ts. Each file imports 'apiFetch' from '@/api/client' and 'beApi' or 'workoutDbApi' from '@/api/config'. In auth.ts export login(email, password), register(payload), logout(). In workouts.ts export listWorkouts(), getWorkout(id), createWorkout(payload). In goals.ts export listGoals(), getGoal(id), createGoal(payload). In wger.ts export listExercises(params?), listCategories(), listMuscles(), listEquipment(). Use the corresponding URL from config.ts. Keep the payload/return types as TODO interfaces that import from '@/types'."

# --- 4. Shared TypeScript types ---------------------------------------------
echo "[4/14] types/*.ts — domain interfaces"
claude -p "Create types/user.ts exporting interface User { id: string; email: string; name: string; avatarUrl?: string }. Create types/workout.ts with interface Workout { id: string; name: string; description?: string; durationMin: number; createdAt: string } and interface WorkoutExercise { id: string; name: string; sets: number; reps: number; weightKg?: number }. Create types/goal.ts with interface Goal { id: string; title: string; targetValue: number; currentValue: number; unit: string; dueDate?: string; completed: boolean }. Create types/index.ts re-exporting everything from user, workout, goal."

# --- 5. Query & Auth providers ----------------------------------------------
echo "[5/14] providers/QueryProvider.tsx — TanStack Query setup"
claude -p "Create providers/QueryProvider.tsx exporting default React component 'QueryProvider({ children })' that instantiates a QueryClient (staleTime 60_000, retry 1, refetchOnWindowFocus false) via useRef, wraps children in QueryClientProvider from '@tanstack/react-query'. Pure client component."

echo "[6/14] providers/AuthProvider.tsx — lightweight auth context"
claude -p "Create providers/AuthProvider.tsx with a React context exposing { user: User | null; isLoading: boolean; signIn(email,password): Promise<void>; signOut(): Promise<void> }. Persist the token via '@/lib/storage'. Export a default AuthProvider component and a named useAuth() hook. Split the context into two (state + actions) to avoid unnecessary re-renders. Types come from '@/types'."

# --- 6. lib utilities --------------------------------------------------------
echo "[7/14] lib/storage.ts — AsyncStorage wrapper"
claude -p "Create lib/storage.ts wrapping '@react-native-async-storage/async-storage' with typed helpers: getItem<T>(key): Promise<T|null>, setItem<T>(key, value): Promise<void>, removeItem(key), plus a TOKEN_KEY constant. JSON-serialize values."

echo "[8/14] lib/queryKeys.ts — centralised query keys"
claude -p "Create lib/queryKeys.ts exporting an object 'queryKeys' with nested keys: auth.me, workouts.all, workouts.detail(id), goals.all, goals.detail(id), exercises.all, exercises.categories. Each returns a readonly tuple for use with TanStack Query."

echo "[9/14] lib/format.ts — shared formatters"
claude -p "Create lib/format.ts exporting formatDuration(minutes: number) returning 'Xh Ym' or 'Ym', formatDate(iso: string) returning locale date, and formatPercent(value: number, total: number) returning '42%'."

# --- 7. Reusable UI primitives ----------------------------------------------
echo "[10/14] components/ui/{Screen,Button,Card,EmptyState,ListItem}.tsx"
claude -p "Create components/ui/Screen.tsx: a safe-area wrapper using react-native-safe-area-context's SafeAreaView, accepts children + optional scroll prop (uses ScrollView when true) + style. Create components/ui/Button.tsx: React.memo, props { title, onPress, variant?: 'primary'|'secondary'|'ghost', disabled?: boolean, loading?: boolean }, uses Colors from '@/constants/theme' and shows ActivityIndicator when loading. Create components/ui/Card.tsx: React.memo, rounded container with shadow (use useColorScheme for bg). Create components/ui/EmptyState.tsx: icon+title+subtitle+optional action. Create components/ui/ListItem.tsx: memoized row with leading icon, title, subtitle, trailing chevron, onPress. All files strict TS, no default exports unless noted."

# --- 8. Feature hooks (TanStack Query wrappers) -----------------------------
echo "[11/14] features/*/hooks — data hooks"
claude -p "Create features/workouts/hooks/useWorkouts.ts exporting useWorkouts() using useQuery with queryKeys.workouts.all and api endpoints listWorkouts, useWorkout(id) with getWorkout, and useCreateWorkout mutation invalidating workouts.all on success. Do the same pattern for features/goals/hooks/useGoals.ts (useGoals, useGoal, useCreateGoal) and features/profile/hooks/useProfile.ts (useProfile using queryKeys.auth.me). Import from '@/api/endpoints/*' and '@/lib/queryKeys'. Type the results via '@/types'."

echo "[12/14] features/auth/hooks/useSession.ts"
claude -p "Create features/auth/hooks/useSession.ts exporting useSession() that re-exports 'useAuth' from '@/providers/AuthProvider' plus a useIsAuthenticated() selector returning boolean. Keep it small and dependency-free."

# --- 9. Rewire root layout + auth gate --------------------------------------
echo "[13/14] Wrap app/_layout.tsx with providers + add auth gate"
claude -p "In app/_layout.tsx, wrap the existing Stack with <QueryProvider> then <AuthProvider> (imported from '@/providers/QueryProvider' and '@/providers/AuthProvider'), keeping the existing ThemeProvider and StatusBar. Keep 'unstable_settings' and the two existing Stack.Screen entries. Also create app/(auth)/_layout.tsx exporting a Stack with headerShown:false, and create stub screens app/(auth)/login.tsx and app/(auth)/register.tsx: each renders a Screen component from '@/components/ui/Screen' with a heading and placeholder form. Do not alter the (tabs) group."

# --- 10. Verify ---------------------------------------------------------
echo "[14/14] Verify the project still compiles"
claude -p "Run 'npx tsc --noEmit' from the project root and report any type errors. Do not attempt to fix them — just surface the output."

echo
echo "Scaffold complete. Suggested follow-ups:"
echo "  - Flatten (tabs)/index/index.tsx into (tabs)/index.tsx"
echo "  - Migrate myWorkouts/myGoals/myProfile screens to use features/* hooks"
echo "  - Swap FlatList usages for FlashList from @shopify/flash-list"
