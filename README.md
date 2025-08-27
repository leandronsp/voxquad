# VoxQuad 🎵

A browser-based SATB (Soprano, Alto, Tenor, Bass) voice synthesizer that lets you create four-part vocal harmonies using Web Audio synthesis.

![VoxQuad Screenshot](docs/images/voxquad-screenshot.png)

VoxQuad simulates a vocal quartet right in your browser. Using formant synthesis technology, it creates sounds for four different voice types, allowing you to compose and play back harmonic progressions.

## Features

- **4-Voice Synthesis**: Soprano, Alto, Tenor, and Bass voices with synthetic formants
- **Interactive Matrix**: Visual grid for composing 4-measure progressions  
- **Smart Autocomplete**: Quick note and chord selection
- **Real-time Playback**: Instant audio feedback with Web Audio API
- **Individual Voice Control**: Adjust volume for each voice independently

## Quick Start

### Prerequisites
- Ruby 3.4+
- Rails 8.0+

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/voxquad.git
cd voxquad
```

2. Install dependencies
```bash
bundle install
```

3. Start the server
```bash
rails server
```

4. Open your browser to `http://localhost:3000`

## How to Use

### Creating a Composition

1. **Select Chords** (optional): Choose a chord for each measure to guide your harmony
2. **Choose Notes**: Click on each voice box to select notes for each measure
3. **Play**: Click the "Play Composition" button to hear your creation

### Voice Controls

- **Master Volume**: Controls overall playback volume
- **Individual Voices**: Adjust the mix of Soprano, Alto, Tenor, and Bass

### Tips

- The default progression (G-F-Fm-C) demonstrates a classic harmonic movement
- Try keeping common tones between chords for smoother voice leading
- Bass notes typically match the chord root for stability

## Technology Stack

- **Rails 8**: Modern web framework with importmap for JavaScript
- **Web Audio API**: Browser-native audio synthesis
- **Custom CSS**: Clean, purpose-built styling
- **No Database**: Pure client-side application
- **Formant Synthesis**: Acoustic modeling for vocal sounds

## Project Structure

```
app/
├── javascript/
│   ├── synth.js           # Main orchestrator
│   └── synth/
│       ├── music-theory.js # Notes, chords, frequencies
│       ├── audio-engine.js # Sound synthesis
│       └── ui-controls.js  # User interface
├── views/synth/
│   └── playground.html.erb # Main UI
└── assets/stylesheets/
    └── synth.css          # Custom styles
```

## Development

The app uses Rails' importmap for JavaScript modules - no webpack or node_modules needed!

To add new features:
1. Identify the appropriate module (music-theory, audio-engine, or ui-controls)
2. Add your code to that module
3. Import what you need using Rails importmap conventions

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT

---

Built with ♪ by @leandronsp. All code and assets are MIT licensed.
