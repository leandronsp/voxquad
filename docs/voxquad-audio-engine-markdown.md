# 🎵 VoxQuad Audio Engine

**Web Audio API Formant Synthesis Architecture**

VoxQuad simulates a vocal quartet using advanced formant synthesis techniques built on the Web Audio API. This document details the technical implementation of the audio engine that powers the four-voice SATB synthesis.

---

## 🎛️ Audio Synthesis Chain

Each of the four voices (SATB) follows this signal processing chain:

```
[Oscillator] → [Formant F1] → [Formant F2] → [Lowpass] → [Gain] → [Output]
```

### 1. **Oscillator Node**
- **Type**: Sawtooth wave
- **Purpose**: Simulates vocal cord vibration
- **Characteristics**: Rich in harmonics, provides fundamental frequency

### 2. **Formant F1 (First Formant)**
- **Type**: Peaking filter
- **Purpose**: First resonance of vocal tract
- **Parameters**: Q=10, Gain=+12dB
- **Base Frequency**: 827Hz (scaled per voice type)

### 3. **Formant F2 (Second Formant)**
- **Type**: Peaking filter  
- **Purpose**: Second resonance of vocal tract
- **Parameters**: Q=15, Gain=+8dB
- **Base Frequency**: 1542Hz (scaled per voice type)

### 4. **Lowpass Filter**
- **Type**: High-cut filter
- **Purpose**: Removes harsh high frequencies
- **Cutoff**: 3kHz
- **Q Factor**: 1.0 (gentle rolloff)

### 5. **Gain Node**
- **Purpose**: Volume control and ADSR envelope
- **Function**: Individual voice mixing and master output

---

## 🎤 Voice Type Characteristics

Each voice type uses different formant scaling factors to simulate various vocal tract sizes:

| Voice Type | Scaling Factor | Characteristics |
|------------|---------------|-----------------|
| **Soprano** | 1.2x | Smaller vocal tract, brighter/higher formants, more resonance |
| **Alto** | 1.1x | Mid-high vocal tract, warmer mid-range, balanced timbre |
| **Tenor** | 1.0x | Reference size, balanced formants, natural resonance |
| **Bass** | 0.85x | Larger vocal tract, darker/lower formants, deep resonance |

### Formant Frequency Calculation
```javascript
const f1 = baseFormants[0] * scalingFactor;  // First formant
const f2 = baseFormants[1] * scalingFactor;  // Second formant
```

---

## 📈 ADSR Envelope

Each voice uses a carefully crafted envelope to shape the sound over time:

```
Volume
  ↑
100%|    ╱╲____________________╲
    |   ╱  ╲                    ╲
 90%|  ╱    ╲__________________  ╲
    | ╱      ╲                 ╲  ╲
  0%|╱        ╲                 ╲  ╲___
    └─────────────────────────────────────→ Time
     A  D    S U S T A I N       R
```

### Envelope Stages

1. **ATTACK** (50ms)
   - Quick fade-in from silence to full volume
   - Creates natural note onset

2. **DECAY** (50ms) 
   - Slight drop from peak to 90% volume
   - Mimics natural vocal behavior

3. **SUSTAIN** (Note Duration)
   - Held at 90% volume for entire note duration
   - Maintains consistent vocal presence

4. **RELEASE** (100ms)
   - Smooth fade-out to silence
   - Natural note ending

---

## 🎛️ Formant Synthesis Details

### What are Formants?

Formants are resonant frequencies of the human vocal tract that give each vowel sound its characteristic timbre. VoxQuad uses the classic **"AH"** vowel formants as a base for all voices.

### Formant Configuration

#### **First Formant (F1) - 827Hz Base**
- Controls vowel "openness"
- Implemented as peaking filter with Q=10
- Higher gain (+12dB) for prominence
- Scaled by voice type multiplier

#### **Second Formant (F2) - 1542Hz Base**  
- Controls vowel "frontness/backness"
- Implemented as peaking filter with Q=15
- Lower gain (+8dB) for balance
- Scaled by voice type multiplier

#### **Source Signal**
- Sawtooth oscillator provides rich harmonic content
- Mimics the complex waveform of vocal cord vibration
- Fundamental frequency set to musical note

#### **Voice Scaling**
- Adjusts formant frequencies proportionally
- Simulates different vocal tract sizes
- Creates authentic voice type differences

---

## ⚙️ Technical Specifications

### Web Audio API Components

- **OscillatorNode**: Fundamental frequency generation
- **BiquadFilterNode**: Formant resonances (2× peaking filters)
- **BiquadFilterNode**: High-frequency removal (lowpass filter)
- **GainNode**: Volume control and envelope shaping

### Audio Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| **Sample Rate** | Browser default (44.1kHz) | Audio quality |
| **Lowpass Cutoff** | 3kHz | Remove harshness |
| **F1 Q Factor** | 10 | Narrow resonance |
| **F2 Q Factor** | 15 | Very narrow resonance |

### Filter Configuration

| Filter | Type | Frequency | Q | Gain |
|--------|------|-----------|---|------|
| **F1** | Peaking | 827Hz × scale | 10 | +12dB |
| **F2** | Peaking | 1542Hz × scale | 15 | +8dB |
| **Lowpass** | Lowpass | 3kHz | 1.0 | 0dB |

### Timing & Envelope

| Stage | Duration | Level | Curve |
|-------|----------|-------|-------|
| **Attack** | 50ms | 0% → 100% | Linear ramp |
| **Decay** | 50ms | 100% → 90% | Linear ramp |
| **Sustain** | Note duration | 90% | Constant |
| **Release** | 100ms | 90% → 0% | Linear ramp |

---

## 🔧 Implementation Architecture

### Code Structure
```
javascript/synth/
├── audio-engine.js     # Core synthesis logic
├── music-theory.js     # Note/chord definitions  
├── ui-controls.js      # User interface handlers
└── synth.js           # Main orchestrator
```

### Key Web Audio API Usage

1. **AudioContext**: Main audio processing context
2. **Node Graph**: Modular audio processing chain
3. **Automation**: Precise timing for envelopes and scheduling
4. **Real-time Processing**: Live audio synthesis and mixing

### Browser Compatibility

- Modern browsers with Web Audio API support
- No external dependencies or plugins required
- Pure JavaScript implementation
- Responsive audio performance

---

## 🎼 Musical Applications

### Voice Leading
- Independent control of each SATB voice
- Realistic vocal timbre simulation  
- Harmonic progression support

### Educational Use
- Demonstrates formant synthesis concepts
- Shows acoustic modeling techniques
- Practical Web Audio API implementation

### Performance
- Real-time synthesis capabilities
- Low-latency audio generation
- Efficient CPU usage through Web Audio API optimization

---

## 📚 References

- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Formant Synthesis Wikipedia](https://en.wikipedia.org/wiki/Formant)
- [OscillatorNode Reference](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)
- [BiquadFilterNode Guide](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode)
- [ADSR Envelope Theory](https://en.wikipedia.org/wiki/Envelope_(music))

---

*Built with ♪ by @leandronsp. Technical documentation for VoxQuad's formant synthesis engine.*