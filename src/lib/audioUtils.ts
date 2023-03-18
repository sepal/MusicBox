// Prompt: Let's create a utility file, that allows me to play a tone based on a given midi note number. The tone should sound similar to a kalimba.

// File: src/lib/audioUtils.ts
import * as Tone from 'tone';

const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0.01,
    decay: 1,
    sustain: 0,
    release: 1,
  },
}).toDestination();

export const playNote = (midiNote: number) => {
  const note = Tone.Frequency(midiNote, 'midi').toNote();
  synth.triggerAttackRelease(note, '8n');
};

// Usage Example
// import { playNote } from "@/lib/audioUtils";
// playNote(60); // Plays a C4 note