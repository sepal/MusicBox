// Prompt: Create the 8x8 grid component based on Tile component. Add a prop function, that is called as soon as a tile is clicked. It should return which tile was clicked as x and y coordinates and if the tile was activated or deactivated.
// Prompt: I get an error when I click a tile: ReferenceError: isActive is not defined

// File: src/components/Grid.tsx
import React from 'react';
import Tile from '@/components/Tile';

interface GridProps {
  onTileClick: (x: number, y: number, isActive: boolean) => void;
}

const Grid: React.FC<GridProps> = ({ onTileClick }) => {
  const renderTiles = () => {
    const tiles = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        tiles.push(
          <Tile
            key={`${x}-${y}`}
            onClick={(isActive) => onTileClick(x, y, isActive)}
          />
        );
      }
    }
    return tiles;
  };

  return (
    <div className="grid grid-cols-8 gap-2">
      {renderTiles()}
    </div>
  );
};

export default Grid;

// Usage Example
// import Grid from "@/components/Grid.tsx";