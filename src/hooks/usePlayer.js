import { useState, useCallback} from 'react'
import { STAGE_WIDTH } from '../gameHelpers';

import { randomTetromino } from '../tetrominos'

export const usePlayer = () =>{
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: randomTetromino().shape,
        collided: false,
    })

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos:{
                 x: (prev.pos.x += x),
                 y: (prev.pos.y += y),
                 collided
                } 
        }))
    }

    //useCallback prevents infinite loop
    //resetPlayer -> 'Player' is acctually tetrominal...
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        })
    },[])


    return [player, updatePlayerPos, resetPlayer]
}