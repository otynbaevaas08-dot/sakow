import { CipherPuzzle } from '../types/horror';

export const CIPHER_PUZZLES: CipherPuzzle[] = [
  {
    id: 'cipher_veils',
    title: 'Cistern Sluice Mechanism',
    codeLength: 5,
    targetSolution: 'VEILS',
    caseOrigin: 'Case File 1891-04 (Ward 7)',
    riddleProse: 'What covers the eyes of the dying, cloaks the altar at Passiontide, and is drawn across the black cistern so the watcher cannot see the light?',
    hint: 'Recorded on Dr. Vane’s pinned vellum: Five letters carved into the margin. The third letter is I.',
    sanityCostForHint: 5,
    unlockedEvidence: {
      title: 'DRAINAGE COMPARTMENT TRANSCRIPT: LOG 7B',
      transcript: 'The iron gates unlock with a deep hydraulic shudder. Beneath the water layer, a sealed zinc chest surfaces, bearing the official seal of the High Inquisitor of Essex (1862). Inside: twenty-four glass specimen ampoules filled with preserved retinal tissue.',
      revelation: 'REVELATION: Dr. Vane did not drown. His remains were distributed systematically among the asylum’s water conduits to act as sensory receptors.'
    }
  },
  {
    id: 'cipher_ashen',
    title: 'The Belfry Resonator Lock',
    codeLength: 5,
    targetSolution: 'ASHEN',
    caseOrigin: 'Case File 1891-09 (Blackwood)',
    riddleProse: 'What color is the skin of the choir when the bell ceases to ring? What remains in the brazier when all oil and bone have burned cold?',
    hint: 'Spoken directly into the cranial bone during the inverted resonance at 03:00.',
    sanityCostForHint: 8,
    unlockedEvidence: {
      title: 'ECCLESIASTICAL TRANSCRIPTION: THE BENEDICTINE RECORD',
      transcript: 'The verdigris bronze bell splits open along a pre-existing hairline fracture. Nestled in the throat of the bell is not an iron clapper, but an embalmed human spine anchored by six silver tension cables.',
      revelation: 'REVELATION: The bell vibrates at 17.4 Hz—the infrasonic threshold that dissolves cognitive coherence in human primates.'
    }
  },
  {
    id: 'cipher_transit',
    title: 'Submerged Astrolabe Transit Code',
    codeLength: 6,
    targetSolution: '031749',
    caseOrigin: 'Case File 1891-09 (Blackwood Fen)',
    riddleProse: 'Six numbers etched into the basalt rim beneath twelve submerged stone nuns. The hour of the inverted bell, followed by the coordinates of the cold moon.',
    hint: 'Carved on the pit wall: Starts with 03 (the tolling hour) and ends with 49.',
    sanityCostForHint: 6,
    unlockedEvidence: {
      title: 'CARTOGRAPHIC CHART: THE SUNKEN PARISH',
      transcript: 'The astrolabe rings click into static alignment. A phosphorescent beam shoots through the peat water, projecting a nautical chart onto the mist: an unmapped island seventy leagues north-northwest of the Hebrides.',
      revelation: 'REVELATION: The Blackwood congregation did not perish in the 1831 fire; their bodies were transported by cutter to the northern latitude.'
    }
  },
  {
    id: 'cipher_mort',
    title: 'The Anatomist’s Cryptic Seal',
    codeLength: 4,
    targetSolution: 'MORT',
    caseOrigin: 'General Ossuary Ledger',
    riddleProse: 'The Latin root of that which physician and undertaker share; the final condition recorded in the cold black ink of the ledger.',
    hint: 'Four letters: M - _ - _ - T. The Latin prefix for death.',
    sanityCostForHint: 4,
    unlockedEvidence: {
      title: 'LEDGER REVELATION: MORTALIS SECRETA',
      transcript: 'The iron lock rolls over with a heavy mechanical clunk. Inside the drawer lies the ceremonial bone hammer used by the Vatican camerlengo to verify the cessation of papal life.',
      revelation: 'REVELATION: The hammer head has striking impressions matching the fractures on all three victims.'
    }
  }
];
