"use client";

import { useState } from "react";

interface Props {
  onStart: (name: string) => void;
}

export default function NewCharacter({ onStart }: Props) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onStart(name.trim() || "Aventurero/a");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-parchment rounded-card p-8 max-w-sm w-full flex flex-col gap-4 text-center"
      >
        <h1 className="font-display text-4xl text-ink">LifeQuest</h1>
        <p className="font-body text-sm text-ink/60">
          Convertí tu bienestar en una partida de rol. Cada hábito saludable
          es una misión que te suma experiencia.
        </p>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="¿Cómo se llama tu personaje?"
          className="bg-white/70 border border-ink/20 rounded px-3 py-2 font-body text-sm text-ink text-center focus:outline-none focus:ring-2 focus:ring-moss"
        />
        <button
          type="submit"
          className="bg-moss hover:bg-mossDark text-parchment font-body text-sm px-4 py-2.5 rounded transition-colors"
        >
          Comenzar aventura
        </button>
      </form>
    </div>
  );
}
