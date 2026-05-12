import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';
import { beApi } from '@/api/config';
import { queryKeys } from '@/lib/queryKeys';
import type { User } from '@/types';

function fetchMe(): Promise<User> {
  return apiFetch<User>(beApi.endpoints.user('me'));
}

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: fetchMe,
  });
}
