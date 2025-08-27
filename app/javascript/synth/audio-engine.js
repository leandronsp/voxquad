import { NOTE_FREQUENCIES } from 'synth/music-theory';

// Create Web Audio API context
let audioContext = null;

// Vowel formant frequencies (F1, F2) based on acoustic research
const VOWEL_FORMANTS = {
  a: [827, 1542],  // "bat" - open central vowel
  e: [430, 2336],  // "bet" - mid front vowel  
  i: [100, 3379],  // "beet" - close front vowel
  o: [562, 3577],  // "bought" - mid back vowel
  u: [200, 1500]   // "boot" - close back vowel
};

// Voice-specific formant frequency scaling
const VOICE_SCALING = {
  soprano: 1.2,   // Higher formants
  alto: 1.1,      // Slightly higher
  tenor: 1.0,     // Base frequencies  
  bass: 0.85      // Lower formants
};

// Create formant synthesizer based on acoustic principles
function createFormantVoice(frequency, voiceType, vowel = 'a') {
  // Get formant frequencies for the vowel
  const baseFormants = VOWEL_FORMANTS[vowel] || VOWEL_FORMANTS.a;
  const scalingFactor = VOICE_SCALING[voiceType] || 1.0;
  
  // Scale formants for voice type
  const f1 = baseFormants[0] * scalingFactor;
  const f2 = baseFormants[1] * scalingFactor;
  
  // Single sawtooth source (like vocal cords)
  const source = audioContext.createOscillator();
  source.frequency.value = frequency;
  source.type = 'sawtooth';
  
  // Create resonant formant filters in SERIES (not parallel!)
  // This simulates how vocal tract actually works
  const formant1 = audioContext.createBiquadFilter();
  formant1.type = 'peaking'; // Use peaking filter for resonance
  formant1.frequency.value = f1;
  formant1.Q.value = 10; // High Q for strong resonance
  formant1.gain.value = 12; // Boost at this frequency
  
  const formant2 = audioContext.createBiquadFilter();
  formant2.type = 'peaking';
  formant2.frequency.value = f2;
  formant2.Q.value = 15; // Even higher Q for F2
  formant2.gain.value = 8; // Less boost than F1
  
  // Lowpass to remove harsh high frequencies
  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 3000;
  lowpass.Q.value = 1;
  
  // Output gain control
  const outputGain = audioContext.createGain();
  outputGain.gain.value = 0.1; // Much quieter for peaking filters
  
  // Connect in series: source -> formant1 -> formant2 -> lowpass -> output
  source.connect(formant1);
  formant1.connect(formant2);
  formant2.connect(lowpass);
  lowpass.connect(outputGain);
  
  return { 
    oscillator: source,
    outputNode: outputGain 
  };
}

function playSATB(frequencies, duration, startTime = 0, voiceGains = [1, 1, 1, 1]) {
  const voices = [];
  const gainNodes = [];
  
  // Create master gain
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  
  const masterVolume = document.getElementById('masterVolume').value / 100;
  const voiceNames = ['soprano', 'alto', 'tenor', 'bass'];
  
  // Create formant voice for each SATB part
  frequencies.forEach((frequency, index) => {
    const voice = createFormantVoice(frequency, voiceNames[index], 'a');
    const gainNode = audioContext.createGain();
    
    // Connect voice -> gain -> master
    voice.outputNode.connect(gainNode);
    gainNode.connect(masterGain);
    
    // Set individual voice gain
    const voiceGainSlider = document.getElementById(`${voiceNames[index]}Gain`);
    const voiceGainValue = voiceGainSlider ? voiceGainSlider.value / 100 : 0.8;
    gainNode.gain.value = voiceGainValue * 0.4;
    
    voices.push(voice);
    gainNodes.push(gainNode);
  });
  
  // Apply ADSR envelope
  const now = audioContext.currentTime + startTime;
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(masterVolume, now + 0.05);
  masterGain.gain.linearRampToValueAtTime(masterVolume * 0.9, now + 0.1);
  masterGain.gain.linearRampToValueAtTime(masterVolume * 0.9, now + duration - 0.1);
  masterGain.gain.linearRampToValueAtTime(0, now + duration);
  
  // Start all voices
  voices.forEach(voice => {
    voice.oscillator.start(now);
    voice.oscillator.stop(now + duration);
  });
}

export function play4MeasureSATB() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  const measureDuration = 1.2; // 1.2 seconds per measure
  
  // Get all measure data from input fields
  const measures = [];
  for (let i = 1; i <= 4; i++) {
    // Convert note names to frequencies
    const sopranoNote = document.getElementById(`m${i}_soprano`).value;
    const altoNote = document.getElementById(`m${i}_alto`).value;
    const tenorNote = document.getElementById(`m${i}_tenor`).value;
    const bassNote = document.getElementById(`m${i}_bass`).value;
    
    const soprano = sopranoNote ? NOTE_FREQUENCIES[sopranoNote] || parseFloat(sopranoNote) : 0;
    const alto = altoNote ? NOTE_FREQUENCIES[altoNote] || parseFloat(altoNote) : 0;
    const tenor = tenorNote ? NOTE_FREQUENCIES[tenorNote] || parseFloat(tenorNote) : 0;
    const bass = bassNote ? NOTE_FREQUENCIES[bassNote] || parseFloat(bassNote) : 0;
    
    if (soprano && alto && tenor && bass) {
      measures.push({
        frequencies: [soprano, alto, tenor, bass],
        measure: i
      });
    }
  }
  
  if (measures.length === 0) {
    alert('Please select notes for all voices in at least one measure');
    return;
  }
  
  // Schedule all measures using Web Audio API timing
  measures.forEach((measure, index) => {
    const startTime = index * measureDuration;
    playSATB(measure.frequencies, measureDuration, startTime);
  });
  
  // Visual feedback
  document.getElementById('playSATB').style.background = '#7B1FA2';
  document.getElementById('playSATB').textContent = '🎵 Playing...';
  
  // Reset button after playback
  setTimeout(() => {
    document.getElementById('playSATB').style.background = '#9C27B0';
    document.getElementById('playSATB').textContent = '▶️ Play Composition';
  }, measureDuration * measures.length * 1000);
}

export function initializeAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}