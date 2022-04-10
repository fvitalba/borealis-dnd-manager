
import React, { useEffect, useRef, useState } from 'react'
import ColorPickerView from '../views/ColorPickerView'

interface ColorPickerProps {
    currentColor: string,
    colorPreviewRef: React.RefObject<HTMLButtonElement>,
    setDrawColor: () => void,
}

const ColorPicker = ({ currentColor, colorPreviewRef, setDrawColor }: ColorPickerProps) => {
    const [colorPickerState, setColorPickerState] = useState({
        xPos: 0,
        yPos: 0,
    })
    const colorPickerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (colorPreviewRef?.current && colorPickerRef.current) {
            const newXPos = colorPreviewRef.current.offsetLeft + Math.floor(colorPreviewRef.current.offsetWidth / 2) - Math.floor(colorPickerRef.current.offsetWidth / 2)
            const newYPos = colorPreviewRef.current.offsetTop + colorPreviewRef.current.offsetHeight + 5
            setColorPickerState({
                ...colorPickerState,
                xPos: newXPos,
                yPos: newYPos,
            })
        }
    }, [ colorPreviewRef.current, colorPickerRef.current ])

    return (
        <ColorPickerView currentColor={ currentColor } colorPickerRef={ colorPickerRef } colorPickerState={ colorPickerState } setDrawColor={ setDrawColor } />
    )
}

export default ColorPicker
