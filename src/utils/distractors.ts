import { Word } from '../types';

// Category-based fallback word bank for creating highly targeted distractors
export const CATEGORY_DISTRACTORS: Record<string, string[]> = {
  // 人員、職業、角色
  person_role: [
    "Doctor", "Nurse", "Physician", "Surgeon", "Specialist", "Clinician",
    "Therapist", "Pharmacist", "Pediatrician", "Dentist", "Psychiatrist",
    "Queen", "King", "Monarch", "Emperor", "Princess", "Ruler", "Sovereign",
    "Candidate", "Diplomat", "Delegate", "Representative", "Politician", "Governor",
    "Curator", "Architect", "Designer", "Engineer", "Scientist", "Professor",
    "Guardian", "Supervisor", "Director", "Manager", "Inspector", "Auditor",
    "Captain", "Officer", "Commander", "Pilot", "Astronaut", "Navigator"
  ],

  // 動物類
  animal: [
    "Cat", "Dog", "Elephant", "Monkey", "Rabbit", "Tiger", "Zebra",
    "Leopard", "Cheetah", "Panther", "Jaguar", "Lion", "Giraffe", "Hippo",
    "Rhino", "Kangaroo", "Gorilla", "Chimpanzee", "Panda", "Buffalo", "Antelope"
  ],

  // 植物、水果、食物
  plant_food: [
    "Apple", "Orange", "Banana", "Lemon", "Peach", "Mango", "Pineapple",
    "Strawberry", "Cherry", "Grape", "Avocado", "Coconut", "Bakery", "Pastry",
    "Dessert", "Culinary", "Recipe", "Beverage", "Cuisine", "Delicacy"
  ],

  // 地點、建築、機構
  place_building: [
    "Hospital", "Clinic", "Sanatorium", "Infirmary", "Institution", "Laboratory",
    "Library", "Academy", "Institute", "University", "College", "School",
    "Kitchen", "Bakery", "Pantry", "Dining", "Restaurant", "Cafeteria",
    "Garden", "Park", "Courtyard", "Orchard", "Meadow", "Terrace",
    "Desert", "Dune", "Oasis", "Wasteland", "Wilderness", "Savanna", "Prairie",
    "Island", "Peninsula", "Archipelago", "Harbor", "Bay", "Coastal", "Territory"
  ],

  // 裝置、工具、物品
  device_tool: [
    "Bicycle", "Motorcycle", "Scooter", "Vehicle", "Automobile", "Chassis",
    "Camera", "Projector", "Telescope", "Microscope", "Scanner", "Aperture",
    "Guitar", "Violin", "Cello", "Piano", "Accordion", "Synthesizer",
    "Umbrella", "Parasol", "Canopy", "Shield", "Covering", "Overcoat",
    "Jacket", "Garment", "Vestment", "Apparel", "Attire", "Outfit",
    "Window", "Aperture", "Shutters", "Lattice", "Balcony", "Threshold"
  ],

  // 抽象名詞、心理與社會概念
  abstract_noun: [
    "Ambition", "Aspiration", "Audition", "Affliction", "Acquisition", "Anticipation",
    "Consequence", "Sequence", "Subsequence", "Eloquence", "Repercussion", "Outcome",
    "Diligence", "Persistence", "Dedication", "Assiduity", "Endeavor", "Perseverance",
    "Hypothesis", "Synthesis", "Analysis", "Diagnosis", "Thesis", "Supposition", "Premise",
    "Jurisdiction", "Authority", "Dominion", "Sovereignty", "Administration", "Governance",
    "Knowledge", "Wisdom", "Erudition", "Insight", "Perception", "Comprehension",
    "Nostalgia", "Reminiscence", "Melancholy", "Longing", "Yearning", "Sentiment",
    "Obstacle", "Barrier", "Impediment", "Hindrance", "Deterrent", "Interference",
    "Coincidence", "Occurrence", "Incident", "Concurrence", "Synchronicity", "Fluke",
    "Empathy", "Compassion", "Sympathy", "Affinity", "Resonance", "Solidarity",
    "Fluctuation", "Oscillation", "Variation", "Instability", "Volatility", "Deviation",
    "Anachronism", "Incongruity", "Discrepancy", "Contradiction", "Paradox", "Anomaly",
    "Cacophony", "Dissonance", "Euphony", "Symphony", "Clamor", "Discordance",
    "Paradigm", "Archetype", "Prototype", "Benchmark", "Criterion", "Exemplar"
  ],

  // 性格、正面形容詞
  character_adj: [
    "Benevolent", "Beneficent", "Magnanimous", "Charitable", "Philanthropic", "Altruistic",
    "Eloquent", "Articulate", "Persuasive", "Expressive", "Fluent", "Coherent",
    "Grateful", "Appreciative", "Obliged", "Thankful", "Acknowledging", "Mindful",
    "Meticulous", "Fastidious", "Scrupulous", "Conscientious", "Punctilious", "Methodical",
    "Pragmatic", "Empirical", "Utilitarian", "Rational", "Practical", "Sensible",
    "Resilient", "Tenacious", "Indomitable", "Pliant", "Adaptable", "Enduring",
    "Decisive", "Resolute", "Determined", "Emphatic", "Unwavering", "Steadfast",
    "Gregarious", "Sociable", "Companionable", "Outgoing", "Affable", "Amiable"
  ],

  // 狀態、條件、性質形容詞
  state_adj: [
    "Inevitable", "Inescapable", "Indispensable", "Inflexible", "Invariable", "Insurmountable",
    "Lucrative", "Profitable", "Remunerative", "Gainful", "Advantageous", "Commercial",
    "Skeptical", "Cynical", "Dubious", "Distrustful", "Incredulous", "Hesitant",
    "Treacherous", "Perfidious", "Hazardous", "Precarious", "Perilous", "Deceitful",
    "Abundant", "Plentiful", "Profuse", "Bountiful", "Exuberant", "Copious",
    "Ephemeral", "Transient", "Evanescent", "Fleeting", "Temporal", "Momentary",
    "Ubiquitous", "Omnipresent", "Pervasive", "Universal", "Prevalent", "Widespread",
    "Vicarious", "Empathic", "Substituted", "Indirect", "Derivative", "Secondary",
    "Quintessential", "Prototypical", "Archetypal", "Definitive", "Exemplary", "Ultimate",
    "Synergistic", "Harmonious", "Cooperative", "Combined", "Interactive", "Consolidated",
    "Unprecedented", "Unparalleled", "Unmatched", "Unexampled", "Extraordinary", "Unheard-of"
  ],

  // 動詞類
  action_verb: [
    "Fascinate", "Captivate", "Enchant", "Intrigue", "Mesmerize", "Hypnotize",
    "Obfuscate", "Complicate", "Baffle", "Confuse", "Obscure", "Befuddle",
    "Exacerbate", "Aggravate", "Intensify", "Worsen", "Inflame", "Exasperate",
    "Quarantine", "Isolate", "Seclude", "Segregate", "Confine", "Restrict"
  ]
};

