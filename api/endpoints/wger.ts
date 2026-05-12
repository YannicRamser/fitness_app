import { apiFetch } from '@/api/client';
import { workoutDbApi } from '@/api/config';

// Minimal wger response shapes — expand as needed
export interface WgerExercise { id: number; uuid: string; name: string; category: number }
export interface WgerCategory { id: number; name: string }
export interface WgerMuscle { id: number; name: string; nameEn: string }
export interface WgerEquipment { id: number; name: string }
export interface WgerListResponse<T> { count: number; next: string | null; previous: string | null; results: T[] }

export interface ExerciseParams {
  language?: number;
  category?: number;
  muscle?: number;
  equipment?: number;
  format?: 'json';
  limit?: number;
  offset?: number;
}

function buildQuery(params?: Record<string, string | number | undefined>): string {
  if (!params) return '';
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return qs ? `?${qs}` : '';
}

export function listExercises(params?: ExerciseParams): Promise<WgerListResponse<WgerExercise>> {
  return apiFetch(`${workoutDbApi.endpoints.exercises}${buildQuery(params as Record<string, string | number | undefined>)}`);
}

export function listCategories(): Promise<WgerListResponse<WgerCategory>> {
  return apiFetch(workoutDbApi.endpoints.categories);
}

export function listMuscles(): Promise<WgerListResponse<WgerMuscle>> {
  return apiFetch(workoutDbApi.endpoints.muscles);
}

export function listEquipment(): Promise<WgerListResponse<WgerEquipment>> {
  return apiFetch(workoutDbApi.endpoints.equipment);
}
