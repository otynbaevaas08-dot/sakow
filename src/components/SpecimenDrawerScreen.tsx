import React, { useState } from 'react';
import { SPECIMEN_ARCHIVE } from '../data/specimensData';
import { SpecimenItem } from '../types/horror';
import { audioEngine } from '../services/audioEngine';
import { Sparkles, Shield, Eye, Layers, Compass, ArrowUpRight, X } from 'lucide-react';

interface SpecimenDrawerProps {
  discoveredRelics: string[];
  onDiscoverRelic: (relicId: string) => void;
}

export const SpecimenDrawerScreen: React.FC<SpecimenDrawerProps> = ({
  discoveredRelics,
  onDiscoverRelic,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSpecimen, setActiveSpecimen] = useState<SpecimenItem | null>(null);
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});

  const categories = ['all', 'Relic', 'Manuscript', 'Anatomical', 'Audio Relic'];

  const filteredSpecimens = SPECIMEN_ARCHIVE.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleCardClick = (item: SpecimenItem) => {
    audioEngine.playStoneThud();
    setActiveSpecimen(item);
    onDiscoverRelic(item.id);
  };

  const toggleTranslation = (id: string) => {
    audioEngine.playTypewriterKey();
    setRevealedTranslations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="border border-[#272727] bg-[#121212] p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-[#272727]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff7518] font-[var(--font-space)] block mb-1">
                Ossuary Reliquary & Case Specimens
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)]">
                The Specimen Drawer
              </h2>
            </div>
            <div className="text-xs font-[var(--font-space)] text-[#b8b8b8]">
              Cataloged Items: <span className="font-mono tabular-nums text-[#f5f5f5] font-bold">{SPECIMEN_ARCHIVE.length}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed max-w-3xl mb-6">
            All recovered artifacts from St. Jude’s Subterranean Crypts are preserved under strict lead-shielded protocols.
            Inspect individual items to verify inscription runes, acoustic anomalies, and pathological tissue residue.
          </p>

          {/* Interactive Filter Tabs (Functional segmented controls, NO candy badges) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#272727]">
            <span className="text-[11px] font-semibold text-[#666666] font-[var(--font-space)] uppercase tracking-wider mr-2">
              Filter:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    audioEngine.playTypewriterKey();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold font-[var(--font-space)] uppercase tracking-wider transition-colors cursor-pointer border ${
                    isActive
                      ? 'bg-[#1a1a1a] text-[#f5f5f5] border-[#b00020] shadow-[0_0_12px_rgba(176,0,32,0.25)]'
                      : 'bg-[#121212] text-[#b8b8b8] border-[#272727] hover:border-[#b8b8b8]'
                  }`}
                >
                  {cat === 'all' ? 'All Archive' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ominous Aura Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredSpecimens.map((specimen) => {
            const isCrimson = specimen.auraType === 'crimson';
            const isDiscovered = discoveredRelics.includes(specimen.id);

            return (
              <div
                key={specimen.id}
                onClick={() => handleCardClick(specimen)}
                className={`border border-[#272727] bg-[#121212] p-5 cursor-pointer card-aura-hover relative flex flex-col justify-between ${
                  isCrimson ? 'hover:shadow-[0_0_28px_rgba(176,0,32,0.28)]' : 'hover:shadow-[0_0_24px_rgba(255,117,24,0.22)]'
                }`}
              >
                <div>
                  {/* Top metadata strip: Accession code & Category */}
                  <div className="flex items-center justify-between text-[11px] font-[var(--font-space)] text-[#666666] pb-2.5 mb-3 border-b border-[#272727]">
                    <span className="tracking-widest uppercase font-mono">{specimen.accessionNumber}</span>
                    <span className="text-[#b8b8b8] uppercase tracking-wider">{specimen.category}</span>
                  </div>

                  {/* Card Title (Epilogue headline) */}
                  <h3 className="text-lg font-bold text-[#f5f5f5] font-[var(--font-epilogue)] tracking-tight mb-2">
                    {specimen.name}
                  </h3>

                  {/* Date & Origin */}
                  <div className="text-[11px] font-[var(--font-space)] text-[#ff7518] mb-3">
                    Origin Date: <span className="font-mono">{specimen.originDate}</span>
                  </div>

                  {/* Supporting Inspection Lore (Courier Prime) */}
                  <p className="text-xs text-[#b8b8b8] font-[var(--font-courier)] leading-relaxed mb-4">
                    {specimen.shortDescription}
                  </p>

                  {/* Latin Inscription Teaser */}
                  <div className="p-2.5 bg-[#1a1a1a] border border-[#272727] text-[11px] font-[var(--font-courier)] text-[#e5e2e1] italic mb-4">
                    "{specimen.inscribedLatin}"
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="pt-3 border-t border-[#272727] flex items-center justify-between text-xs font-[var(--font-space)]">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isCrimson ? 'text-[#b00020]' : 'text-[#ff7518]'}`}>
                    {isCrimson ? 'Crimson Dread Aura' : 'Ember Resonance'}
                  </span>
                  <span className="flex items-center gap-1 text-[#b8b8b8] hover:text-[#f5f5f5]">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Forensic Inspection Modal (Parchment & Dungeon Double Hairline Frame) */}
        {activeSpecimen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
            <div className="parchment-frame max-w-2xl w-full my-8">
              <div className="parchment-frame-inner p-6 sm:p-8 bg-[#121212]">
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272727]">
                  <div className="text-xs font-bold font-[var(--font-space)] tracking-widest text-[#ff7518] uppercase">
                    Forensic Examination Ledger · {activeSpecimen.accessionNumber}
                  </div>
                  <button
                    onClick={() => {
                      audioEngine.playTypewriterKey();
                      setActiveSpecimen(null);
                    }}
                    className="text-[#666666] hover:text-[#f5f5f5] text-xs font-[var(--font-space)] uppercase cursor-pointer"
                  >
                    [Close]
                  </button>
                </div>

                {/* Title & Category */}
                <h3 className="text-2xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] mb-2">
                  {activeSpecimen.name}
                </h3>
                <div className="text-xs text-[#b8b8b8] font-[var(--font-space)] mb-5">
                  Category: <span className="text-[#f5f5f5]">{activeSpecimen.category}</span>
                  <span aria-hidden="true" className="mx-2 text-[#666666]">·</span>
                  Origin: <span className="text-[#ff7518] font-mono">{activeSpecimen.originDate}</span>
                </div>

                {/* Containment Protocol */}
                <div className="p-3.5 bg-[#1a1a1a] border border-[#272727] text-xs font-[var(--font-courier)] text-[#b8b8b8] mb-5 leading-relaxed">
                  <span className="font-bold font-[var(--font-space)] text-[#b00020] uppercase tracking-wider block mb-1">
                    Containment Protocol:
                  </span>
                  <p>{activeSpecimen.containmentProtocol}</p>
                </div>

                {/* Forensic Observation */}
                <div className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#666666] font-[var(--font-space)] mb-2">
                    Pathological & Forensic Observation
                  </div>
                  <p className="text-xs font-[var(--font-courier)] text-[#e5e2e1] leading-relaxed">
                    {activeSpecimen.forensicObservation}
                  </p>
                </div>

                {/* Latin Inscription Translation Box */}
                <div className="p-4 border border-[#272727] bg-[#1a1a1a] mb-5">
                  <div className="text-xs font-bold text-[#666666] font-[var(--font-space)] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Etched Relic Inscription</span>
                    <button
                      onClick={() => toggleTranslation(activeSpecimen.id)}
                      className="text-[#ff7518] hover:underline cursor-pointer text-[11px]"
                    >
                      {revealedTranslations[activeSpecimen.id] ? 'Hide Translation' : 'Decode Latin'}
                    </button>
                  </div>
                  <div className="text-sm font-bold font-[var(--font-courier)] text-[#f5f5f5] italic mb-1">
                    "{activeSpecimen.inscribedLatin}"
                  </div>
                  {revealedTranslations[activeSpecimen.id] && (
                    <div className="mt-2 pt-2 border-t border-[#272727] text-xs font-[var(--font-courier)] text-[#ff7518]">
                      Translation: {activeSpecimen.englishTranslation}
                    </div>
                  )}
                </div>

                {/* Physical Specifications Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs font-[var(--font-courier)] text-[#b8b8b8] border border-[#272727] p-3.5 bg-[#161616] mb-6">
                  <div>
                    <span className="text-[#666666] font-[var(--font-space)] block text-[10px] uppercase">Composition:</span>
                    <span className="text-[#f5f5f5]">{activeSpecimen.physicalProperties.material}</span>
                  </div>
                  <div>
                    <span className="text-[#666666] font-[var(--font-space)] block text-[10px] uppercase">Mass:</span>
                    <span className="text-[#f5f5f5] font-mono tabular-nums">{activeSpecimen.physicalProperties.weight}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-[#272727]">
                    <span className="text-[#666666] font-[var(--font-space)] block text-[10px] uppercase">Cold Radiance Signature:</span>
                    <span className="text-[#ff7518]">{activeSpecimen.physicalProperties.radianceLevel}</span>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[#272727]">
                  <button
                    onClick={() => {
                      audioEngine.playOccultBell();
                      toggleTranslation(activeSpecimen.id);
                    }}
                    className="btn-obsidian-ghost px-4 py-2 text-xs font-semibold cursor-pointer"
                  >
                    Resonate Blade
                  </button>
                  <button
                    onClick={() => {
                      audioEngine.playTypewriterKey();
                      setActiveSpecimen(null);
                    }}
                    className="btn-blood-velvet px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    Archive Findings
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
