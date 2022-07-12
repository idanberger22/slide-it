import { useState } from "react"
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from "../constants"
import { shuffle, canSwap, swap } from "../slide-service"
import { Tile } from "../cmps/tile"

export function SlideApp() {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()])
    const [isSolved, setIsSolved] = useState(false)
    const [isStarted, setIsStarted] = useState(false)

    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE)
    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE)
    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE
    }

    const shuffleTiles = () => {
        setTiles(shuffle(tiles))
        console.log(tiles)
    }

    const swapTiles = (tileIndex) => {
        if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
            const swapped = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
            console.log(swapped)
            setTiles(swapped)
        }
    }

    const handleTileClick = (index) => {
        swapTiles(index)
    }

    const handleShuffleClick = () => {
        shuffleTiles()
    }

    const handleStart = () => {
        shuffleTiles()
        setIsStarted(true)
    }

    return (<>
        <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
        {!isStarted && <button className="center" onClick={handleStart}>start!</button>}
        {isStarted && <button className="center" onClick={handleShuffleClick}>reset</button>}
    </>
    )
}