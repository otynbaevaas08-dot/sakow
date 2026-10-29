import React, { useState, useRef, useEffect } from 'react';
import { CIPHER_PUZZLES } from '../data/puzzleData';
import { CipherPuzzle } from '../types/horror';
import { audioEngine } from '../services/audioEngine';
import { KeyRound, ShieldAlert, Sparkles, CheckCircle2, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';

interface TactileCipherProps {
  solvedCiphers: string[];
  onSolveCipher: (cipherId: string, evidenceTitle: string) => void;
  onConsumeSanity: (amount: number) => void;
}

export const TactileCipherScreen: React.FC<TactileCipherProps> = ({
  solvedCiphers,
  onSolveCipher,
  onConsumeSanity,
}) => {
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number>(0);
  const puzzle: CipherPuzzle = CIPHER_PUZZLES[selectedPuzzleIndex];

  // Array of inputs for each cell (48x56px)
  const [inputs, setInputs] = useState<string[]>(() =>
    Array(puzzle.codeLength).fill('')
  );
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'success' | 'failure';
    message: string;
  }>({ status: 'idle', message: '' });

  const [hintRevealed, setHintRevealed] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset inputs when switching puzzle
  useEffect(() => {
    setInputs(Array(puzzle.codeLength).fill(''));
    setFeedback({ status: 'idle', message: '' });
    setHintRevealed(false);
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 50);
  }, [selectedPuzzleIndex, puzzle.codeLength]);

  const isSolved = solvedCiphers.includes(puzzle.id);

  const handleCellChange = (index: number, val: string) => {
    // Take only the last typed character and uppercase it
    const char = val.slice(-1).toUpperCase();
    audioEngine.playTypewriterKey();

    const newInputs = [...inputs];
    newInputs[index] = char;
    setInputs(newInputs);

    // Auto advance
    if (char && index < puzzle.codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      audioEngine.playTypewriterKey();
      if (!inputs[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < puzzle.codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      handleSubmitAttempt();
    }
  };

  const handleVirtualKey = (char: string) => {
    audioEngine.playTypewriterKey();
    // Find first empty cell, or replace active/last
    const firstEmptyIndex = inputs.findIndex((c) => c === '');
    const targetIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : inputs.length - 1;

    const newInputs = [...inputs];
    newInputs[targetIndex] = char.toUpperCase();
    setInputs(newInputs);

    if (targetIndex < puzzle.codeLength - 1) {
      inputRefs.current[targetIndex + 1]?.focus();
    } else {
      inputRefs.current[targetIndex]?.focus();
    }
  };

  const handleClear = () => {
    audioEngine.playTypewriterKey();
    setInputs(Array(puzzle.codeLength).fill(''));
    setFeedback({ status: 'idle', message: '' });
    inputRefs.current[0]?.focus();
  };

  const handleSubmitAttempt = () => {
    const enteredCode = inputs.join('').toUpperCase();
    if (enteredCode.length < puzzle.codeLength) {
      setFeedback({
        status: 'failure',
        message: `Incomplete cipher: ${enteredCode.length} of ${puzzle.codeLength} cells aligned.`,
      });
      audioEngine.playStoneThud();
      return;
    }

    if (enteredCode === puzzle.targetSolution.toUpperCase()) {
      audioEngine.playCipherSuccess();
      setFeedback({
        status: 'success',
        message: 'TUMBLER ALIGNMENT VERIFIED. LOCK COMPARTMENT DEPRESSED.',
      });
      onSolveCipher(puzzle.id, puzzle.unlockedEvidence.title);
    } else {
      audioEngine.playStoneThud();
      setFeedback({
        status: 'failure',
        message: 'HARMONIC DISSONANCE: Cylinders jammed. Code rejected.',
      });
    }
  };

  const handleRevealHint = () => {
    if (hintRevealed) return;
    audioEngine.playTypewriterKey();
    onConsumeSanity(puzzle.sanityCostForHint);
    setHintRevealed(true);
  };

  // Keyboard helper alphabet / numbers for virtual clicks
  const virtualKeys = puzzle.id === 'cipher_transit'
    ? ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    : ['A', 'C', 'E', 'H', 'I', 'L', 'M', 'N', 'O', 'R', 'S', 'T', 'V'];

  return (
    <div className="w-full min-h-[calc(100vh-100px)] py-8 px-4 sm:px-6">
      <div className="max-w-[760px] mx-auto">
        {/* Puzzle Selector Bar */}
        <div className="border border-[#272727] bg-[#121212] p-4 mb-8">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#272727] text-xs font-[var(--font-space)]">
            <span className="text-[#666666] tracking-wider uppercase font-semibold">Active Lock Chambers</span>
            <div className="flex items-center gap-2 text-[#b8b8b8]">
              <span>Chambers:</span>
              <span className="font-mono tabular-nums">{CIPHER_PUZZLES.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CIPHER_PUZZLES.map((p, idx) => {
              const isSelected = idx === selectedPuzzleIndex;
              const hasSolved = solvedCiphers.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    audioEngine.playTypewriterKey();
                    setSelectedPuzzleIndex(idx);
                  }}
                  className={`p-3 text-left border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#ff7518] bg-[#1a1a1a] shadow-[0_0_18px_rgba(255,117,24,0.22)]'
                      : 'border-[#272727] bg-[#121212] text-[#b8b8b8] hover:border-[#b8b8b8]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold font-[var(--font-space)] uppercase tracking-wider text-[#666666]">
                      Lock 0{idx + 1}
                    </span>
                    {hasSolved && <CheckCircle2 className="w-3 h-3 text-[#ff7518]" />}
                  </div>
                  <div className="text-xs font-bold text-[#f5f5f5] font-[var(--font-epilogue)] truncate">
                    {p.title}
                  </div>
                  <div className="text-[10px] text-[#666666] font-mono tabular-nums mt-0.5">
                    {p.codeLength} Cells
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Tactile Riddle Input Chamber */}
        <div className="border border-[#272727] bg-[#121212] p-6 sm:p-10 mb-8 relative">
          <div className="border-b border-[#272727] pb-5 mb-6">
            <div className="flex items-center justify-between gap-2 text-xs font-[var(--font-space)] text-[#666666] mb-2">
              <span className="tracking-widest uppercase">{puzzle.caseOrigin}</span>
              {isSolved ? (
                <span className="text-[#ff7518] font-bold tracking-widest uppercase">
                  UNCOUPLED & ARCHIVED
                </span>
              ) : (
                <span className="text-[#b00020] font-bold tracking-widest uppercase">
                  ACTIVE HYDRAULIC LOCK
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] tracking-tight mb-3">
              {puzzle.title}
            </h2>

            <p className="text-sm font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed italic">
              "{puzzle.riddleProse}"
            </p>
          </div>

          {/* Individual Bordered Cells (48x56px strictly as defined in spec) */}
          <div className="my-8">
            <div className="text-xs font-bold uppercase tracking-wider font-[var(--font-space)] text-[#666666] mb-3 text-center">
              Monospaced Tumbler Chamber ({puzzle.codeLength} Digit / Letter Matrix)
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {inputs.map((val, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleCellChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  aria-label={`Tumbler cell ${idx + 1} of ${puzzle.codeLength}`}
                  className="w-12 h-14 sm:w-[48px] sm:h-[56px] text-center text-xl font-bold font-[var(--font-courier)] text-[#f5f5f5] bg-[#1a1a1a] border border-[#272727] focus:border-[#ff7518] focus:shadow-[0_0_16px_rgba(255,117,24,0.35)] outline-none transition-none cursor-text select-all"
                  style={{ letterSpacing: '0.15em' }}
                />
              ))}
            </div>

            <p className="text-center text-[11px] text-[#666666] font-[var(--font-courier)] mt-3">
              Direct keyboard entry enabled. Use backspace to retreat or click below.
            </p>
          </div>

          {/* Tactile On-Screen Character Striker Buttons */}
          <div className="mb-8 pt-4 border-t border-[#272727]">
            <div className="text-[10px] font-bold uppercase tracking-wider font-[var(--font-space)] text-[#666666] mb-2 text-center">
              Mechanical Glyph Keys
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {virtualKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => handleVirtualKey(key)}
                  className="w-9 h-10 sm:w-10 sm:h-11 bg-[#1a1a1a] border border-[#272727] text-sm font-bold font-[var(--font-courier)] text-[#e5e2e1] hover:border-[#ff7518] hover:text-[#ff7518] transition-colors cursor-pointer"
                >
                  {key}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="px-3 h-10 sm:h-11 bg-[#121212] border border-[#272727] text-xs font-semibold font-[var(--font-space)] text-[#b8b8b8] hover:border-[#b00020] hover:text-[#f5f5f5] uppercase transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Feedback & Error State Output */}
          {feedback.message && (
            <div
              className={`p-4 mb-6 border text-xs font-[var(--font-courier)] leading-relaxed ${
                feedback.status === 'success'
                  ? 'border-[#ff7518] bg-[#1a1a1a] text-[#ff7518] shadow-[0_0_20px_rgba(255,117,24,0.2)]'
                  : 'border-[#b00020] bg-[#1a1a1a] text-[#b00020] shadow-[0_0_20px_rgba(176,0,32,0.25)]'
              }`}
            >
              <div className="font-bold font-[var(--font-space)] uppercase mb-1">
                {feedback.status === 'success' ? 'Verification Success' : 'Alignment Fault'}
              </div>
              <p>{feedback.message}</p>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#272727]">
            <button
              onClick={handleRevealHint}
              disabled={hintRevealed}
              className={`btn-obsidian-ghost px-4 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer ${
                hintRevealed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#ff7518]" />
              <span>
                {hintRevealed ? 'Clue Decoded' : `Consult Clue (-${puzzle.sanityCostForHint}% Sanity)`}
              </span>
            </button>

            <button
              onClick={handleSubmitAttempt}
              className="btn-blood-velvet px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Engage Hydraulic Pins</span>
            </button>
          </div>

          {/* Hint Disclosure */}
          {hintRevealed && (
            <div className="mt-4 p-4 border border-[#272727] bg-[#1a1a1a] text-xs font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed">
              <span className="font-bold text-[#ff7518] font-[var(--font-space)] uppercase tracking-wider block mb-1">
                Field Inquest Clue:
              </span>
              <p>{puzzle.hint}</p>
            </div>
          )}

          {/* Unlocked Forensic Evidence Compartment (Shown when solved) */}
          {isSolved && (
            <div className="mt-8 parchment-frame">
              <div className="parchment-frame-inner p-6 bg-[#121212]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ff7518] font-[var(--font-space)] mb-2">
                  <Sparkles className="w-4 h-4 text-[#ff7518]" />
                  <span>{puzzle.unlockedEvidence.title}</span>
                </div>
                <p className="text-xs font-[var(--font-courier)] text-[#e5e2e1] leading-relaxed mb-4">
                  {puzzle.unlockedEvidence.transcript}
                </p>
                <div className="p-3 border border-[#272727] bg-[#1a1a1a] text-xs font-[var(--font-courier)] text-[#ff7518] font-bold">
                  {puzzle.unlockedEvidence.revelation}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
