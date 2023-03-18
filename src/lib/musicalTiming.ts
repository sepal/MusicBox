// Prompt: Now I need a utility function, that will allow me trigger another callback function based on musical timing. It should allow me to set the beats per minutes, by default it should be 120, change note value, which changes when the callback functions is called. Default value should be an eight note. The beat type, e.g. if it's a 4/4 or 3/4, .. beat. The amount of swing between the notes.

// File: src/lib/musicalTiming.ts
import * as Tone from 'tone';

interface MusicalTimingOptions {
  bpm?: number;
  noteValue?: string;
  beatType?: number;
  swing?: number;
}

export const createMusicalTiming = (
  callback: () => void,
  options: MusicalTimingOptions = {}
) => {
  const { bpm = 120, noteValue = '8n', beatType = 4, swing = 0 } = options;

  Tone.Transport.bpm.value = bpm;
  Tone.Transport.timeSignature = beatType;
  Tone.Transport.swing = swing;

  const loop = new Tone.Loop((time) => {
    callback();
    Tone.Draw.schedule(() => {
      // This will be invoked on the next animation frame
    }, time);
  }, noteValue);

  return {
    start: () => {
      Tone.start();
      Tone.Transport.start();
      loop.start(0);
    },
    stop: () => {
      Tone.Transport.stop();
      loop.stop();
    },
  };
};

// Usage Example
// import { createMusicalTiming } from "@/lib/musicalTiming";
// const timing = createMusicalTiming(myCallbackFunction, { bpm: 120, noteValue: '8n', beatType: 4, swing: 0 });
// timing.start();
// timing.stop();