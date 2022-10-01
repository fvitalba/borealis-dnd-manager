import { RefObject, Ref } from 'react'

export interface ColorPickerProps {
    currentColor: string,
    colorPreviewRef: RefObject<HTMLButtonElement>,
    setDrawColor: (color: string) => void,
}

export interface ColorPickerState {
    xPos: number,
    yPos: number,
}

export interface ColorPickerViewProps {
    currentColor: string,
    colorPickerRef: Ref<HTMLDivElement>,
    colorPickerState: ColorPickerState,
    setDrawColor: (color: string) => void,
}
