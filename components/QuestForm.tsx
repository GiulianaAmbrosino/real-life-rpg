"use client";

import { useState } from "react";
import { Category } from "@/lib/types";
import { CATEGORY_META } from "@/lib/game";

interface Props {
  onAdd: (title: string, category: Category, points: number) => void;
}

const CATEGORIES = Object.keys(CATEGORY_META) as Category[];

export default function QuestForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("cuerpo");
  const [points, setPoints] = useState(10);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), category, points);
    setTitle("");
    setPoints(10);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-parchment border border-ink/15 rounded-card p-4 flex flex-col sm:flex-row gap-3 sm:items-end"
    >
      <div className="flex-1">
        <label className="block font-body text-xs text-ink/50 mb-1">
          Nueva misión de bienestar
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Estirar 10 minutos"
          className="w-full bg-white/60 border border-ink/20 rounded px-3 py-2 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-moss"
        />
      </div>

      <div>
        <label className="block font-body text-xs text-ink/50 mb-1">
          Categoría
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="bg-white/60 border border-ink/20 rounded px-3 py-2 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-moss"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_META[c].label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-body text-xs text-ink/50 mb-1">
          Puntos
        </label>
        <input
          type="number"
          min={5}
          max={100}
          step={5}
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className="w-20 bg-white/60 border border-ink/20 rounded px-3 py-2 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-moss"
        />
      </div>

      <button
        type="submit"
        className="bg-moss hover:bg-mossDark text-parchment font-body text-sm px-4 py-2 rounded transition-colors"
      >
        Agregar misión
      </button>
    </form>
  );
}
