import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import {
  getExercises,
  getExerciseById,
  searchExercises,
  getExercisesByBodyParts,
  getExercisesByMuscles,
  getExercisesByEquipments,
  getBodyParts,
  getMuscles,
  getEquipments,
} from '@/api/endpoints/exercisedb';
import type {
  ExerciseFilterParams,
  FuzzySearchParams,
  ByBodyPartsParams,
  ByMusclesParams,
  ByEquipmentsParams,
} from '@/types/exercise';

// ─── Paginated List (infinite scroll) ────────────────────────────────────────

/** Infinite-scroll list of exercises with optional filters. */
export function useExercises(params?: Omit<ExerciseFilterParams, 'after' | 'before'>) {
  return useInfiniteQuery({
    queryKey: queryKeys.exerciseDb.list(params),
    queryFn: ({ pageParam, signal }) =>
      getExercises({ ...params, after: pageParam as string | undefined }, signal),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousCursor ?? undefined,
    staleTime: 5 * 60_000, // exercises rarely change — cache 5 min
  });
}

// ─── Single Exercise ─────────────────────────────────────────────────────────

export function useExercise(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.exerciseDb.detail(id!),
    queryFn: ({ signal }) => getExerciseById(id!, signal),
    enabled: !!id,
    staleTime: 10 * 60_000,
  });
}

// ─── Fuzzy Search ────────────────────────────────────────────────────────────

export function useExerciseSearch(params: FuzzySearchParams) {
  return useQuery({
    queryKey: queryKeys.exerciseDb.search(params),
    queryFn: ({ signal }) => searchExercises(params, signal),
    enabled: params.search.length > 0,
    placeholderData: keepPreviousData,
    staleTime: 2 * 60_000,
  });
}

// ─── Filtered by Body Parts ──────────────────────────────────────────────────

export function useExercisesByBodyParts(params: ByBodyPartsParams) {
  return useInfiniteQuery({
    queryKey: queryKeys.exerciseDb.byBodyParts(params),
    queryFn: ({ pageParam, signal }) =>
      getExercisesByBodyParts({ ...params, after: pageParam as string | undefined }, signal),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: params.bodyParts.length > 0,
    staleTime: 5 * 60_000,
  });
}

// ─── Filtered by Muscles ─────────────────────────────────────────────────────

export function useExercisesByMuscles(params: ByMusclesParams) {
  return useInfiniteQuery({
    queryKey: queryKeys.exerciseDb.byMuscles(params),
    queryFn: ({ pageParam, signal }) =>
      getExercisesByMuscles({ ...params, after: pageParam as string | undefined }, signal),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!(params.targetMuscles || params.secondaryMuscles),
    staleTime: 5 * 60_000,
  });
}

// ─── Filtered by Equipment ───────────────────────────────────────────────────

export function useExercisesByEquipments(params: ByEquipmentsParams) {
  return useInfiniteQuery({
    queryKey: queryKeys.exerciseDb.byEquipments(params),
    queryFn: ({ pageParam, signal }) =>
      getExercisesByEquipments({ ...params, after: pageParam as string | undefined }, signal),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: params.equipments.length > 0,
    staleTime: 5 * 60_000,
  });
}

// ─── Lookup Lists (static data, long cache) ──────────────────────────────────

export function useBodyParts() {
  return useQuery({
    queryKey: queryKeys.exerciseDb.bodyParts,
    queryFn: ({ signal }) => getBodyParts(signal),
    staleTime: 30 * 60_000, // body parts won't change mid-session
  });
}

export function useMuscles() {
  return useQuery({
    queryKey: queryKeys.exerciseDb.muscles,
    queryFn: ({ signal }) => getMuscles(signal),
    staleTime: 30 * 60_000,
  });
}

export function useEquipments() {
  return useQuery({
    queryKey: queryKeys.exerciseDb.equipments,
    queryFn: ({ signal }) => getEquipments(signal),
    staleTime: 30 * 60_000,
  });
}
