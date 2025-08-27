# 🎵 VoxQuad Audio Engine
## Web Audio API Formant Synthesis Architecture

---

## 🎛️ Audio Synthesis Chain

Each of the four voices (SATB) follows this signal processing chain:

```
Oscillator → Formant F1 → Formant F2 → Lowpass → Gain → Output
```

### Signal Flow Details:

1. **Oscillator**
   - Sawtooth wave
   - Simulates vocal cords
   - Rich harmonics

2. **Formant F1**
   - Peaking filter
   - First resonance
   - Q=10, Gain=12dB

3. **Formant F2**
   - Peaking filter
   - Second resonance
   - Q=15, Gain=8dB

4. **Lowpass**
   - High-cut filter
   - 3kHz cutoff
   - Removes harshness

5. **Gain**
   - Volume control
   - ADSR envelope
   - Voice mixing

6. **Output**
   - Master volume
   - To speakers
   - Final mix

---

## 🎤 Voice Type Characteristics

Each voice type uses different formant scaling factors to simulate vocal tract sizes:

### Soprano
- **Scaling:** 1.2x
- Smaller vocal tract
- Brighter, higher formants
- More resonance

### Alto
- **Scaling:** 1.1x
- Mid-high vocal tract
- Warmer mid-range
- Balanced timbre

### Tenor
- **Scaling:** 1.0x
- Reference size
- Balanced formants
- Natural resonance

### Bass
- **Scaling:** 0.85x
- Larger vocal tract
- Darker, lower formants
- Deep resonance

---

## 📈 ADSR Envelope

Each voice uses a carefully crafted envelope to shape the sound over time:

```
Attack (50ms) → Decay (50ms) → Sustain (Note Duration) → Release (100ms)
```

### Envelope Stages:

1. **ATTACK** - 50ms
   - Fade-in

2. **DECAY** - 50ms
   - To 90%

3. **SUSTAIN** - Note Duration
   - Hold at 90%

4. **RELEASE** - 100ms
   - Fade-out

---

## 🎛️ Formant Synthesis Details

### 🎯 What are Formants?

Formants are resonant frequencies of the human vocal tract that give each vowel sound its characteristic timbre. VoxQuad uses the classic "AH" vowel formants as a base for all voices.

### Formant Configuration:

#### First Formant (F1)
- **Base:** 827 Hz
- Controls vowel openness
- Peaking filter, Q=10

#### Second Formant (F2)
- **Base:** 1542 Hz
- Controls vowel frontness
- Peaking filter, Q=15

#### Source Signal
- Sawtooth oscillator
- Rich in harmonics
- Mimics vocal cord vibration

#### Voice Scaling
- Adjusts formant frequencies
- Simulates vocal tract size
- Creates voice type differences

---

## ⚙️ Technical Specifications

### 🌐 Web Audio API Components
- **OscillatorNode:** Fundamental frequency generation
- **BiquadFilterNode:** Formant resonances (2x peaking)
- **BiquadFilterNode:** High-frequency removal (lowpass)
- **GainNode:** Volume control and envelope shaping

### 🎵 Audio Parameters
- **Sample Rate:** Browser default (usually 44.1kHz)
- **Lowpass Cutoff:** 3kHz (removes harshness)
- **F1 Q Factor:** 10 (narrow resonance)
- **F2 Q Factor:** 15 (very narrow resonance)

### 🎛️ Filter Configuration
- **F1 Gain:** +12dB (prominent resonance)
- **F2 Gain:** +8dB (secondary resonance)
- **Lowpass Q:** 1.0 (gentle rolloff)
- **Voice Separation:** Independent gain nodes

### ⏱️ Timing & Envelope
- **Attack Time:** 50ms (quick fade-in)
- **Decay Time:** 50ms (to 90% volume)
- **Sustain Level:** 90% (held during note)
- **Release Time:** 100ms (fade-out)

---

*This document describes the technical architecture of VoxQuad's formant synthesis engine, which uses Web Audio API to create realistic SATB vocal harmonies.*