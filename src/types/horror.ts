export type ScreenId = 'chronicles' | 'cipher' | 'specimens' | 'crucible' | 'dossier';

export interface ChoiceOption {
  id: string;
  label: string;
  text: string;
  consequenceText?: string;
  dreadDelta?: number;
  sanityDelta?: number;
  unlocksClueId?: string;
  nextSceneId: string;
}

export interface StoryScene {
  id: string;
  title: string;
  timestamp: string;
  location: string;
  body: string[];
  forensicNote?: string;
  choices: ChoiceOption[];
  clueDiscovered?: {
    id: string;
    title: string;
    description: string;
  };
}

export interface InvestigationCase {
  id: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  date: string;
  subject: string;
  status: 'OPEN' | 'ARCHIVED' | 'CONFIDENTIAL';
  summary: string;
  scenes: Record<string, StoryScene>;
  startSceneId: string;
}

export interface CipherPuzzle {
  id: string;
  title: string;
  codeLength: number;
  targetSolution: string;
  caseOrigin: string;
  riddleProse: string;
  hint: string;
  sanityCostForHint: number;
  unlockedEvidence: {
    title: string;
    transcript: string;
    revelation: string;
  };
}

export interface SpecimenItem {
  id: string;
  accessionNumber: string;
  name: string;
  category: 'Relic' | 'Manuscript' | 'Anatomical' | 'Audio Relic';
  originDate: string;
  containmentProtocol: string;
  auraType: 'crimson' | 'ember';
  visualSymbol: string;
  shortDescription: string;
  forensicObservation: string;
  inscribedLatin: string;
  englishTranslation: string;
  physicalProperties: {
    material: string;
    weight: string;
    condition: string;
    radianceLevel: string;
  };
}

export interface CrucibleReagent {
  id: string;
  symbol: string;
  name: string;
  grade: string;
  element: string;
  hazardNote: string;
  affinity: 'blood' | 'obsidian' | 'ember' | 'void';
  dreadImpact: number;
  stabilityImpact: number;
}

export interface InvestigatorState {
  dread: number;        // 0 to 100
  sanity: number;       // 0 to 100
  veilStability: number;// 0 to 100
  solvedCiphers: string[];
  unlockedClues: string[];
  discoveredRelics: string[];
  activeCaseId: string;
  currentSceneId: string;
  investigatorNotes: string[];
}
