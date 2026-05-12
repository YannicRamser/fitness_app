export interface Workout {
  id: string;
  name: string;
  description?: string;
  durationMin: number;
  createdAt: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weightKg?: number;
}
