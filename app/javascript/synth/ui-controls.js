import { noteOptions, chordOptions } from 'synth/music-theory';

// Global variables for autocomplete
let currentHighlightedIndex = -1;
let currentOptions = [];

// Store autocomplete instances and current chord selections
const autocompleteInstances = {};
const currentChords = { 1: '', 2: '', 3: '', 4: '' };

// Autocomplete functionality
function createAutocomplete(inputId, options, onSelect, filterFunction = null) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(inputId + '_dropdown');
  
  let currentFilter = filterFunction ? filterFunction() : [];
  
  function showOptions(query = '') {
    // Apply filtering if provided
    let filteredOptions = filterFunction ? 
      options.filter(opt => filterFunction().length === 0 || filterFunction().some(filter => 
        opt.searchText ? opt.searchText.toLowerCase().includes(filter.toLowerCase()) : 
        opt.text.toLowerCase().includes(filter.toLowerCase())
      )) : options;
    
    // Apply search query filter
    if (query) {
      filteredOptions = filteredOptions.filter(opt => 
        opt.text.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    currentOptions = filteredOptions.slice(0, 8); // Limit to 8 options
    currentHighlightedIndex = -1;
    
    if (currentOptions.length === 0) {
      dropdown.style.display = 'none';
      return;
    }
    
    dropdown.innerHTML = '';
    currentOptions.forEach((option, index) => {
      const div = document.createElement('div');
      div.className = 'autocomplete-option';
      div.textContent = option.text;
      div.addEventListener('click', () => {
        selectOption(option);
      });
      dropdown.appendChild(div);
    });
    
    dropdown.style.display = 'block';
  }
  
  function selectOption(option) {
    input.value = option.text;
    dropdown.style.display = 'none';
    onSelect(option);
  }
  
  function hideDropdown() {
    setTimeout(() => {
      dropdown.style.display = 'none';
    }, 150); // Small delay to allow clicks
  }
  
  // Event listeners
  input.addEventListener('input', (e) => {
    showOptions(e.target.value);
  });
  
  input.addEventListener('focus', () => {
    showOptions(input.value);
  });
  
  input.addEventListener('blur', hideDropdown);
  
  input.addEventListener('keydown', (e) => {
    if (dropdown.style.display === 'none') return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentHighlightedIndex = Math.min(currentHighlightedIndex + 1, currentOptions.length - 1);
      updateHighlight();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentHighlightedIndex = Math.max(currentHighlightedIndex - 1, -1);
      updateHighlight();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentHighlightedIndex >= 0) {
        selectOption(currentOptions[currentHighlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      dropdown.style.display = 'none';
    }
  });
  
  function updateHighlight() {
    const options = dropdown.children;
    for (let i = 0; i < options.length; i++) {
      options[i].classList.toggle('highlighted', i === currentHighlightedIndex);
    }
  }
  
  return {
    updateFilter: (newFilterFunction) => {
      filterFunction = newFilterFunction;
      if (input === document.activeElement) {
        showOptions(input.value);
      }
    },
    setValue: (value) => {
      const option = options.find(opt => opt.value === value || opt.text === value);
      if (option) {
        input.value = option.text;
        onSelect(option);
      }
    }
  };
}

// Initialize all UI controls
export function initializeUI() {
  // Initialize chord autocompletes
  for (let i = 1; i <= 4; i++) {
    autocompleteInstances[`chord_m${i}`] = createAutocomplete(
      `chord_m${i}`,
      chordOptions,
      (option) => {
        currentChords[i] = option.value;
        // Chord selection is now purely informational - no filtering
      }
    );
  }
  
  // Initialize voice autocompletes for all measures and voices (no filtering)
  const voiceNames = ['soprano', 'alto', 'tenor', 'bass'];
  for (let measure = 1; measure <= 4; measure++) {
    voiceNames.forEach(voice => {
      const inputId = `m${measure}_${voice}`;
      autocompleteInstances[inputId] = createAutocomplete(
        inputId,
        noteOptions,
        (option) => {
          // Note selected - no additional action needed
        }
        // No filter function - all notes always available
      );
    });
  }
  
  // Set initial values from the image progression
  autocompleteInstances['chord_m1'].setValue('G Major');
  autocompleteInstances['chord_m2'].setValue('F Major');
  autocompleteInstances['chord_m3'].setValue('F minor');
  autocompleteInstances['chord_m4'].setValue('C Major');
  
  // Set initial note values to match the image
  autocompleteInstances['m1_soprano'].setValue('D5');
  autocompleteInstances['m1_alto'].setValue('B3');
  autocompleteInstances['m1_tenor'].setValue('G4');
  autocompleteInstances['m1_bass'].setValue('G2');
  
  autocompleteInstances['m2_soprano'].setValue('C5');
  autocompleteInstances['m2_alto'].setValue('C4');
  autocompleteInstances['m2_tenor'].setValue('F4');
  autocompleteInstances['m2_bass'].setValue('A2');
  
  autocompleteInstances['m3_soprano'].setValue('C5');
  autocompleteInstances['m3_alto'].setValue('F4');
  autocompleteInstances['m3_tenor'].setValue('G#4/Ab4');
  autocompleteInstances['m3_bass'].setValue('G#2/Ab2');
  
  autocompleteInstances['m4_soprano'].setValue('C5');
  autocompleteInstances['m4_alto'].setValue('E4');
  autocompleteInstances['m4_tenor'].setValue('G4');
  autocompleteInstances['m4_bass'].setValue('C2');
}

// Initialize master volume display
export function initializeVolumeControls() {
  document.getElementById('masterVolume').addEventListener('input', (e) => {
    document.getElementById('masterVolumeValue').textContent = e.target.value + '%';
  });
}