import { apiFetch } from '@/api/client';
import { beApi } from '@/api/config';
import type { Goal } from '@/types';

// TODO: define proper payload types
export interface CreateGoalPayload {
  title: string;
  targetValue: number;
  unit: string;
  dueDate?: string;
}

export function listGoals(): Promise<Goal[]> {
  return apiFetch<Goal[]>(beApi.endpoints.goals);
}

export function getGoal(id: string): Promise<Goal> {
  return apiFetch<Goal>(beApi.endpoints.goal(id));
}

export function createGoal(payload: CreateGoalPayload): Promise<Goal> {
  return apiFetch<Goal>(beApi.endpoints.goals, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
