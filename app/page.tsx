"use client";

import { useGameState } from "@/lib/useGameState";
import { applyCompletion } from "@/lib/game";
import { Category, Quest } from "@/lib/types";
import CharacterPanel from "@/components/CharacterPanel";
import QuestBoard from "@/components/QuestBoard";
import NewCharacter from "@/components/NewCharacter";

export default function Home() {
  const { state, setState, startNewCharacter, resetSave } = useGameState();

  if (!state) {
    return <NewCharacter onStart={startNewCharacter} />;
  }

  function addQuest(title: string, category: Category, points: number) {
    if (!state) return;
    const newQuest: Quest = {
      id: crypto.randomUUID(),
      title,
      category,
      points,
      completed: false,
      createdAt: Date.now(),
    };
    setState({ ...state, quests: [newQuest, ...state.quests] });
  }

  function completeQuest(id: string) {
    if (!state) return;
    const quest = state.quests.find((q) => q.id === id);
    if (!quest || quest.completed) return;

    const updatedQuests = state.quests.map((q) =>
      q.id === id ? { ...q, completed: true, completedAt: Date.now() } : q
    );
    const updatedCharacter = applyCompletion({
      ...state.character,
      xp: state.character.xp + quest.points,
    });
    setState({ character: updatedCharacter, quests: updatedQuests });
  }

  function deleteQuest(id: string) {
    if (!state) return;
    setState({ ...state, quests: state.quests.filter((q) => q.id !== id) });
  }

  return (
    <main className="min-h-screen bg-ink py-10 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <CharacterPanel
          character={state.character}
          quests={state.quests}
          onReset={resetSave}
        />
        <QuestBoard
          quests={state.quests}
          onAdd={addQuest}
          onComplete={completeQuest}
          onDelete={deleteQuest}
        />
      </div>
    </main>
  );
}
