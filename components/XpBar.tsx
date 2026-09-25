interface Props {
  xpIntoLevel: number;
  xpForNext: number;
}

export default function XpBar({ xpIntoLevel, xpForNext }: Props) {
  const pct = Math.min(100, Math.round((xpIntoLevel / xpForNext) * 100));
  return (
    <div>
      <div className="h-3 w-full rounded-full bg-parchmentDark overflow-hidden border border-ink/20">
        <div
          className="h-full bg-ember transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-ink/60 font-body">
        {xpIntoLevel} / {xpForNext} XP para el próximo nivel
      </p>
    </div>
  );
}
