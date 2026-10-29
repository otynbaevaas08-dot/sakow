import { CrucibleReagent } from '../types/horror';

export const CRUCIBLE_REAGENTS: CrucibleReagent[] = [
  {
    id: 'reagent_bone_ash',
    symbol: '🜂',
    name: 'Calcined Human Bone Ash',
    grade: 'Pharmacopeia Grade IV',
    element: 'Phosphorus / Calcium',
    hazardNote: 'Releases pale violet luminescence upon contact with cold nitric acid.',
    affinity: 'ember',
    dreadImpact: 6,
    stabilityImpact: -4
  },
  {
    id: 'reagent_vitriol',
    symbol: '🜄',
    name: 'Distilled Vitriolic Acid',
    grade: 'Oleum 100% Purity',
    element: 'Sulfur Di-hydrate',
    hazardNote: 'Dissolves iron locks and brass dials without producing smoke.',
    affinity: 'blood',
    dreadImpact: 12,
    stabilityImpact: -8
  },
  {
    id: 'reagent_black_salt',
    symbol: '🜍',
    name: 'Subterranean Well Salt',
    grade: 'Excavated from Ward 7 Cistern',
    element: 'Halite / Meteoric Carbon',
    hazardNote: 'Absorbs ambient room warmth. Crystals turn dark violet under moonlight.',
    affinity: 'void',
    dreadImpact: 18,
    stabilityImpact: -15
  },
  {
    id: 'reagent_lead_foil',
    symbol: '♄',
    name: 'Cold-Hammered Derbyshire Lead',
    grade: 'Church Bell Tower Flashing (1740)',
    element: 'Plumbum 99.8%',
    hazardNote: 'Blocks all spiritual and magnetic flux. Damps auditory resonance.',
    affinity: 'obsidian',
    dreadImpact: -5,
    stabilityImpact: 14
  },
  {
    id: 'reagent_silver_chloride',
    symbol: '☽',
    name: 'Precipitated Silver Chloride',
    grade: 'Sacramental Paten Scrapings',
    element: 'Argentum / Halogen',
    hazardNote: 'Blackens rapidly in the presence of unholy or decaying humors.',
    affinity: 'ember',
    dreadImpact: -8,
    stabilityImpact: 18
  },
  {
    id: 'reagent_cinnabar',
    symbol: '☿',
    name: 'Ground Alchemical Cinnabar',
    grade: 'Red Mercury Sulfide',
    element: 'Hydrargyrum / Sulfur',
    hazardNote: 'Causes irreversible mental clarity followed by catatonic paralysis.',
    affinity: 'blood',
    dreadImpact: 22,
    stabilityImpact: -20
  }
];
