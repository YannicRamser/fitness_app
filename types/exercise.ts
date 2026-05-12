// ─── ExerciseDB OSS Types ────────────────────────────────────────────────────

/** A single exercise returned by the ExerciseDB OSS API. */
export interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  bodyPart: string;
  target: string;
  secondaryMuscles: string[];
  equipment: string;
  instructions: string[];
}

// ─── Pagination ──────────────────────────────────────────────────────────────

/** Cursor-based pagination params shared by most list endpoints. */
export interface PaginationParams {
  /** Max results to return (1–25, default 10). */
  limit?: number;
  /** Exercise ID to paginate after (forward). */
  after?: string;
  /** Exercise ID to paginate before (backward). */
  before?: string;
}

/** Paginated response wrapper. */
export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  previousCursor: string | null;
  total: number;
}

// ─── Filter Params ───────────────────────────────────────────────────────────

/** Params for the main /exercises endpoint with all filters. */
export interface ExerciseFilterParams extends PaginationParams {
  name?: string;
  targetMuscles?: string;
  secondaryMuscles?: string;
  bodyParts?: string;
  equipments?: string;
}

/** Params for /exercises/search (fuzzy). */
export interface FuzzySearchParams {
  search: string;
  /** 0 = exact match, 1 = very loose (default 0.5). */
  threshold?: number;
}

/** Params for /exercises/bodyparts. */
export interface ByBodyPartsParams extends PaginationParams {
  bodyParts: string;
}

/** Params for /exercises/muscles. */
export interface ByMusclesParams extends PaginationParams {
  targetMuscles?: string;
  secondaryMuscles?: string;
}

/** Params for /exercises/equipments. */
export interface ByEquipmentsParams extends PaginationParams {
  equipments: string;
}
