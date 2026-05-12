import type {
  ExerciseFilterParams,
  FuzzySearchParams,
  ByBodyPartsParams,
  ByMusclesParams,
  ByEquipmentsParams,
} from '@/types/exercise';

export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  workouts: {
    all: ['workouts'] as const,
    detail: (id: string) => ['workouts', id] as const,
  },
  goals: {
    all: ['goals'] as const,
    detail: (id: string) => ['goals', id] as const,
  },
  exercises: {
    all: ['exercises'] as const,
    categories: ['exercises', 'categories'] as const,
  },

  // ExerciseDB OSS
  exerciseDb: {
    all: ['exerciseDb'] as const,
    list: (params?: ExerciseFilterParams) => ['exerciseDb', 'list', params] as const,
    detail: (id: string) => ['exerciseDb', 'detail', id] as const,
    search: (params: FuzzySearchParams) => ['exerciseDb', 'search', params] as const,
    byBodyParts: (params: ByBodyPartsParams) => ['exerciseDb', 'byBodyParts', params] as const,
    byMuscles: (params: ByMusclesParams) => ['exerciseDb', 'byMuscles', params] as const,
    byEquipments: (params: ByEquipmentsParams) => ['exerciseDb', 'byEquipments', params] as const,
    bodyParts: ['exerciseDb', 'bodyParts'] as const,
    muscles: ['exerciseDb', 'muscles'] as const,
    equipments: ['exerciseDb', 'equipments'] as const,
  },
} as const;
