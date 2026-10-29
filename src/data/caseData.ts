import { InvestigationCase } from '../types/horror';

export const CASE_FILES: InvestigationCase[] = [
  {
    id: 'case_ward_7',
    caseNumber: 'CASE FILE NO. 1891-04',
    title: 'The Cistern Beneath Ward 7',
    subtitle: 'Autopsy records of Dr. Arthur Vane & the subterranean drainage',
    date: '14 NOVEMBER 1891',
    subject: 'DR. ARTHUR VANE (FORMER SURGEON-PROCTOR)',
    status: 'CONFIDENTIAL',
    summary: 'Water drawn from the lowest asylum pump has acquired the scent of crushed almonds and cold iron. In the locked cellar below the morgue, three iron sluice gates were found welded shut from the inside.',
    startSceneId: 'morgue_threshold',
    scenes: {
      morgue_threshold: {
        id: 'morgue_threshold',
        title: 'The Morgue Threshold',
        timestamp: '23:40 HRS',
        location: 'Sub-Basement, St. Jude Lunatic Asylum',
        body: [
          'The paraffin lantern flickers, casting oblong shadows across the limestone floor. A thin slick of black condensation clings to the vault overhead, dripping in measured three-second intervals into an empty zinc basin.',
          'Before you lies the heavy oaken door to Dissecting Ward 7. The padlock has not been cut; the brass shackle was dissolved through with high-purity vitriol. A smell like rotting elderflowers and cold lead seeps through the door seam.',
          'Upon the ledger table beside the jamb sits a leather notebook, its buckram binding swollen with moisture. A silver dissecting scalpel is driven three inches into the center of the wood, pinning down a single slip of vellum.'
        ],
        forensicNote: 'CORONER NOTE: The padlock cylinder was found melted inward. Internal temperature at 23:40 was 3.4°C.',
        choices: [
          {
            id: 'examine_scalpel',
            label: 'Inspect the Pinned Vellum',
            text: 'Withdraw the silver blade and examine the pinned vellum slip under the lantern glass.',
            consequenceText: 'You carefully pull the blade free; the oak groans. The handwriting on the vellum is frantic, compressed into microscopic cursive.',
            dreadDelta: 8,
            sanityDelta: -5,
            unlocksClueId: 'clue_vellum_slip',
            nextSceneId: 'scene_vellum_reading'
          },
          {
            id: 'force_ward_door',
            label: 'Breach Ward 7 Directly',
            text: 'Shoulder open the unlatched heavy door and shine the lantern into the dark expanse.',
            consequenceText: 'The hinge screams like drawn wire. Cold air rushes outward, carrying the scent of stagnated brackish well-water.',
            dreadDelta: 16,
            sanityDelta: -10,
            unlocksClueId: 'clue_iron_sluice',
            nextSceneId: 'scene_cistern_chamber'
          },
          {
            id: 'inspect_drainage_ledger',
            label: 'Review Subterranean Pump Ledger',
            text: 'Inspect the buckram ledger on the side table before advancing.',
            consequenceText: 'The pages stick together with tallow. A table of dates documents the gradual drop of asylum well depth between August and October.',
            dreadDelta: 4,
            sanityDelta: 0,
            unlocksClueId: 'clue_pump_ledger',
            nextSceneId: 'scene_ledger_details'
          }
        ]
      },
      scene_vellum_reading: {
        id: 'scene_vellum_reading',
        title: 'The Pinned Scraps of Vane',
        timestamp: '23:48 HRS',
        location: 'Anteroom, Ward 7',
        body: [
          'The slip reads in pale black gall ink: "They believe the patient died of melancholia. When we opened the thorax, there was no pericardial fluid. Only dry gray salt that hissed upon contact with the bone forceps."',
          '"The sluice below must remain barred. At midnight the intake reverses. If you hear the iron chain singing against the pulley, extinguish your light immediately. It tracks the flame."',
          'Beneath the text, five distinct letters have been carved into the paper with a blunt stylus: V - E - I - L - S.'
        ],
        forensicNote: 'EVIDENCE MARKER: The letters V-E-I-L-S correspond directly to the five-tumbler lock on the lower cistern gate.',
        choices: [
          {
            id: 'proceed_to_sluice',
            label: 'Advance to the Lower Cistern Gate',
            text: 'Extinguish the lantern wick partially and step toward the descending stone stairs.',
            consequenceText: 'Your boots descend slick limestone stairs. Below, water rushes over submerged grates.',
            dreadDelta: 12,
            sanityDelta: -4,
            nextSceneId: 'scene_cistern_chamber'
          },
          {
            id: 'test_air_reagent',
            label: 'Test Atmospheric Salt with Silver Nitrate',
            text: 'Draw a vial from your medical satchel to test the residue scraped from the vellum.',
            consequenceText: 'The reagent turns a violent cadmium violet. The salt is not sodium chloride; it carries no terrestrial mineral signature.',
            dreadDelta: 15,
            sanityDelta: -8,
            unlocksClueId: 'clue_astral_salt',
            nextSceneId: 'scene_cistern_chamber'
          }
        ]
      },
      scene_ledger_details: {
        id: 'scene_ledger_details',
        title: 'The Pump Depth Ledger',
        timestamp: '23:51 HRS',
        location: 'Anteroom Table',
        body: [
          'Dr. Vane’s ink changes color across forty entries, fading from black to rusted crimson.',
          '"Sept 12: Depth measured at 48 fathoms. Bottom mud is warm to the touch."',
          '"Oct 03: The orderly refused to lower the plumb-line. He claimed something took the lead weight in its mouth and chewed the hemp cord."',
          '"Oct 29: The cistern is no longer filling from the river. The pressure gauge reads in reverse. It is breathing."',
          'A copper key stamped with the numeral "3" falls from the rear binding pocket.'
        ],
        forensicNote: 'PHYSICAL OBJECT: Asylum Master Key No. 3 added to field inventory.',
        choices: [
          {
            id: 'enter_cistern_with_key',
            label: 'Descend with Key No. 3',
            text: 'Take Key No. 3 and unlock the iron grate leading to the water tunnels.',
            consequenceText: 'The lock yields with a loud brass clatter that echoes deep into the tunnel network.',
            dreadDelta: 14,
            sanityDelta: -6,
            nextSceneId: 'scene_cistern_chamber'
          }
        ]
      },
      scene_cistern_chamber: {
        id: 'scene_cistern_chamber',
        title: 'The Submerged Sluice Chamber',
        timestamp: '00:04 HRS',
        location: 'Lower Drainage Vault, -40 Feet',
        body: [
          'You stand upon an iron catwalk suspended over a black circular reservoir. The water below is completely motionless, like black polished glass, reflecting not your lantern, but a sky filled with pale, unfamiliar stars.',
          'On the far platform sits the dissection table. A human figure lies shrouded under canvas. From beneath the cloth, a steady, mechanical tapping sound emerges—three taps, a pause, two taps.',
          'At the edge of the catwalk rests a massive cast-iron cipher gate. Five heavy brass dials require a code to uncouple the chain mechanism.'
        ],
        forensicNote: 'WARNING: The reflections in the reservoir do not correspond to the ceiling masonry. Veil stability decaying rapidly.',
        choices: [
          {
            id: 'lift_shroud',
            label: 'Lift the Canvas Shroud',
            text: 'Approach the center table and peel back the damp canvas covering the figure.',
            consequenceText: 'The canvas sticks to dry paper-like skin. Dr. Vane’s eyes are wide, replaced with two polished spheres of jet stone.',
            dreadDelta: 25,
            sanityDelta: -20,
            unlocksClueId: 'clue_vane_eyes',
            nextSceneId: 'scene_post_mortem_revelation'
          },
          {
            id: 'approach_cipher_gate',
            label: 'Examine the Five-Dial Sluice Lock',
            text: 'Turn your back on the table and examine the five-character combination lock on the iron gate.',
            consequenceText: 'The tumblers are cold enough to freeze moisture from your fingertips.',
            dreadDelta: 10,
            sanityDelta: 0,
            nextSceneId: 'scene_cipher_discovery'
          }
        ]
      },
      scene_post_mortem_revelation: {
        id: 'scene_post_mortem_revelation',
        title: 'The Autopsy of the Watcher',
        timestamp: '00:18 HRS',
        location: 'Central Dissecting Table',
        body: [
          'Inside Dr. Vane’s open palms, clenched tightly in rigor mortis, is an iron cylinder inscribed with the words: "THE OSSUARY AWAITS THE CROWNS."',
          'His chest cavity is hollow, lined with geometric honeycomb wax cells. Inside each cell rests an ossified finger bone wrapped in lead foil.',
          'A sudden tremor shakes the iron catwalk. The black water below begins to rise in concentric rings, without creating a single splash.'
        ],
        forensicNote: 'AUTOPSY CONCLUSION: Subject ceased organic respiration 14 days before disappearance was noted. Biological function sustained by artificial lead ballast.',
        choices: [
          {
            id: 'escape_to_cipher',
            label: 'Rush to the Sluice Lock',
            text: 'Flee the rising reservoir and input the cipher into the escape hatch.',
            consequenceText: 'You leap across the shuddering iron gangway as the black water laps at the rivets.',
            dreadDelta: 18,
            sanityDelta: -12,
            nextSceneId: 'scene_cipher_discovery'
          }
        ]
      },
      scene_cipher_discovery: {
        id: 'scene_cipher_discovery',
        title: 'The Five-Tumbler Cipher Door',
        timestamp: '00:26 HRS',
        location: 'Cistern Gate Alpha',
        body: [
          'The cast-iron gate bars the passage to the surface escape shaft. Five monospaced rotatable cylinders click against internal spring pins.',
          'Above the dials, an engraved copper plate reads: "THAT WHICH COVERS THE SEVENTH EYE." (Length: 5 Letters)',
          'If you recorded the slip pinned to the antechamber table, the word V-E-I-L-S matches the required resonance.'
        ],
        forensicNote: 'INTERACTION REQUIRED: Navigate to the Cipher Room in the upper HUD to calibrate and unlock the five-letter lock.',
        choices: [
          {
            id: 'record_cipher_and_wait',
            label: 'Commit Lock Coordinates to Memory',
            text: 'Record the lock layout into your investigator logbook and prepare your cipher tools.',
            consequenceText: 'You copy down the five tumblers. The distant water whispers through the pipe joints.',
            dreadDelta: 5,
            sanityDelta: 2,
            nextSceneId: 'morgue_threshold'
          }
        ]
      }
    }
  },
  {
    id: 'case_blackwood_abbey',
    caseNumber: 'CASE FILE NO. 1891-09',
    title: 'The Hollow Bell at Blackwood Abbey',
    subtitle: 'The silent parish of St. Jude & the inverted resonance',
    date: '02 DECEMBER 1891',
    subject: 'SISTER CLARA & THE CHOIR OF THE SICKLE',
    status: 'OPEN',
    summary: 'The iron bell tower of Blackwood was demolished sixty years ago; yet at 03:00 every Tuesday morning, the surrounding village is shaken by low-frequency tolling that curds milk and cracks window glass.',
    startSceneId: 'abbey_belfry_ruin',
    scenes: {
      abbey_belfry_ruin: {
        id: 'abbey_belfry_ruin',
        title: 'The Foundations of the Ruined Belfry',
        timestamp: '02:45 HRS',
        location: 'Blackwood Fen, Northern Moor',
        body: [
          'Frost coats the collapsed stone arches of the nave. Where the high tower once stood, only four massive basalt pillars remain, encircling an open pit filled with black stagnant rainwater.',
          'Suspended above the water, hanging from no visible beam or rope, hangs a three-ton bronze church bell, pitted with deep green verdigris.',
          'Its clapper swings slowly back and forth in total silence. A faint smell of ozone and burning marrow fills the winter air.'
        ],
        forensicNote: 'ATMOSPHERIC ACOUSTICS: Barometric pressure dropping 40 hPa per minute. Sound vibrations felt directly in tooth roots.',
        choices: [
          {
            id: 'touch_bell_lip',
            label: 'Touch the Verdigris Bell Rim',
            text: 'Reach out a gloved hand and press your palm against the trembling bronze.',
            consequenceText: 'A high-frequency shock travels through your arm. Your vision fractures into red and amber fractals.',
            dreadDelta: 22,
            sanityDelta: -16,
            unlocksClueId: 'clue_bell_frequency',
            nextSceneId: 'scene_belfry_vision'
          },
          {
            id: 'inspect_fen_water',
            label: 'Inspect the Water Beneath the Floating Bell',
            text: 'Direct your bullseye lamp downward into the basalt pit beneath the bell lip.',
            consequenceText: 'The beam cuts twelve feet through dark peat water to reveal dozens of stone statues standing upright on the pit bottom.',
            dreadDelta: 15,
            sanityDelta: -8,
            unlocksClueId: 'clue_submerged_choir',
            nextSceneId: 'scene_submerged_choir'
          }
        ]
      },
      scene_belfry_vision: {
        id: 'scene_belfry_vision',
        title: 'The Inverted Resonance',
        timestamp: '03:00 HRS',
        location: 'Epileptic Interval',
        body: [
          'The bell does not toll sound; it tolls silence. Every natural ambient sound—the wind across the heather, your own breath, the crack of ice—is instantly swallowed.',
          'In that total vacuum, a voice speaks directly into the bones of your skull: "ASHEN IS THE CRUCIBLE. FIVE MARKS REMAIN."',
          'When sound returns, your nose is bleeding, and the bronze surface of the bell bears six glowing runes: A - S - H - E - N.'
        ],
        forensicNote: 'MEDICAL LOG: Auditory nerve trauma confirmed. Solution cipher recorded: A-S-H-E-N.',
        choices: [
          {
            id: 'retreat_to_sanctuary',
            label: 'Withdraw to the Crypt Sanctuary',
            text: 'Gather your equipment and take cover inside the surviving subterranean crypt.',
            consequenceText: 'You drag yourself through the low archway as the ground beneath the moors shudders.',
            dreadDelta: 8,
            sanityDelta: 5,
            nextSceneId: 'abbey_belfry_ruin'
          }
        ]
      },
      scene_submerged_choir: {
        id: 'scene_submerged_choir',
        title: 'The Submerged Choir',
        timestamp: '03:12 HRS',
        location: 'Basalt Pit Rim',
        body: [
          'The stone figures beneath the water wear the habits of Benedictine nuns. All twelve face inward toward a central stone pedestal.',
          'Upon the pedestal sits a brass astrolabe, its armillary rings rotating steadily against the current of the water.',
          'On the pit wall, carved in 18th-century numerals: 0 - 3 - 1 - 7 - 4 - 9.'
        ],
        forensicNote: 'CHRONOMETRIC ANOMALY: The mechanism has operated underwater for approximately 140 years without corrosion.',
        choices: [
          {
            id: 'record_astrolabe_digits',
            label: 'Record Astrolabe Digits in Dossier',
            text: 'Copy the numeric sequence into your cipher notebook.',
            consequenceText: 'The numbers 031749 are logged. They match the transit lock on the secondary ossuary chest.',
            dreadDelta: 6,
            sanityDelta: 2,
            nextSceneId: 'abbey_belfry_ruin'
          }
        ]
      }
    }
  }
];
