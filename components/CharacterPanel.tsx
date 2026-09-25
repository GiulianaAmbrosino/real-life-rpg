import { Character, Quest } from "@/lib/types";
import { levelFromXp } from "@/lib/game";
import XpBar from "./XpBar";

interface Props {
  character: Character;
  quests: Quest[];
  onReset: () => void;
}

export default function CharacterPanel({ character, quests, onReset }: Props) {
  const { level, xpIntoLevel, xpForNext } = levelFromXp(character.xp);
  const completedTotal = quests.filter((q) => q.completed).length;

  return (
    <aside className="bg-parchment border border-ink/15 rounded-card p-6 flex flex-col gap-6 h-fit">
      <div>
        <p className="font-body text-xs tracking-wide text-ink/50">Aventurero</p>
        <h2 className="font-display text-3xl text-ink leading-tight">
          {character.name}
        </h2>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-display text-5xl text-moss leading-none">
          {level}
        </span>
        <span className="font-body text-sm text-ink/60">nivel</span>
      </div>

      <XpBar xpIntoLevel={xpIntoLevel} xpForNext={xpForNext} />

      <dl className="grid grid-cols-2 gap-4 font-body text-sm">
        <div>
          <dt className="text-ink/50">Racha</dt>
          <dd className="text-ink text-lg font-medium">
            {character.streak} {character.streak === 1 ? "día" : "días"}
          </dd>
        </div>
        <div>
          <dt className="text-ink/50">XP total</dt>
          <dd className="text-ink text-lg font-medium">{character.xp}</dd>
        </div>
        <div>
          <dt className="text-ink/50">Misiones hechas</dt>
          <dd className="text-ink text-lg font-medium">{completedTotal}</dd>
        </div>
        <div>
          <dt className="text-ink/50">Misiones activas</dt>
          <dd className="text-ink text-lg font-medium">
            {quests.length - completedTotal}
          </dd>
        </div>
      </dl>

      <button
        onClick={onReset}
        className="mt-2 self-start font-body text-xs text-ink/40 hover:text-ink/70 underline underline-offset-2"
      >
        Empezar una partida nueva
      </button>
    </aside>
  );
}
