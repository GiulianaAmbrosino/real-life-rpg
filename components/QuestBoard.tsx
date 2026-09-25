import { Category, Quest } from "@/lib/types";
import QuestForm from "./QuestForm";
import QuestItem from "./QuestItem";

interface Props {
  quests: Quest[];
  onAdd: (title: string, category: Category, points: number) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function QuestBoard({ quests, onAdd, onComplete, onDelete }: Props) {
  const active = quests.filter((q) => !q.completed);
  const completed = quests
    .filter((q) => q.completed)
    .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0));

  return (
    <section className="flex flex-col gap-6">
      <QuestForm onAdd={onAdd} />

      <div>
        <h3 className="font-display text-xl text-ink mb-3">
          Misiones activas ({active.length})
        </h3>
        {active.length === 0 ? (
          <p className="font-body text-sm text-ink/50 italic">
            Sin misiones pendientes. Agregá una arriba para sumar XP.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {active.map((q) => (
              <QuestItem
                key={q.id}
                quest={q}
                onComplete={onComplete}
                onDelete={onDelete}
              />
            ))}
          </ul>
        )}
      </div>

      {completed.length > 0 && (
        <div>
          <h3 className="font-display text-xl text-ink mb-3">
            Completadas ({completed.length})
          </h3>
          <ul className="flex flex-col gap-2">
            {completed.slice(0, 8).map((q) => (
              <QuestItem
                key={q.id}
                quest={q}
                onComplete={onComplete}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
