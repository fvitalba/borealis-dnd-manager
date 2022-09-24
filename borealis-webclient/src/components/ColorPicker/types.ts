import { RefObject, Ref } from 'react'

export interface ColorPickerProps {
    currentColor: string,
    colorPreviewRef: RefObject<HTMLButtonElement>,
    setDrawColor: (arg0: string) => void,
}

export interface ColorPickerState {
    xPos: number,
    yPos: number,
}

export interface ColorPickerViewProps {
    currentColor: string,
    colorPickerRef: Ref<HTMLDivElement>,
    colorPickerState: ColorPickerState,
    setDrawColor: (arg0: string) => void,
}
