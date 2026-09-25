export type Category = "cuerpo" | "mente" | "descanso" | "vinculos";

export interface Quest {
  id: string;
  title: string;
  category: Category;
  points: number;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

export interface Character {
  name: string;
  xp: number;
  streak: number;
  lastCompletedDay: string | null; // YYYY-MM-DD
}

export interface GameState {
  character: Character;
  quests: Quest[];
}
