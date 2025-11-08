import React from "react";
import { RenderBlocks } from "../RenderBlocks";

export interface GridProps {
  blocks?: any[];
  columns?: number;
  gap?: string;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  blocks = [],
  columns = 3,
  gap = "1.5rem",
  className = "",
}) => {
  return (
    <div
      className={`container grid ${className}`.trim()}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: gap,
      }}
    >
      {blocks && blocks.length > 0 ? <RenderBlocks blocks={blocks} /> : null}
    </div>
  );
};