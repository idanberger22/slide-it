import { TILE_COUNT, GRID_SIZE } from "../constants"
import { getMatrixPosition, getVisualPosition } from '../slide-service.js'
import { Motion, spring } from 'react-motion'
export function Tile(props) {
  const { tile, width, height, index, handleTileClick } = props
  const { row, col } = getMatrixPosition(index)
  const visualPos = getVisualPosition(row, col, width, height)
  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y)
  }

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            width: `calc(100%/${GRID_SIZE})`,
            height: `calc(100%/${GRID_SIZE})`,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
          }}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {tile + 1}
        </li>
      )}
    </Motion>
  );

}