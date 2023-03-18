// Prompt: Create a component that plays note based on which tile was clicked. Use a major scale, with the lowest row playing a c3 and the highest a c4. It should also have a state that remembers, which note is active based on the tiles that are active on the grid.
// Prompt: Ok, I think I explained it not precise enough. The y coordinate in the grid should define which note to play, ignore the x coordinate for now.

// File: src/components/MusicBox.tsx
import React, { useState } from 'react';
import Grid from '@/components/Grid';
import { playNote } from '@/lib/audioUtils';

const majorScale = [0, 2, 4, 5, 7, 9, 11, 12];
const baseNote = 48; // C3

interface ActiveNotes {
  [key: string]: boolean;
}

const MusicBox: React.FC = () => {
  const [activeNotes, setActiveNotes] = useState<ActiveNotes>({});

  const handleTileClick = (x: number, y: number, isActive: boolean) => {
    const note = baseNote + majorScale[y];
    setActiveNotes({ ...activeNotes, [`${x}-${y}`]: isActive });

    if (isActive) {
      playNote(note);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Grid onTileClick={handleTileClick} />
    </div>
  );
};

export default MusicBox;

// Usage Example
// import MusicBox from "@/components/MusicBox.tsx";