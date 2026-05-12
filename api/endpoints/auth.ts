import { apiFetch } from '@/api/client';
import { beApi } from '@/api/config';
import type { User } from '@/types';

// TODO: define proper payload/response types
export interface LoginPayload { email: string; password: string }
export interface RegisterPayload { email: string; password: string; name: string }
export interface AuthResponse { token: string; user: User }

export function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>(beApi.endpoints.login, {
    method: 'POST',
    body: JSON.stringify({ email, password } satisfies LoginPayload),
  });
}

export function register(payload: RegisterPayload): Promise<AuthResponse> {
  return apiFetch<AuthResponse>(beApi.endpoints.register, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function logout(): Promise<void> {
  return apiFetch<void>(beApi.endpoints.logout, { method: 'POST' });
}
