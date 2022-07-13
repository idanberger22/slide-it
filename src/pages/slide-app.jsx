import { useState, useEffect } from "react"
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from "../constants"
import { shuffle, canSwap, swap, isSolved } from "../slide-service"
import { Tile } from "../cmps/tile"

export function SlideApp() {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()])
    const [isStarted, setIsStarted] = useState(false)

    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE)
    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE)
    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE
    }

    useEffect(() => {
        if (isStarted && isSolved(tiles)){
            setIsStarted(false)
            console.log('you won!')
        } 
    }, [tiles])

    const shuffleTiles = () => {
        setTiles(shuffle(tiles))
    }

    const swapTiles = (tileIndex) => {
        if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
            const swapped = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
            setTiles(swapped)
        }
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
                    handleTileClick={swapTiles}
                />
            ))}
        </ul>
        {!isStarted && <button className="center" onClick={handleStart}>start!</button>}
        {isStarted && <button className="center" onClick={shuffleTiles}>reset</button>}
    </>
    )
}