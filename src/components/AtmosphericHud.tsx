import React from 'react';
import { InvestigatorState } from '../types/horror';
import { Activity, ShieldAlert, Sparkles, KeyRound } from 'lucide-react';

interface AtmosphericHudProps {
  state: InvestigatorState;
  onResetDread?: () => void;
}

export const AtmosphericHud: React.FC<AtmosphericHudProps> = ({ state }) => {
  const isHighDread = state.dread >= 65;
  const isLowSanity = state.sanity <= 35;

  return (
    <aside aria-label="Investigation Status" className="w-full border-b border-[#272727] bg-[#121212]/90 px-6 py-2.5 text-xs text-[#b8b8b8] font-[var(--font-space)]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        {/* Left: Investigation Telemetry */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {/* Dread Metric */}
          <div className="flex items-center gap-2">
            <span className="text-[#666666] tracking-wider uppercase font-medium">Dread</span>
            <div className="flex items-center gap-1.5">
              <span className={`font-mono tabular-nums font-bold text-sm ${isHighDread ? 'text-[#ff7518] dread-pulse' : 'text-[#f5f5f5]'}`}>
                {state.dread}%
              </span>
              <span className="text-[10px] text-[#666666]" aria-hidden="true">/ 100</span>
            </div>
            {isHighDread && (
              <span className="text-[11px] text-[#ff7518] font-bold tracking-tight">· ELEVATED</span>
            )}
          </div>

          <span className="hidden sm:inline text-[#272727]" aria-hidden="true">|</span>

          {/* Sanity Metric */}
          <div className="flex items-center gap-2">
            <span className="text-[#666666] tracking-wider uppercase font-medium">Sanity</span>
            <div className="flex items-center gap-1.5">
              <span className={`font-mono tabular-nums font-bold text-sm ${isLowSanity ? 'text-[#b00020]' : 'text-[#f5f5f5]'}`}>
                {state.sanity}%
              </span>
              <span className="text-[10px] text-[#666666]" aria-hidden="true">/ 100</span>
            </div>
            {isLowSanity && (
              <span className="text-[11px] text-[#b00020] font-bold tracking-tight">· FRACTURING</span>
            )}
          </div>

          <span className="hidden sm:inline text-[#272727]" aria-hidden="true">|</span>

          {/* Veil Stability */}
          <div className="flex items-center gap-2">
            <span className="text-[#666666] tracking-wider uppercase font-medium">Veil Integrity</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono tabular-nums font-bold text-sm text-[#f5f5f5]">
                {state.veilStability}%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Solved ciphers & Clues Discovered */}
        <div className="flex items-center gap-6 text-[#b8b8b8]">
          <div className="flex items-center gap-2">
            <KeyRound className="w-3.5 h-3.5 text-[#ff7518]" />
            <span className="tracking-wider uppercase">Ciphers Decoded:</span>
            <span className="font-mono tabular-nums font-bold text-[#f5f5f5]">
              {state.solvedCiphers.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#b00020]" />
            <span className="tracking-wider uppercase">Clues Cataloged:</span>
            <span className="font-mono tabular-nums font-bold text-[#f5f5f5]">
              {state.unlockedClues.length}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
