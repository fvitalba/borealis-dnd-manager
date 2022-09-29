import React from 'react'
import { CursorAltOutlineIcon } from '@/views/Icons'
import { CursorProps } from './types'

const CursorView = ({ cursor }: CursorProps) => {
    const divStyle = {
        top: cursor.y,
        left: cursor.x,
    }

    return (
        <div style={ divStyle } className='borealis-cursor' >
            <CursorAltOutlineIcon />
            { cursor.username }
        </div>
    )
}

export default CursorView
