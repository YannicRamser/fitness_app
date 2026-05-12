export { useAuth as useSession } from '@/providers/AuthProvider';

import { useAuth } from '@/providers/AuthProvider';

export function useIsAuthenticated(): boolean {
  const { user } = useAuth();
  return user !== null;
}
