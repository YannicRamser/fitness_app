export interface Goal {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  dueDate?: string;
  completed: boolean;
}
