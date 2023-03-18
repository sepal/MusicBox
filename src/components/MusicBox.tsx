// Prompt: Create a component that plays note based on which tile was clicked. Use a major scale, with the lowest row playing a c3 and the highest a c4. It should also have a state that remembers, which note is active based on the tiles that are active on the grid.
// Prompt: Ok, I think I explained it not precise enough. The y coordinate in the grid should define which note to play, ignore the x coordinate for now.
// Prompt: Let's add this button to the Music box component. It should be displayed above the grid.
// Prompt: Now let's use the createMusicalTiming function in the MusicBox component. The Play/Pause button should start and stop the musical timing. The callback function should play a note depending on how the grid is set. The x coordinate should determine when note is played, the y should play which note.
// Prompt: I  encountered two problems, but let's start with the first one:
//         Every second Tile is not played. So if I set for the tiles 0:0 1:1, 2:2 and 3:3 only 0:0 and 2:2 are played, but not 1:1 and 3:3
//         In my example I use x:y for the tile coordinates
// GPT4: I apologize for the issue. The problem is caused by using the default note value of '8n' for `createMusicalTiming`. Since the grid is 8x8, we need to use a sixteenth note ('16n') as the note value to ensure every tile is played. Here's the updated `MusicBox` component with the correct note value:
// Prompt: Ok now the second problem: I can't play polyphonic melodies. So if I set 0:0 and 0:2 only the note for the Tile at 0:0 is played.
// GPT4: I apologize for the oversight. The issue is caused by triggering the notes inside the loop of the callback function. The correct approach is to collect all the notes to be played in the current position and play them simultaneously outside the loop. Here's the updated `MusicBox` component with the correct note triggering:
// Prommpt: I've encountered a new problem: Notes stored in notesToPlay are never removed if I deactivate a Tile.
// GPT4: I apologize for the confusion. The issue occurs because we're not updating the `activeNotes` state when a tile is deactivated. To fix this, we need to update the `handleTileClick` function to remove the deactivated notes from the `activeNotes` state. Here's the updated `MusicBox` component with the correct note removal:
// Prompt: Hmm, this still doesn't work. somehow activeNotes is never updated.
// GPT4: I apologize for the confusion. The issue is caused by the closure in the `createMusicalTiming` callback function, which captures the initial value of `activeNotes`. To fix this, we can use a ref to store the `activeNotes` and ensure that the callback always has access to the latest state. Here's the updated `MusicBox` component with the correct handling of `activeNotes`:

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
  const activeNotesRef = useRef<ActiveNotes>(activeNotes);
  const [isPlaying, setIsPlaying] = useState(false);
  const timingRef = useRef<any>(null);
  const positionRef = useRef<number>(0);

  const handleTileClick = (x: number, y: number, isActive: boolean) => {
    const note = baseNote + majorScale[y];
    if (isActive) {
      setActiveNotes({ ...activeNotes, [`${x}-${y}`]: true });
      playNote(note);
    } else {
      const updatedActiveNotes = { ...activeNotes };
      delete updatedActiveNotes[`${x}-${y}`];
      setActiveNotes(updatedActiveNotes);
    }
  };

  const handlePlayPause = () => {
    if (!timingRef.current) {
      timingRef.current = createMusicalTiming(() => {
        const notesToPlay: number[] = [];
        for (let y = 0; y < 8; y++) {
          if (activeNotesRef.current[`${positionRef.current}-${y}`]) {
            notesToPlay.push(baseNote + majorScale[y]);
          }
        }
        notesToPlay.forEach((note) => playNote(note));
        positionRef.current = (positionRef.current + 1) % 8;
      }, { noteValue: '16n' });
    }

    if (isPlaying) {
      timingRef.current.stop();
    } else {
      timingRef.current.start();
    }
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    activeNotesRef.current = activeNotes;
  }, [activeNotes]);

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

// Usage Example
// import MusicBox from "@/components/MusicBox.tsx";