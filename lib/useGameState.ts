"use client";

import { useEffect, useState } from "react";
import { GameState } from "./types";
import { makeInitialState } from "./game";

const STORAGE_KEY = "lifequest-save-v1";

export function useGameState() {
  const [state, setState] = useState<GameState | null>(null);


  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState(JSON.parse(raw));
        return;
      }
    } catch {
   
    }
    setState(null);
  }, []);


  useEffect(() => {
    if (state) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  function startNewCharacter(name: string) {
    setState(makeInitialState(name));
  }

  function resetSave() {
    window.localStorage.removeItem(STORAGE_KEY);
    setState(null);
  }

  return { state, setState, startNewCharacter, resetSave };
}
