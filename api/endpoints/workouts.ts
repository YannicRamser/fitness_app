import { apiFetch } from '@/api/client';
import { beApi } from '@/api/config';
import type { Workout } from '@/types';

// TODO: define proper payload types
export interface CreateWorkoutPayload {
  name: string;
  description?: string;
  durationMin: number;
}

export function listWorkouts(): Promise<Workout[]> {
  return apiFetch<Workout[]>(beApi.endpoints.workouts);
}

export function getWorkout(id: string): Promise<Workout> {
  return apiFetch<Workout>(beApi.endpoints.workout(id));
}

export function createWorkout(payload: CreateWorkoutPayload): Promise<Workout> {
  return apiFetch<Workout>(beApi.endpoints.workouts, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
