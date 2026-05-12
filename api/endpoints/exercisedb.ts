import { apiFetch } from '@/api/client';
import { exerciseDbApi } from '@/api/config';
import type {
  Exercise,
  PaginatedResponse,
  ExerciseFilterParams,
  FuzzySearchParams,
  ByBodyPartsParams,
  ByMusclesParams,
  ByEquipmentsParams,
} from '@/types/exercise';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildQuery(params?: Record<string, string | number | undefined>): string {
  if (!params) return '';
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return qs ? `?${qs}` : '';
}

// ─── Exercise Endpoints ──────────────────────────────────────────────────────

/** GET /exercises — list all exercises (paginated). */
export function getExercises(
  params?: ExerciseFilterParams,
  signal?: AbortSignal,
): Promise<PaginatedResponse<Exercise>> {
  const url = `${exerciseDbApi.endpoints.exercises}${buildQuery(params as Record<string, string | number | undefined>)}`;
  return apiFetch(url, { signal });
}

/** GET /exercises/:id — get a single exercise by ID. */
export function getExerciseById(
  id: string,
  signal?: AbortSignal,
): Promise<Exercise> {
  return apiFetch(exerciseDbApi.endpoints.exercise(id), { signal });
}

/** GET /exercises/search — fuzzy search exercises. */
export function searchExercises(
  params: FuzzySearchParams,
  signal?: AbortSignal,
): Promise<Exercise[]> {
  const url = `${exerciseDbApi.endpoints.search}${buildQuery(params as Record<string, string | number | undefined>)}`;
  return apiFetch(url, { signal });
}

/** GET /exercises/bodyparts — filter exercises by body parts. */
export function getExercisesByBodyParts(
  params: ByBodyPartsParams,
  signal?: AbortSignal,
): Promise<PaginatedResponse<Exercise>> {
  const url = `${exerciseDbApi.endpoints.byBodyParts}${buildQuery(params as Record<string, string | number | undefined>)}`;
  return apiFetch(url, { signal });
}

/** GET /exercises/muscles — filter exercises by muscles. */
export function getExercisesByMuscles(
  params: ByMusclesParams,
  signal?: AbortSignal,
): Promise<PaginatedResponse<Exercise>> {
  const url = `${exerciseDbApi.endpoints.byMuscles}${buildQuery(params as Record<string, string | number | undefined>)}`;
  return apiFetch(url, { signal });
}

/** GET /exercises/equipments — filter exercises by equipment. */
export function getExercisesByEquipments(
  params: ByEquipmentsParams,
  signal?: AbortSignal,
): Promise<PaginatedResponse<Exercise>> {
  const url = `${exerciseDbApi.endpoints.byEquipments}${buildQuery(params as Record<string, string | number | undefined>)}`;
  return apiFetch(url, { signal });
}

// ─── Lookup Lists ────────────────────────────────────────────────────────────

/** GET /bodyparts — list all available body parts. */
export function getBodyParts(signal?: AbortSignal): Promise<string[]> {
  return apiFetch(exerciseDbApi.endpoints.bodyParts, { signal });
}

/** GET /muscles — list all available muscles. */
export function getMuscles(signal?: AbortSignal): Promise<string[]> {
  return apiFetch(exerciseDbApi.endpoints.muscles, { signal });
}

/** GET /equipments — list all available equipment types. */
export function getEquipments(signal?: AbortSignal): Promise<string[]> {
  return apiFetch(exerciseDbApi.endpoints.equipments, { signal });
}
