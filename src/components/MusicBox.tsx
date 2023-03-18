// Prompt: Create a component that plays note based on which tile was clicked. Use a major scale, with the lowest row playing a c3 and the highest a c4. It should also have a state that remembers, which note is active based on the tiles that are active on the grid.
// Prompt: Ok, I think I explained it not precise enough. The y coordinate in the grid should define which note to play, ignore the x coordinate for now.
// Prompt: Let's add this button to the Music box component. It should be displayed above the grid.
// Prompt: Now let's use the createMusicalTiming function in the MusicBox component. The Play/Pause button should start and stop the musical timing. The callback function should play a note depending on how the grid is set. The x coordinate should determine when note is played, the y should play which note.

// File: src/components/MusicBox.tsx
import React, { useState, useRef } from 'react';
import Grid from '@/components/Grid';
import { playNote } from '@/lib/audioUtils';
import PlayPauseButton from '@/components/PlayPauseButton';
import { createMusicalTiming } from '@/lib/musicalTiming';

const majorScale = [0, 2, 4, 5, 7, 9, 11, 12];
const baseNote = 48; // C3

interface ActiveNotes {
  [key: string]: boolean;
}

const MusicBox: React.FC = () => {
  const [activeNotes, setActiveNotes] = useState<ActiveNotes>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const timingRef = useRef<any>(null);
  const positionRef = useRef<number>(0);

  const handleTileClick = (x: number, y: number, isActive: boolean) => {
    const note = baseNote + majorScale[y];
    setActiveNotes({ ...activeNotes, [`${x}-${y}`]: isActive });

    if (isActive) {
      playNote(note);
    }
  };

  const handlePlayPause = () => {
    if (!timingRef.current) {
      timingRef.current = createMusicalTiming(() => {
        for (let y = 0; y < 8; y++) {
          if (activeNotes[`${positionRef.current}-${y}`]) {
            playNote(baseNote + majorScale[y]);
          }
        }
        positionRef.current = (positionRef.current + 1) % 8;
      });
    }

    if (isPlaying) {
      timingRef.current.stop();
    } else {
      timingRef.current.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <PlayPauseButton onClick={handlePlayPause} isPlaying={isPlaying} />
      <div className="mt-4">
        <Grid onTileClick={handleTileClick} />
      </div>
    </div>
  );
};

export default MusicBox;