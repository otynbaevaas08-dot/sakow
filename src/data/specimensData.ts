import { SpecimenItem } from '../types/horror';

export const SPECIMEN_ARCHIVE: SpecimenItem[] = [
  {
    id: 'spec_scalpel',
    accessionNumber: 'ARC-1889-014',
    name: 'Tarnished Silver Dissecting Scalpel',
    category: 'Relic',
    originDate: '18 October 1889',
    containmentProtocol: 'Submerged in distilled olive oil inside lead-lined casket.',
    auraType: 'crimson',
    visualSymbol: 'dagger',
    shortDescription: 'Blade forged from ceremonial church silver; etched with microscopic astronomical charts along the spine.',
    forensicObservation: 'Under 40x magnification, the blade edge shows zero cellular nicking despite 1,200 documented post-mortem autopsies. Micro-grooves along the fuller contain trace residues of dried vitriol and silver chloride.',
    inscribedLatin: 'MORS PATET NON OMNIBUS SED ELECTIS',
    englishTranslation: 'Death is open not to all, but to the chosen.',
    physicalProperties: {
      material: 'Church Sterling Silver (925) / Horn Handle',
      weight: '142.8 grams',
      condition: 'Oxidized, keen-edged, uncorroded core',
      radianceLevel: 'Emits 3.2 mR/hr cold phosphorescence under ultraviolet'
    }
  },
  {
    id: 'spec_reliquary',
    accessionNumber: 'ARC-1874-002',
    name: 'Lead-Sealed Reliquary of St. Jude',
    category: 'Relic',
    originDate: '09 August 1874',
    containmentProtocol: 'Sealed within vacuum glass bell jar; desiccated silica substrate.',
    auraType: 'ember',
    visualSymbol: 'box',
    shortDescription: 'Hexagonal casket of solid cast lead, soldered at all vertices with tin and antimony.',
    forensicObservation: 'When inverted, three distinct ossified bodies rattle against the internal cavity. Radiographic exposure reveals two human phalanx bones and a central carved scarab of meteoric iron.',
    inscribedLatin: 'CONSERVA CORPUS VELUT CARBONEM IN CINERE',
    englishTranslation: 'Preserve the body as charcoal in the ashes.',
    physicalProperties: {
      material: 'Smelted Derbyshire Lead & Antimony solder',
      weight: '2,840 grams',
      condition: 'Pitted, dented, hermetically intact',
      radianceLevel: 'Absolute zero thermal absorption'
    }
  },
  {
    id: 'spec_cylinder',
    accessionNumber: 'ARC-1891-088',
    name: 'Phonograph Wax Cylinder No. 4',
    category: 'Audio Relic',
    originDate: '23 October 1891',
    containmentProtocol: 'Stored in cooled felt chamber at 12°C. Handle strictly with horn forceps.',
    auraType: 'crimson',
    visualSymbol: 'disc',
    shortDescription: 'Dark beeswax cylinder cut with fine acoustic grooves; recorded in the sub-cellar during high tide.',
    forensicObservation: 'Groove depth analysis indicates recording needle vibrated simultaneously at two divergent sound sources: a low male voice whispering English numbers, and a high liquid bubbling consistent with subterranean lung aspiration.',
    inscribedLatin: 'VOX EX AQUIS CLAMAT IN PROFUNDUM',
    englishTranslation: 'A voice from the waters cries out into the deep.',
    physicalProperties: {
      material: 'Paraffin & Hard Carnauba Wax Compound',
      weight: '94.2 grams',
      condition: 'Slight surface blooming; grooves playable',
      radianceLevel: 'Induces auditory hallucinations upon direct skin contact'
    }
  },
  {
    id: 'spec_ledger',
    accessionNumber: 'ARC-1882-031',
    name: 'Post-Mortem Ledger of Magistrate Thorne',
    category: 'Manuscript',
    originDate: '11 January 1882',
    containmentProtocol: 'Enclosed in moisture-free argon pouch under darkroom storage.',
    auraType: 'ember',
    visualSymbol: 'book',
    shortDescription: 'Folio of thick vellum bound in goat hide; records twenty years of unheralded deaths in the marsh parishes.',
    forensicObservation: 'Seventeen entries have been obliterated with iron gall ink and ground lampblack. Under infrared photography, the stricken names belong exclusively to members of the 1861 Parish Drainage Commission.',
    inscribedLatin: 'NOMINA DELETA IN LIBRO VIVENTIUM',
    englishTranslation: 'Names blotted out from the book of the living.',
    physicalProperties: {
      material: 'Calfskin Vellum / Tanned Goat Hide / Oak gall ink',
      weight: '1,640 grams',
      condition: 'Foxing, margin watermarks, stiffened spine',
      radianceLevel: 'Emits distinct ozone scent when opened'
    }
  },
  {
    id: 'spec_coin',
    accessionNumber: 'ARC-1869-009',
    name: 'The Jet-Black Ossuary Shilling',
    category: 'Relic',
    originDate: 'Circa 1869',
    containmentProtocol: 'Isolated on non-ferrous wooden stand away from magnetic instrumentation.',
    auraType: 'crimson',
    visualSymbol: 'circle',
    shortDescription: 'Silver coin blackened by exposure to sulfurous spring gas; stamped with a crowned skull and cross-bones.',
    forensicObservation: 'When placed beside a standard magnetic needle, the needle deflects 180 degrees due south. The coin remains permanently at 4.1°C below ambient room temperature.',
    inscribedLatin: 'PRETIUM VENDITI ANIMA IN FLUMINE',
    englishTranslation: 'Price of the soul sold at the riverbank.',
    physicalProperties: {
      material: 'Blackened Victorian Silver with trace tellurium',
      weight: '5.65 grams',
      condition: 'Smooth rim, worn heraldry',
      radianceLevel: 'Local magnetic field depression: -45 microteslas'
    }
  },
  {
    id: 'spec_monocle',
    accessionNumber: 'ARC-1888-052',
    name: 'The Anatomist’s Polarized Monocle',
    category: 'Anatomical',
    originDate: '04 March 1888',
    containmentProtocol: 'Plush velvet casing with tourmaline preservation oil.',
    auraType: 'ember',
    visualSymbol: 'eye',
    shortDescription: 'Brass eye loop fitted with dual Icelandic spar calcite prisms.',
    forensicObservation: 'Viewing handwritten documents through this lens reveals hidden brushwork rendered in bone phosphorus. When aimed at living human skin, capillary veins appear black as charcoal.',
    inscribedLatin: 'VIDET QUOD LATET IN VISCERIBUS',
    englishTranslation: 'It sees that which lurks in the entrails.',
    physicalProperties: {
      material: 'Turned Brass, Icelandic Spar, Tourmaline crystal',
      weight: '62.0 grams',
      condition: 'Prisms pristine, minor brass patination',
      radianceLevel: 'Optical double refraction index: 1.658'
    }
  }
];
