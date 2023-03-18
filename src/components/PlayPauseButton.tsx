// Prompt: Please create a new play/pause button component. Initially it should say "Play" and use an appropriate emoji. If it's clicked, it should say pause and have the different appropriate emoji.
// Prompt: Now let's use the createMusicalTiming function in the MusicBox component. The Play/Pause button should start and stop the musical timing. The callback function should play a note depending on how the grid is set. The x coordinate should determine when note is played, the y should play which note.
// GPT4: Adjust PlayPauseButton.tsx to accept the new props

// File: src/components/PlayPauseButton.tsx
import React from 'react';

interface PlayPauseButtonProps {
  onClick: () => void;
  isPlaying: boolean;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  onClick,
  isPlaying,
}) => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
      onClick={onClick}
    >
      {isPlaying ? (
        <>
          <span role="img" aria-label="Pause">
            ⏸️
          </span>{' '}
          Pause
        </>
      ) : (
        <>
          <span role="img" aria-label="Play">
            ▶️
          </span>{' '}
          Play
        </>
      )}
    </button>
  );
};

export default PlayPauseButton;

// Usage Example
// import PlayPauseButton from "@/components/PlayPauseButton.tsx";