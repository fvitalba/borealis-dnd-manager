import React from 'react'
import Cursor from '../classes/Cursor'
import { CursorAltOutlineIcon } from './Icons'

interface CursorProps {
    cursor: Cursor,
}

const CursorView = ({ cursor }: CursorProps) => {
    const divStyle = {
        top: cursor.y,
        left: cursor.x,
    }

    return (
        <div style={ divStyle } className='cursor' >
            <CursorAltOutlineIcon />
            { cursor.username }
        </div>
    )
}

export default CursorView
