import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createGoal,
  type CreateGoalPayload,
  getGoal,
  listGoals,
} from '@/api/endpoints/goals';
import { queryKeys } from '@/lib/queryKeys';

export function useGoals() {
  return useQuery({
    queryKey: queryKeys.goals.all,
    queryFn: listGoals,
  });
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: queryKeys.goals.detail(id),
    queryFn: () => getGoal(id),
    enabled: Boolean(id),
  });
}

export function useCreateGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateGoalPayload) => createGoal(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.goals.all });
    },
  });
}
