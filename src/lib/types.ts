// Types para o NexFit

export type UserRole = 'client' | 'professional';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  subscription?: Subscription;
}

export interface Subscription {
  type: 'training' | 'diet' | 'complete';
  price: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  createdBy: string;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface DietPlan {
  id: string;
  name: string;
  description: string;
  meals: Meal[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  createdBy: string;
  createdAt: string;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
}

export interface Food {
  name: string;
  quantity: string;
  calories: number;
}

export interface Professional {
  id: string;
  name: string;
  specialty: 'personal' | 'nutritionist' | 'both';
  rating: number;
  price: number;
  location: string;
  avatar?: string;
  bio: string;
  clients: number;
}

export interface Anamnese {
  id: string;
  userId: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  experience: string;
  restrictions: string[];
  diseases: string[];
  medications: string[];
  createdAt: string;
}
