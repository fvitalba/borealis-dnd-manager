import React from 'react'
import { ColorPickerViewProps } from './types'
import { ColorSelections } from '@/utils/constants'

const ColorPickerView = ({ currentColor, colorPickerRef, colorPickerState, setDrawColor }: ColorPickerViewProps) => {
    return (
        <div className='color-picker-container' ref={ colorPickerRef } style={{ left: colorPickerState.xPos, top: colorPickerState.yPos, }}>
            { ColorSelections.map((color) => {
                return <div key={ color.bg } className={ (currentColor === color.css ? 'color-picker-color-selected ' : 'color-picker-color ')+color.bg } onClick={ () => setDrawColor(color.css) } />
            })
            }
        </div>
    )
}

export default ColorPickerView
