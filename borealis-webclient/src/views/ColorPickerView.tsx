import React, { Ref } from 'react'
import { ColorPickerState } from '../components/ColorPicker'
import { ColorSelections } from '../utils/constants'

interface ColorPickerViewProps {
    currentColor: string,
    colorPickerRef: Ref<HTMLDivElement>,
    colorPickerState: ColorPickerState,
    setDrawColor: (arg0: string) => void,
}

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
