import { Category, Character, GameState, Quest } from "./types";

export const CATEGORY_META: Record<
  Category,
  { label: string; color: string; verb: string }
> = {
  cuerpo: { label: "Cuerpo", color: "bg-moss", verb: "Moverte" },
  mente: { label: "Mente", color: "bg-plum", verb: "Enfocarte" },
  descanso: { label: "Descanso", color: "bg-rest", verb: "Recuperarte" },
  vinculos: { label: "Vínculos", color: "bg-ember", verb: "Conectar" },
};

// XP needed to go from level N to N+1 grows each level, RPG-style.
export function xpForLevel(level: number): number {
  return 50 + (level - 1) * 35;
}

export function levelFromXp(xp: number): {
  level: number;
  xpIntoLevel: number;
  xpForNext: number;
} {
  let level = 1;
  let remaining = xp;
  let needed = xpForLevel(level);
  while (remaining >= needed) {
    remaining -= needed;
    level += 1;
    needed = xpForLevel(level);
  }
  return { level, xpIntoLevel: remaining, xpForNext: needed };
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function applyCompletion(character: Character): Character {
  const today = todayKey();
  if (character.lastCompletedDay === today) {
    return character; // streak already counted today
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = character.lastCompletedDay === yesterday.toISOString().slice(0, 10);
  return {
    ...character,
    streak: wasYesterday ? character.streak + 1 : 1,
    lastCompletedDay: today,
  };
}

export const STARTER_QUESTS: Omit<Quest, "id" | "createdAt" | "completed">[] = [
  { title: "Tomar 2 litros de agua", category: "cuerpo", points: 10 },
  { title: "Caminar 20 minutos", category: "cuerpo", points: 15 },
  { title: "Meditar 10 minutos", category: "mente", points: 15 },
  { title: "Escribir 3 líneas en un diario", category: "mente", points: 10 },
  { title: "Dormir 7+ horas", category: "descanso", points: 20 },
  { title: "Desconectar del celular 1 hora", category: "descanso", points: 10 },
  { title: "Llamar a alguien querido", category: "vinculos", points: 15 },
];

export function makeInitialState(name: string): GameState {
  const now = Date.now();
  return {
    character: { name, xp: 0, streak: 0, lastCompletedDay: null },
    quests: STARTER_QUESTS.map((q, i) => ({
      ...q,
      id: `starter-${i}-${now}`,
      createdAt: now,
      completed: false,
    })),
  };
}