// Calculate similarity score between candidate word and target word
function calculateSimilarityScore(candidate: string, target: Word): number {
  const c = candidate.toLowerCase();
  const t = target.word.toLowerCase();

  if (c === t) return -9999; // Exclude exact target word

  let score = 0;

  // 1. Explicit confusable match
  if (target.confusableWords && target.confusableWords.some(w => w.toLowerCase() === c)) {
    score += 100;
  }

  // 2. Exact category match in CATEGORY_DISTRACTORS
  if (target.category && CATEGORY_DISTRACTORS[target.category]) {
    const catList = CATEGORY_DISTRACTORS[target.category].map(w => w.toLowerCase());
    if (catList.includes(c)) {
      score += 60;
    }
  }

  // 3. Same initial letter
  if (c[0] === t[0]) {
    score += 20;
  }

  // 4. Same prefix (first 2-3 characters)
  if (c.length >= 3 && t.length >= 3 && c.substring(0, 3) === t.substring(0, 3)) {
    score += 25;
  } else if (c.length >= 2 && t.length >= 2 && c.substring(0, 2) === t.substring(0, 2)) {
    score += 15;
  }

  // 5. Same suffix (last 3-4 characters) e.g., -tion, -ous, -able, -ive, -ate
  if (c.length >= 4 && t.length >= 4 && c.slice(-3) === t.slice(-3)) {
    score += 25;
  }

  // 6. Word length proximity
  const lenDiff = Math.abs(c.length - t.length);
  if (lenDiff === 0) score += 15;
  else if (lenDiff <= 2) score += 10;

  return score;
}

/**
 * Generates 7 high-similarity, confusable distractors for a target word, returning 8 shuffled options.
 */
export function generateSmart8Options(
  target: Word,
  fullPool: Word[],
  customWords: Word[] = []
): string[] {
  // Candidate pool from:
  // 1. Words in current pool & full static database
  // 2. Custom words if any
  // 3. Category fallback words
  const candidateSet = new Set<string>();

  // Add words from database & custom words
  fullPool.forEach(w => {
    if (w.word.toLowerCase() !== target.word.toLowerCase()) {
      candidateSet.add(w.word);
    }
  });

  customWords.forEach(w => {
    if (w.word.toLowerCase() !== target.word.toLowerCase()) {
      candidateSet.add(w.word);
    }
  });

  // Add category words
  if (target.category && CATEGORY_DISTRACTORS[target.category]) {
    CATEGORY_DISTRACTORS[target.category].forEach(w => {
      if (w.toLowerCase() !== target.word.toLowerCase()) {
        candidateSet.add(w);
      }
    });
  } else {
    // If no explicit category, add words matching part of speech
    Object.values(CATEGORY_DISTRACTORS).flat().forEach(w => {
      if (w.toLowerCase() !== target.word.toLowerCase()) {
        candidateSet.add(w);
      }
    });
  }

  // Add specific confusable words if available
  if (target.confusableWords) {
    target.confusableWords.forEach(w => {
      if (w.toLowerCase() !== target.word.toLowerCase()) {
        candidateSet.add(w);
      }
    });
  }

  // Score all candidates
  const scoredCandidates = Array.from(candidateSet).map(cand => ({
    word: cand,
    score: calculateSimilarityScore(cand, target) + Math.random() * 8, // slight jitter for variety
  }));

  // Sort descending by score
  scoredCandidates.sort((a, b) => b.score - a.score);

  // Take top candidates
  const selectedDistractors: string[] = [];
  for (const item of scoredCandidates) {
    if (selectedDistractors.length >= 7) break;
    // Ensure no case-insensitive duplicates
    if (!selectedDistractors.some(d => d.toLowerCase() === item.word.toLowerCase())) {
      selectedDistractors.push(item.word);
    }
  }

  // Fallback if still under 7 (unlikely)
  if (selectedDistractors.length < 7) {
    const genericFallback = ["Perspective", "Illumination", "Fundamental", "Observation", "Phenomenon", "Systematic", "Substantial"];
    for (const fb of genericFallback) {
      if (selectedDistractors.length >= 7) break;
      if (fb.toLowerCase() !== target.word.toLowerCase() && !selectedDistractors.includes(fb)) {
        selectedDistractors.push(fb);
      }
    }
  }

  // Combine correct word + 7 distractors and shuffle
  const finalOptions = [target.word, ...selectedDistractors];
  return finalOptions.sort(() => Math.random() - 0.5);
}
