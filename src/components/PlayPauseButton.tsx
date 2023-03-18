// Prompt: Please create a new play/pause button component. Initially it should say "Play" and use an appropriate emoji. If it's clicked, it should say pause and have the different appropriate emoji.

// File: src/components/PlayPauseButton.tsx
import React, { useState } from 'react';

const PlayPauseButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
      onClick={handleClick}
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