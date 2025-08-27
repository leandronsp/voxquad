// VoxQuad SATB Synthesizer - Main orchestrator
import { initializeAudioContext, play4MeasureSATB } from 'synth/audio-engine';
import { initializeUI, initializeVolumeControls } from 'synth/ui-controls';

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI controls and autocomplete
  initializeUI();
  
  // Initialize volume controls
  initializeVolumeControls();

  // Add 4-Measure SATB playback
  document.getElementById('playSATB').addEventListener('click', () => {
    initializeAudioContext();
    play4MeasureSATB();
  });
});
