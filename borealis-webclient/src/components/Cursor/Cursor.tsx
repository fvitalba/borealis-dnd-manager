import React from 'react'
import { BorealisCursor } from '@/styles/Icons'
import { CursorProps } from './types'

const CursorView = ({ cursor }: CursorProps) => {
    const divStyle = {
        top: cursor.y,
        left: cursor.x,
    }

    return (
        <div style={ divStyle } className='borealis-cursor' >
            <BorealisCursor fill='white' className='mx-auto' />
            <div className='borealis-cursor-name'>{ cursor.username }</div>
        </div>
    )
}

export default CursorView
