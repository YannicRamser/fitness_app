// ─── Backend API ─────────────────────────────────────────────────────────────

const BE_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api";

export const beApi = {
  baseUrl: BE_BASE_URL,

  endpoints: {
    // Auth
    login: `${BE_BASE_URL}/auth/login`,
    register: `${BE_BASE_URL}/auth/register`,
    logout: `${BE_BASE_URL}/auth/logout`,

    // Users
    users: `${BE_BASE_URL}/users`,
    user: (id: string) => `${BE_BASE_URL}/users/${id}`,

    // Workouts
    workouts: `${BE_BASE_URL}/workouts`,
    workout: (id: string) => `${BE_BASE_URL}/workouts/${id}`,

    // Goals
    goals: `${BE_BASE_URL}/goals`,
    goal: (id: string) => `${BE_BASE_URL}/goals/${id}`,
  },
};

// ─── WorkoutDB API ────────────────────────────────────────────────────────────
// https://www.wger.de/api/v2  (free, no auth required for read-only access)

const WORKOUT_DB_BASE_URL = "https://wger.de/api/v2";

export const workoutDbApi = {
  baseUrl: WORKOUT_DB_BASE_URL,

  endpoints: {
    // Exercises
    exercises: `${WORKOUT_DB_BASE_URL}/exercise`,
    exercise: (id: number) => `${WORKOUT_DB_BASE_URL}/exercise/${id}`,
    exerciseInfo: (id: number) => `${WORKOUT_DB_BASE_URL}/exerciseinfo/${id}`,

    // Exercise categories (e.g. Chest, Back, Arms …)
    categories: `${WORKOUT_DB_BASE_URL}/exercisecategory`,

    // Muscles
    muscles: `${WORKOUT_DB_BASE_URL}/muscle`,

    // Equipment
    equipment: `${WORKOUT_DB_BASE_URL}/equipment`,
  },
};

// ─── ExerciseDB API (OSS) ────────────────────────────────────────────────────
// https://oss.exercisedb.dev  (free, no auth required)

const EXERCISEDB_BASE_URL = "https://oss.exercisedb.dev/api/v1";

export const exerciseDbApi = {
  baseUrl: EXERCISEDB_BASE_URL,

  endpoints: {
    // Exercises
    exercises: `${EXERCISEDB_BASE_URL}/exercises`,
    exercise: (id: string) => `${EXERCISEDB_BASE_URL}/exercises/${id}`,

    // Filtered endpoints
    search: `${EXERCISEDB_BASE_URL}/exercises/search`,
    byBodyParts: `${EXERCISEDB_BASE_URL}/exercises/bodyparts`,
    byMuscles: `${EXERCISEDB_BASE_URL}/exercises/muscles`,
    byEquipments: `${EXERCISEDB_BASE_URL}/exercises/equipments`,

    // Lookup lists
    bodyParts: `${EXERCISEDB_BASE_URL}/bodyparts`,
    muscles: `${EXERCISEDB_BASE_URL}/muscles`,
    equipments: `${EXERCISEDB_BASE_URL}/equipments`,
  },
};