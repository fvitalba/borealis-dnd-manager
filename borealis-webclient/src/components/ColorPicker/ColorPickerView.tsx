import React from 'react'
import { ColorPickerViewProps } from './types'
import { ColorSelections } from '@/utils/constants'

const ColorPickerView = ({ currentColor, colorPickerRef, colorPickerState, setDrawColor }: ColorPickerViewProps) => {
    return (
        <div className='borealis-color-picker-container' ref={ colorPickerRef } style={{ left: colorPickerState.xPos, top: colorPickerState.yPos, }}>
            { ColorSelections.map((color) => {
                return <div key={ color.bg } className={ (currentColor === color.css ? 'borealis-color-picker-color-selected ' : 'borealis-color-picker-color ') + color.bg } onClick={ () => setDrawColor(color.css) } />
            })
            }
        </div>
    )
}

export default ColorPickerView
