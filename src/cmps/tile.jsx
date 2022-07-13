import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "../constants"
import { getMatrixPosition, getVisualPosition } from '../slide-service.js'
import { Motion, spring } from 'react-motion'

export function Tile(props) {
  const { tile, width, height, index, handleTileClick, imgURL } = props
  const { row, col } = getMatrixPosition(index)
  const visualPos = getVisualPosition(row, col, width, height)

  return (
    <Motion style={{translateX: spring(visualPos.x),translateY: spring(visualPos.y)}}>
      {({ translateX, translateY }) => (
        <li
          style={{
            width: `calc(100%/${GRID_SIZE})`,
            height: `calc(100%/${GRID_SIZE})`,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            backgroundImage: `url(${imgURL})`,
            backgroundSize: BOARD_SIZE + 'px',
            backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(tile / GRID_SIZE))}%`,
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
          }}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {!imgURL && `${tile + 1}`}
        </li>
      )}
    </Motion>
  );

}