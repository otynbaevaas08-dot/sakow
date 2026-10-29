import React, { useState } from 'react';
import { InvestigatorState } from '../types/horror';
import { audioEngine } from '../services/audioEngine';
import { FileText, KeyRound, Sparkles, Plus, Trash2, Download, BookOpen } from 'lucide-react';

interface DossierLogProps {
  state: InvestigatorState;
  onAddNote: (note: string) => void;
  onClearNotes: () => void;
  onResetInvestigation: () => void;
}

export const DossierLogScreen: React.FC<DossierLogProps> = ({
  state,
  onAddNote,
  onClearNotes,
  onResetInvestigation,
}) => {
  const [newNoteText, setNewNoteText] = useState<string>('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    audioEngine.playTypewriterKey();
    onAddNote(newNoteText.trim());
    setNewNoteText('');
  };

  const handleExportDossier = () => {
    audioEngine.playTypewriterKey();
    const exportData = {
      agency: 'BLACKWELL OSSUARY INVESTIGATION DIVISION',
      timestamp: new Date().toISOString(),
      dread: state.dread,
      sanity: state.sanity,
      veilStability: state.veilStability,
      ciphersDecoded: state.solvedCiphers,
      cluesCataloged: state.unlockedClues,
      relicsInspected: state.discoveredRelics,
      investigatorNotes: state.investigatorNotes,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Blackwell_Dossier_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] py-8 px-4 sm:px-6">
      <div className="max-w-[760px] mx-auto">
        {/* Header */}
        <div className="border border-[#272727] bg-[#121212] p-6 mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272727]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff7518] font-[var(--font-space)]">
              Forensic Pathology & Clue Archives
            </span>
            <div className="flex items-center gap-3 text-xs font-[var(--font-space)] text-[#b8b8b8]">
              <span>Case Status:</span>
              <span className="text-[#ff7518] font-bold">CONFIDENTIAL</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] mb-2">
            The Investigator’s Dossier
          </h2>

          <p className="text-xs sm:text-sm font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed">
            Forensic logs, witness testimonies, deciphered lock chambers, and field observations
            compiled during exploration of St. Jude's subterranean ossuary vaults.
          </p>
        </div>

        {/* Cataloged Evidence Strip */}
        <div className="border border-[#272727] bg-[#121212] p-6 mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272727] text-xs font-[var(--font-space)]">
            <div className="flex items-center gap-2 text-[#666666] uppercase font-bold tracking-wider">
              <Sparkles className="w-4 h-4 text-[#ff7518]" />
              <span>Cataloged Evidence Records</span>
            </div>
            <span className="font-mono tabular-nums text-[#f5f5f5] font-bold">
              {state.unlockedClues.length} Discovered
            </span>
          </div>

          {state.unlockedClues.length === 0 ? (
            <p className="text-xs font-[var(--font-courier)] text-[#666666] italic py-4 text-center">
              No evidence slips logged yet. Explore the Chronicles and examine artifacts to catalog clues.
            </p>
          ) : (
            <div className="space-y-3">
              {state.unlockedClues.map((clue, idx) => (
                <div
                  key={idx}
                  className="p-3.5 border border-[#272727] bg-[#1a1a1a] text-xs font-[var(--font-courier)] text-[#e5e2e1]"
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] text-[#666666] font-[var(--font-space)] uppercase tracking-wider mb-1">
                    <span>Evidence Record #0{idx + 1}</span>
                    <span className="text-[#ff7518]">VERIFIED</span>
                  </div>
                  <p className="font-bold text-[#f5f5f5] mb-1">{clue}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deciphered Locks Strip */}
        <div className="border border-[#272727] bg-[#121212] p-6 mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272727] text-xs font-[var(--font-space)]">
            <div className="flex items-center gap-2 text-[#666666] uppercase font-bold tracking-wider">
              <KeyRound className="w-4 h-4 text-[#ff7518]" />
              <span>Decoded Hydraulic Tumblers</span>
            </div>
            <span className="font-mono tabular-nums text-[#f5f5f5] font-bold">
              {state.solvedCiphers.length} Solved
            </span>
          </div>

          {state.solvedCiphers.length === 0 ? (
            <p className="text-xs font-[var(--font-courier)] text-[#666666] italic py-4 text-center">
              All subterranean lock chambers currently sealed. Navigate to the Cipher Room to solve them.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {state.solvedCiphers.map((cipherId) => (
                <div
                  key={cipherId}
                  className="p-3 border border-[#272727] bg-[#1a1a1a] text-xs font-[var(--font-courier)]"
                >
                  <span className="text-[10px] text-[#ff7518] font-[var(--font-space)] uppercase block mb-1">
                    Unlocked Chamber
                  </span>
                  <span className="font-bold text-[#f5f5f5] font-mono tracking-widest uppercase">
                    {cipherId}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Investigator Field Notes Notepad */}
        <div className="border border-[#272727] bg-[#121212] p-6 mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272727]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#666666] font-[var(--font-space)] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#b00020]" />
              <span>Investigator's Typewritten Field Notes</span>
            </div>
            {state.investigatorNotes.length > 0 && (
              <button
                onClick={() => {
                  audioEngine.playTypewriterKey();
                  onClearNotes();
                }}
                className="text-[11px] text-[#666666] hover:text-[#b00020] uppercase font-[var(--font-space)] cursor-pointer"
              >
                Clear Notes
              </button>
            )}
          </div>

          {/* Form to add note */}
          <form onSubmit={handleAddNote} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => {
                  audioEngine.playTypewriterKey();
                  setNewNoteText(e.target.value);
                }}
                placeholder="TYPE OBSIDIAN FINDING OR FORENSIC NOTE..."
                className="flex-1 p-3 tactile-input text-xs font-[var(--font-courier)] text-[#f5f5f5] placeholder:text-[#666666]"
              />
              <button
                type="submit"
                className="btn-blood-velvet px-4 text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Strike Note</span>
              </button>
            </div>
          </form>

          {/* List of notes */}
          {state.investigatorNotes.length === 0 ? (
            <p className="text-xs font-[var(--font-courier)] text-[#666666] italic py-2 text-center">
              Field notepad empty. Enter observation findings above.
            </p>
          ) : (
            <div className="space-y-3">
              {state.investigatorNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-[#272727] bg-[#161616] text-xs font-[var(--font-courier)] text-[#e5e2e1] flex items-start gap-3"
                >
                  <span className="font-mono text-[#666666] text-[11px] shrink-0 pt-0.5">
                    0{idx + 1}.
                  </span>
                  <p className="flex-1 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Management & Export Footer */}
        <div className="border border-[#272727] bg-[#121212] p-5 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleExportDossier}
            className="btn-obsidian-ghost px-4 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#ff7518]" />
            <span>Export Case Dossier (JSON)</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playStoneThud();
              if (window.confirm('Reset all case progression, ciphers, and notes?')) {
                onResetInvestigation();
              }
            }}
            className="text-xs text-[#666666] hover:text-[#b00020] font-[var(--font-space)] uppercase tracking-wider cursor-pointer"
          >
            Reset Investigation
          </button>
        </div>
      </div>
    </div>
  );
};
