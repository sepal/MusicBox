// Prompt: Let's create a utility file, that allows me to play a tone based on a given midi note number. The tone should sound similar to a kalimba.
// Prompt: Nice that worked. Now let's fix an issue with the sound: It sounds very distorted, but I want a clean sound, even if multiple notes are played at once.
// GPT4: The distortion might be caused by overlapping notes with high gain. To fix this issue, we can adjust the `PolySynth` settings to have a lower gain and smoother sound. Let's update the `audioUtils.ts` file to make these changes:
// Prompt: The sound is still distorted, even for a single note.
// GPT4: I apologize for the confusion. To further reduce distortion and produce a cleaner sound, we can adjust the `gain` value in the `audioUtils.ts` file. Additionally, we can change the oscillator type to `'triangle'` for a smoother sound. Here's the updated `audioUtils.ts` file:

// File: src/lib/audioUtils.ts
import * as Tone from 'tone';

const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 0.01,
    decay: 1,
    sustain: 0.1,
    release: 1,
  },
}).toDestination();

synth.volume.value = -20; // Lower the gain value (in dB) to reduce distortion

export const playNote = (midiNote: number) => {
  const note = Tone.Frequency(midiNote, 'midi').toNote();
  synth.triggerAttackRelease(note, '8n');
};

// Usage Example
// import { playNote } from "@/lib/audioUtils";
// playNote(60); // Plays a C4 note

// GPT4: Now the sound should be cleaner and less distorted when multiple notes are played simultaneously.
// GPT4: Now the sound should be cleaner and less distorted, even when multiple notes are played simultaneously.