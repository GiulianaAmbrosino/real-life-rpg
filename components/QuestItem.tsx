import { Quest } from "@/lib/types";
import { CATEGORY_META } from "@/lib/game";

interface Props {
  quest: Quest;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function QuestItem({ quest, onComplete, onDelete }: Props) {
  const meta = CATEGORY_META[quest.category];

  return (
    <li
      className={`flex items-center gap-3 border border-ink/15 rounded-card px-4 py-3 bg-white/50 ${
        quest.completed ? "opacity-50" : ""
      }`}
    >
      <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${meta.color}`} />

      <div className="flex-1 min-w-0">
        <p
          className={`font-body text-sm text-ink truncate ${
            quest.completed ? "line-through" : ""
          }`}
        >
          {quest.title}
        </p>
        <p className="font-body text-xs text-ink/45">
          {meta.label} · {quest.points} XP
        </p>
      </div>

      {!quest.completed && (
        <button
          onClick={() => onComplete(quest.id)}
          className="font-body text-xs bg-ember hover:bg-emberDark text-parchment px-3 py-1.5 rounded shrink-0"
        >
          Completar
        </button>
      )}

      <button
        onClick={() => onDelete(quest.id)}
        aria-label="Eliminar misión"
        className="font-body text-ink/30 hover:text-ink/60 text-lg leading-none shrink-0"
      >
        ×
      </button>
    </li>
  );
}
