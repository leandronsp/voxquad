// Chromatic note names and their MIDI numbers (ordered C, C#, D, D#, E, F, F#, G, G#, A, A#, B)
export const CHROMATIC_NOTES = [
  // Octave 2 (MIDI 36-47) - Starting with C
  {name: 'C2', midi: 36}, {name: 'C#2/Db2', midi: 37}, {name: 'D2', midi: 38}, {name: 'D#2/Eb2', midi: 39},
  {name: 'E2', midi: 40}, {name: 'F2', midi: 41}, {name: 'F#2/Gb2', midi: 42}, {name: 'G2', midi: 43},
  {name: 'G#2/Ab2', midi: 44}, {name: 'A2', midi: 45}, {name: 'A#2/Bb2', midi: 46}, {name: 'B2', midi: 47},
  
  // Octave 3 (MIDI 48-59) - Starting with C
  {name: 'C3', midi: 48}, {name: 'C#3/Db3', midi: 49}, {name: 'D3', midi: 50}, {name: 'D#3/Eb3', midi: 51},
  {name: 'E3', midi: 52}, {name: 'F3', midi: 53}, {name: 'F#3/Gb3', midi: 54}, {name: 'G3', midi: 55},
  {name: 'G#3/Ab3', midi: 56}, {name: 'A3', midi: 57}, {name: 'A#3/Bb3', midi: 58}, {name: 'B3', midi: 59},
  
  // Octave 4 (MIDI 60-71) - Starting with C
  {name: 'C4', midi: 60}, {name: 'C#4/Db4', midi: 61}, {name: 'D4', midi: 62}, {name: 'D#4/Eb4', midi: 63},
  {name: 'E4', midi: 64}, {name: 'F4', midi: 65}, {name: 'F#4/Gb4', midi: 66}, {name: 'G4', midi: 67},
  {name: 'G#4/Ab4', midi: 68}, {name: 'A4', midi: 69}, {name: 'A#4/Bb4', midi: 70}, {name: 'B4', midi: 71},
  
  // Octave 5 (MIDI 72-83) - Starting with C
  {name: 'C5', midi: 72}, {name: 'C#5/Db5', midi: 73}, {name: 'D5', midi: 74}, {name: 'D#5/Eb5', midi: 75},
  {name: 'E5', midi: 76}, {name: 'F5', midi: 77}, {name: 'F#5/Gb5', midi: 78}, {name: 'G5', midi: 79},
  {name: 'G#5/Ab5', midi: 80}, {name: 'A5', midi: 81}, {name: 'A#5/Bb5', midi: 82}, {name: 'B5', midi: 83}
];

// Chord definitions with their component notes (all octaves included)
export const CHORD_DEFINITIONS = {
  // Empty chord - no filtering
  '': { name: 'All Notes', notes: [] },
  
  // Major chords
  'C': { name: 'C Major', notes: ['C', 'E', 'G'] },
  'F': { name: 'F Major', notes: ['F', 'A', 'C'] },
  'G': { name: 'G Major', notes: ['G', 'B', 'D'] },
  'D': { name: 'D Major', notes: ['D', 'F#/Gb', 'A'] },
  'A': { name: 'A Major', notes: ['A', 'C#/Db', 'E'] },
  'E': { name: 'E Major', notes: ['E', 'G#/Ab', 'B'] },
  'B': { name: 'B Major', notes: ['B', 'D#/Eb', 'F#/Gb'] },
  
  // Minor chords  
  'Am': { name: 'A minor', notes: ['A', 'C', 'E'] },
  'Dm': { name: 'D minor', notes: ['D', 'F', 'A'] },
  'Em': { name: 'E minor', notes: ['E', 'G', 'B'] },
  'Bm': { name: 'B minor', notes: ['B', 'D', 'F#/Gb'] },
  'Fm': { name: 'F minor', notes: ['F', 'G#/Ab', 'C'] },
  'Cm': { name: 'C minor', notes: ['C', 'D#/Eb', 'G'] },
  'Gm': { name: 'G minor', notes: ['G', 'A#/Bb', 'D'] },
  
  // Dominant 7th chords
  'G7': { name: 'G7', notes: ['G', 'B', 'D', 'F'] },
  'C7': { name: 'C7', notes: ['C', 'E', 'G', 'A#/Bb'] },
  'F7': { name: 'F7', notes: ['F', 'A', 'C', 'D#/Eb'] },
  'D7': { name: 'D7', notes: ['D', 'F#/Gb', 'A', 'C'] },
  'A7': { name: 'A7', notes: ['A', 'C#/Db', 'E', 'G'] },
  'E7': { name: 'E7', notes: ['E', 'G#/Ab', 'B', 'D'] },
  'B7': { name: 'B7', notes: ['B', 'D#/Eb', 'F#/Gb', 'A'] }
};

// Calculate frequency from MIDI note number using equal temperament
export function midiToFrequency(midiNote) {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

// Function to check if a note belongs to a chord (any octave)
export function noteInChord(noteName, chordNotes) {
  if (chordNotes.length === 0) return true; // Empty chord = all notes allowed
  
  // Extract base note name (remove octave number)
  const baseName = noteName.replace(/[2-5]$/, '');
  
  return chordNotes.some(chordNote => {
    // Handle enharmonic equivalents (e.g., F#/Gb matches both F# and Gb)
    if (chordNote.includes('/')) {
      const [sharp, flat] = chordNote.split('/');
      return baseName === sharp || baseName === flat;
    }
    return baseName === chordNote;
  });
}

// Create note-to-frequency mapping
export const NOTE_FREQUENCIES = {};
CHROMATIC_NOTES.forEach(note => {
  const frequency = midiToFrequency(note.midi);
  NOTE_FREQUENCIES[note.name] = frequency;
});

// Generate note options from chromatic notes  
export const noteOptions = CHROMATIC_NOTES.map(note => ({
  value: midiToFrequency(note.midi).toFixed(2),
  text: note.name
}));

// Helper function to get frequency by note name
export function getFrequencyByNote(noteName) {
  return NOTE_FREQUENCIES[noteName].toFixed(2);
}

// Prepare chord options for autocomplete
export const chordOptions = [
  { value: '', text: 'All Notes' },
  // Key of C major progression first
  { value: 'C', text: 'C Major' },
  { value: 'Dm', text: 'D minor' }, 
  { value: 'Em', text: 'E minor' },
  { value: 'F', text: 'F Major' },
  { value: 'G', text: 'G Major' },
  { value: 'Am', text: 'A minor' },
  { value: 'G7', text: 'G7' },
  // Other majors
  { value: 'D', text: 'D Major' },
  { value: 'E', text: 'E Major' },
  { value: 'A', text: 'A Major' },
  { value: 'B', text: 'B Major' },
  // Other minors
  { value: 'Bm', text: 'B minor' },
  { value: 'Fm', text: 'F minor' },
  { value: 'Cm', text: 'C minor' },
  { value: 'Gm', text: 'G minor' },
  // Other 7ths
  { value: 'C7', text: 'C7' },
  { value: 'F7', text: 'F7' },
  { value: 'D7', text: 'D7' },
  { value: 'A7', text: 'A7' },
  { value: 'E7', text: 'E7' },
  { value: 'B7', text: 'B7' }
];