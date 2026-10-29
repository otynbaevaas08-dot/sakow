import React, { useState } from 'react';
import { CASE_FILES } from '../data/caseData';
import { ChoiceOption, InvestigationCase, StoryScene } from '../types/horror';
import { audioEngine } from '../services/audioEngine';
import { ChevronRight, FileText, Compass, AlertTriangle, BookOpen, Clock, ArrowRight } from 'lucide-react';

interface CaseChroniclesProps {
  activeCaseId: string;
  currentSceneId: string;
  onSelectCase: (caseId: string) => void;
  onMakeChoice: (choice: ChoiceOption) => void;
  onNavigateToCipher: () => void;
}

export const CaseChroniclesScreen: React.FC<CaseChroniclesProps> = ({
  activeCaseId,
  currentSceneId,
  onSelectCase,
  onMakeChoice,
  onNavigateToCipher,
}) => {
  const [selectedCase, setSelectedCase] = useState<InvestigationCase>(() => {
    return CASE_FILES.find((c) => c.id === activeCaseId) || CASE_FILES[0];
  });

  const [activeChoiceId, setActiveChoiceId] = useState<string | null>(null);
  const [showDossierModal, setShowDossierModal] = useState<boolean>(false);

  const currentScene: StoryScene =
    selectedCase.scenes[currentSceneId] ||
    selectedCase.scenes[selectedCase.startSceneId] ||
    Object.values(selectedCase.scenes)[0];

  const handleCaseChange = (c: InvestigationCase) => {
    audioEngine.playTypewriterKey();
    setSelectedCase(c);
    onSelectCase(c.id);
  };

  const handleChoiceClick = (choice: ChoiceOption) => {
    setActiveChoiceId(choice.id);
    audioEngine.playTypewriterKey();
    if ((choice.dreadDelta ?? 0) > 10) {
      audioEngine.playHeartbeat();
    }
    setTimeout(() => {
      onMakeChoice(choice);
      setActiveChoiceId(null);
    }, 180);
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] py-8 px-4 sm:px-6">
      {/* Outer Restrictive Centered Containment (760px maximum reading width) */}
      <div className="max-w-[760px] mx-auto">
        {/* Case Dossier Navigation Strip */}
        <div className="border border-[#272727] bg-[#121212] p-4 mb-8">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#272727] text-xs font-[var(--font-space)]">
            <span className="text-[#666666] tracking-wider uppercase font-semibold">Archived Dossiers</span>
            <div className="flex items-center gap-2 text-[#b8b8b8]">
              <span>Index</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{CASE_FILES.length} Files</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CASE_FILES.map((c) => {
              const isCurrent = c.id === selectedCase.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleCaseChange(c)}
                  className={`text-left p-3.5 border transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-[#b00020] bg-[#1a1a1a] shadow-[0_0_20px_rgba(176,0,32,0.25)]'
                      : 'border-[#272727] bg-[#121212] hover:border-[#b8b8b8] text-[#b8b8b8]'
                  }`}
                >
                  <div className="text-[10px] tracking-widest font-[var(--font-space)] text-[#666666] uppercase mb-1">
                    {c.caseNumber}
                  </div>
                  <h4 className="text-sm font-bold text-[#f5f5f5] font-[var(--font-epilogue)] mb-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-[#b8b8b8] font-[var(--font-courier)] line-clamp-2">
                    {c.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Narrative Reading Artifact Container */}
        <article className="border border-[#272727] bg-[#121212] p-6 sm:p-10 mb-8 relative">
          {/* Case Metadata Header */}
          <div className="border-b border-[#272727] pb-5 mb-7">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-[var(--font-space)] text-[#666666] mb-2">
              <span className="tracking-widest uppercase">{selectedCase.caseNumber}</span>
              <div className="flex items-center gap-3">
                <span className="text-[#ff7518] tracking-widest">{selectedCase.date}</span>
                <span aria-hidden="true">·</span>
                <span className="tracking-widest uppercase text-[#b00020]">{selectedCase.status}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] tracking-tight mb-2">
              {currentScene.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-[var(--font-space)] text-[#b8b8b8]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#ff7518]" />
                <span className="font-mono tabular-nums">{currentScene.timestamp}</span>
              </span>
              <span aria-hidden="true" className="text-[#666666]">·</span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#b00020]" />
                <span>{currentScene.location}</span>
              </span>
            </div>
          </div>

          {/* Narrative Body (Courier Prime, generous line height 1.6x+) */}
          <div className="space-y-5 text-base text-[#e5e2e1] font-[var(--font-courier)] leading-[1.8] mb-8">
            {currentScene.body.map((paragraph, index) => (
              <p key={index} className="tracking-wide">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Forensic Coroner Note Box */}
          {currentScene.forensicNote && (
            <div className="my-7 p-4 border border-[#272727] bg-[#1a1a1a] text-xs font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed">
              <div className="text-[10px] font-bold font-[var(--font-space)] uppercase tracking-wider text-[#ff7518] mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Forensic Pathology Log</span>
              </div>
              <p>{currentScene.forensicNote}</p>
            </div>
          )}

          {/* Branching Story Choice Nodes (Styled as Typewriter Strike Plates) */}
          <div className="mt-8 pt-6 border-t border-[#272727]">
            <div className="text-xs font-bold uppercase tracking-widest text-[#666666] font-[var(--font-space)] mb-4">
              Investigator Actions & Choice Vectors
            </div>

            <div className="space-y-3">
              {currentScene.choices.map((choice) => {
                const isSelected = activeChoiceId === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceClick(choice)}
                    className={`w-full text-left p-4 border transition-all cursor-pointer relative bg-[#121212] ${
                      isSelected
                        ? 'border-[#ff7518] bg-[#1a1a1a] border-l-[3px] border-l-[#b00020]'
                        : 'border-[#272727] hover:border-[#b00020] hover:border-l-[3px] hover:border-l-[#b00020]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#ff7518] font-[var(--font-space)]">
                        {choice.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#666666]" />
                    </div>
                    <p className="text-sm font-[var(--font-courier)] text-[#f5f5f5] leading-relaxed">
                      {choice.text}
                    </p>

                    {/* Metadata tags: Dread/Sanity impact */}
                    <div className="mt-2.5 flex items-center gap-4 text-[11px] font-[var(--font-space)] text-[#666666]">
                      {choice.dreadDelta && (
                        <span>
                          Dread Impact: <span className="text-[#ff7518] tabular-nums font-mono">+{choice.dreadDelta}%</span>
                        </span>
                      )}
                      {choice.sanityDelta && (
                        <span>
                          Sanity Cost: <span className="text-[#b00020] tabular-nums font-mono">{choice.sanityDelta}%</span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Footer inside card */}
          <div className="mt-8 pt-5 border-t border-[#272727] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => {
                audioEngine.playTypewriterKey();
                setShowDossierModal(true);
              }}
              className="btn-obsidian-ghost px-4 py-2 text-xs font-semibold cursor-pointer"
            >
              Case Abstract
            </button>

            <button
              onClick={() => {
                audioEngine.playTypewriterKey();
                onNavigateToCipher();
              }}
              className="btn-blood-velvet px-4 py-2 text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <span>Examine Cistern Locks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>

        {/* Parchment Double Hairline Frame Modal (Case Abstract) */}
        {showDossierModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="parchment-frame max-w-lg w-full">
              <div className="parchment-frame-inner p-6 sm:p-8 bg-[#121212]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272727]">
                  <div className="text-xs font-bold font-[var(--font-space)] tracking-widest text-[#ff7518] uppercase">
                    Formal Inquest Summary
                  </div>
                  <button
                    onClick={() => {
                      audioEngine.playTypewriterKey();
                      setShowDossierModal(false);
                    }}
                    className="text-[#666666] hover:text-[#f5f5f5] text-xs font-[var(--font-space)] uppercase cursor-pointer"
                  >
                    [Close]
                  </button>
                </div>

                <h3 className="text-xl font-bold text-[#f5f5f5] font-[var(--font-epilogue)] mb-2">
                  {selectedCase.title}
                </h3>
                <div className="text-xs text-[#b8b8b8] font-[var(--font-space)] mb-4">
                  Subject: <span className="text-[#f5f5f5]">{selectedCase.subject}</span>
                </div>

                <div className="space-y-4 text-xs font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed mb-6">
                  <p>{selectedCase.summary}</p>
                  <p className="border-t border-[#272727] pt-3 text-[11px] text-[#666666]">
                    WARNING: This transcript contains forensic descriptions of anatomical displacement.
                    All pages transcribed under direct observation of the High Bailiff.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      audioEngine.playTypewriterKey();
                      setShowDossierModal(false);
                    }}
                    className="btn-blood-velvet px-4 py-2 text-xs font-bold cursor-pointer"
                  >
                    Acknowledge Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
