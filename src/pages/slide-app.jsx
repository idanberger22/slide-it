import { useState, useEffect } from "react"
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from "../constants"
import { shuffle, canSwap, swap, isSolved } from "../slide-service"
import { Tile } from "../cmps/tile"
import Confetti from 'react-confetti'

export function SlideApp() {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()])
    const [isStarted, setIsStarted] = useState(false)
    const [isWon,setIsWon] = useState(false)

    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE)
    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE)
    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE
    }

    useEffect(() => {
        if (isStarted && isSolved(tiles)){
            setIsStarted(false)
            setIsWon(true)
            removeConfetti()
        } 
    }, [tiles])

    const shuffleTiles = () => {
        setTiles(shuffle(tiles))
    }

    const win = ()=>{
        setTiles([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
    }

    const swapTiles = (tileIndex) => {
        if(!isStarted) return
        if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
            const swapped = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
            setTiles(swapped)
        }
    }

    const handleStart = () => {
        shuffleTiles()
        setIsStarted(true)
    }

    const removeConfetti=()=>{
        setTimeout(setIsWon,5000,false)
    }

    return (<>
    {isWon && <Confetti
      width={window.clientWidth}
      height={window.clientHeight}
    />}
    
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
        <button onClick={win}>win</button>
    </>
    )
}