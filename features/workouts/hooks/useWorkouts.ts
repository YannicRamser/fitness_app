import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createWorkout,
  type CreateWorkoutPayload,
  getWorkout,
  listWorkouts,
} from '@/api/endpoints/workouts';
import { queryKeys } from '@/lib/queryKeys';

export function useWorkouts() {
  return useQuery({
    queryKey: queryKeys.workouts.all,
    queryFn: listWorkouts,
  });
}

export function useWorkout(id: string) {
  return useQuery({
    queryKey: queryKeys.workouts.detail(id),
    queryFn: () => getWorkout(id),
    enabled: Boolean(id),
  });
}

export function useCreateWorkout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateWorkoutPayload) => createWorkout(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.workouts.all });
    },
  });
}
