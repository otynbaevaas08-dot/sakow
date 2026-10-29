import React, { useState } from 'react';
import { CRUCIBLE_REAGENTS } from '../data/crucibleData';
import { CrucibleReagent } from '../types/horror';
import { audioEngine } from '../services/audioEngine';
import { Flame, ShieldAlert, Sparkles, RefreshCw, AlertOctagon } from 'lucide-react';

interface CrucibleProps {
  currentDread: number;
  currentVeilStability: number;
  onApplyCrucibleImpact: (dreadDelta: number, stabilityDelta: number, logMessage: string) => void;
}

export const CrucibleScreen: React.FC<CrucibleProps> = ({
  currentDread,
  currentVeilStability,
  onApplyCrucibleImpact,
}) => {
  const [selectedReagentIds, setSelectedReagentIds] = useState<string[]>([
    'reagent_bone_ash',
    'reagent_lead_foil',
  ]);
  const [incantation, setIncantation] = useState<string>('IN NOMINE MORTIS');
  const [combustionLog, setCombustionLog] = useState<{
    status: 'idle' | 'success' | 'warning' | 'danger';
    title: string;
    details: string;
    metrics: string;
  } | null>(null);
  const [isIgniting, setIsIgniting] = useState<boolean>(false);

  const toggleReagent = (id: string) => {
    audioEngine.playTypewriterKey();
    setSelectedReagentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleIgnite = () => {
    if (selectedReagentIds.length === 0) {
      audioEngine.playStoneThud();
      return;
    }

    setIsIgniting(true);
    audioEngine.playOccultBell();

    const selectedReagents = CRUCIBLE_REAGENTS.filter((r) =>
      selectedReagentIds.includes(r.id)
    );

    const totalDreadImpact = selectedReagents.reduce((acc, r) => acc + r.dreadImpact, 0);
    const totalStabilityImpact = selectedReagents.reduce((acc, r) => acc + r.stabilityImpact, 0);

    setTimeout(() => {
      setIsIgniting(false);
      audioEngine.playStoneThud();

      let logTitle = 'Crucible Transmutation Equilibrium';
      let status: 'idle' | 'success' | 'warning' | 'danger' = 'success';

      if (totalDreadImpact > 20) {
        logTitle = 'CRITICAL ESSENCE VOLATILIZATION';
        status = 'danger';
        audioEngine.playHeartbeat();
      } else if (totalStabilityImpact < -10) {
        logTitle = 'VEIL INTEGRITY BREACH DETECTED';
        status = 'warning';
      }

      const logText = `Incantation "${incantation.trim() || 'TACITUS'}" bound ${selectedReagents.length} reagents. Vapors crystallized into obsidian salt.`;
      const metricText = `Dread Flux: ${totalDreadImpact >= 0 ? '+' : ''}${totalDreadImpact}% · Veil Stability Flux: ${totalStabilityImpact >= 0 ? '+' : ''}${totalStabilityImpact}%`;

      setCombustionLog({
        status,
        title: logTitle,
        details: logText,
        metrics: metricText,
      });

      onApplyCrucibleImpact(
        totalDreadImpact,
        totalStabilityImpact,
        `Crucible Synthesis: [${incantation.trim() || 'MUTUM'}] with ${selectedReagents.map((r) => r.name).join(', ')}`
      );
    }, 450);
  };

  const handleReset = () => {
    audioEngine.playTypewriterKey();
    setSelectedReagentIds([]);
    setIncantation('');
    setCombustionLog(null);
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] py-8 px-4 sm:px-6">
      <div className="max-w-[760px] mx-auto">
        {/* Chamber Header */}
        <div className="border border-[#272727] bg-[#121212] p-6 mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272727]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff7518] font-[var(--font-space)]">
              Subterranean Metallurgy & Vitriol Chamber
            </span>
            <div className="text-xs font-[var(--font-space)] text-[#666666]">
              VEIL FLUX: <span className="font-mono tabular-nums text-[#f5f5f5]">{currentVeilStability}%</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] mb-2">
            The Transmutation Crucible
          </h2>

          <p className="text-xs sm:text-sm font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed">
            Select metallurgical powders and bone reagents using strict non-ferrous tongs.
            Bind the synthesis with a recorded Latin incantation to stabilize local veil fluctuations.
          </p>
        </div>

        {/* Reagents Selection List with Sharp 18x18px X-checkboxes */}
        <div className="border border-[#272727] bg-[#121212] p-6 mb-8">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#272727]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#666666] font-[var(--font-space)]">
              Reagents & Alchemical Catalysts ({selectedReagentIds.length} selected)
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-[#b8b8b8] hover:text-[#f5f5f5] font-[var(--font-space)] uppercase cursor-pointer"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-3">
            {CRUCIBLE_REAGENTS.map((reagent) => {
              const isChecked = selectedReagentIds.includes(reagent.id);
              return (
                <div
                  key={reagent.id}
                  onClick={() => toggleReagent(reagent.id)}
                  className={`p-4 border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'border-[#ff7518] bg-[#1a1a1a]'
                      : 'border-[#272727] bg-[#121212] hover:border-[#b8b8b8]'
                  }`}
                >
                  {/* Sharp Square Checkbox: Exactly 18x18px with #FF7518 X-shaped crossmark */}
                  <div
                    role="checkbox"
                    aria-checked={isChecked}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleReagent(reagent.id);
                      }
                    }}
                    className={`w-[18px] h-[18px] shrink-0 border flex items-center justify-center mt-0.5 transition-none ${
                      isChecked
                        ? 'border-[#ff7518] bg-[#1a1a1a]'
                        : 'border-[#272727] bg-[#0e0e0e]'
                    }`}
                  >
                    {isChecked && (
                      <svg
                        viewBox="0 0 12 12"
                        className="w-3 h-3 text-[#ff7518]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="square"
                      >
                        <line x1="2" y1="2" x2="10" y2="10" />
                        <line x1="10" y1="2" x2="2" y2="10" />
                      </svg>
                    )}
                  </div>

                  {/* Reagent Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base text-[#ff7518]">{reagent.symbol}</span>
                        <h4 className="text-sm font-bold text-[#f5f5f5] font-[var(--font-epilogue)]">
                          {reagent.name}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#666666]">
                        {reagent.grade}
                      </span>
                    </div>

                    <p className="text-xs text-[#b8b8b8] font-[var(--font-courier)] leading-relaxed mb-2">
                      {reagent.hazardNote}
                    </p>

                    <div className="flex items-center gap-4 text-[10px] font-[var(--font-space)] text-[#666666]">
                      <span>
                        Dread: <span className="font-mono text-[#ff7518] tabular-nums">{reagent.dreadImpact >= 0 ? '+' : ''}{reagent.dreadImpact}%</span>
                      </span>
                      <span>
                        Veil Stability: <span className="font-mono text-[#f5f5f5] tabular-nums">{reagent.stabilityImpact >= 0 ? '+' : ''}{reagent.stabilityImpact}%</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tactile Incantation Input Field (Boxed #1a1a1a, zero easing, instant #FF7518 border & ember halo) */}
        <div className="border border-[#272727] bg-[#121212] p-6 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#666666] font-[var(--font-space)] mb-2">
            Binding Incantation / Formula Glyph
          </div>
          <p className="text-xs text-[#b8b8b8] font-[var(--font-courier)] mb-3">
            Enter the sacred formula or case code to direct the volatilization stream:
          </p>

          <input
            type="text"
            value={incantation}
            onChange={(e) => {
              audioEngine.playTypewriterKey();
              setIncantation(e.target.value.toUpperCase());
            }}
            placeholder="TYPE LATIN FORMULA OR CIPHER..."
            className="w-full p-3.5 tactile-input text-sm font-bold font-[var(--font-courier)] text-[#f5f5f5] placeholder:text-[#666666]"
          />

          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="text-[11px] text-[#666666] font-[var(--font-space)] uppercase">
              Caution: Excessive vitriol will breach local ward seals.
            </span>

            <button
              onClick={handleIgnite}
              disabled={isIgniting || selectedReagentIds.length === 0}
              className={`btn-blood-velvet px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer ${
                isIgniting ? 'opacity-60 cursor-wait' : ''
              }`}
            >
              <Flame className="w-4 h-4 text-[#ff7518]" />
              <span>{isIgniting ? 'Igniting Reagents...' : 'Apply Brazier Flame'}</span>
            </button>
          </div>
        </div>

        {/* Combustion Output Log */}
        {combustionLog && (
          <div className="parchment-frame mb-8">
            <div className="parchment-frame-inner p-6 bg-[#121212]">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#272727]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ff7518] font-[var(--font-space)]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{combustionLog.title}</span>
                </div>
                <span className="text-[10px] text-[#666666] font-mono">CRUCIBLE #4</span>
              </div>

              <p className="text-xs font-[var(--font-courier)] text-[#e5e2e1] leading-relaxed mb-3">
                {combustionLog.details}
              </p>

              <div className="p-3 bg-[#1a1a1a] border border-[#272727] text-xs font-mono font-bold text-[#ff7518]">
                {combustionLog.metrics}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
