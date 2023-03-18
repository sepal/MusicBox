// Prompt: Help me create an app call MusicBox, that will allow users to create short melodies using a 8x8 grid. Let's start with the tile component for the grid. Users should be square with rounded cornerns, that users can click to activate or deactivate it. Use a light yellow for the active for when the tile is active and a light gray if it's inactive
// Prompt: I get an error when I click a tile: ReferenceError: isActive is not defined

// File: src/components/Tile.tsx
import React, { useState } from 'react';

interface TileProps {
  onClick?: (isActive: boolean) => void;
}

const Tile: React.FC<TileProps> = ({ onClick }) => {
  const [active, setActive] = useState(false);

  const handleTileClick = () => {
    setActive(!active);
    if (onClick) {
      onClick(!active);
    }
  };

  return (
    <button
      className={`w-10 h-10 rounded-md focus:outline-none ${
        active ? 'bg-yellow-200' : 'bg-gray-200'
      }`}
      onClick={handleTileClick}
    ></button>
  );
};

export default Tile;