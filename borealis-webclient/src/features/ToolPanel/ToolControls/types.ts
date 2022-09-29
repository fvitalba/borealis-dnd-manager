import { RefObject } from 'react'
import ControlTool from '@/enums/Tool'
import Game from '@/classes/Game'
import { SettingsState } from '@/reducers/settingsReducer'

export interface ToolControlsProps {
    gameState: Game,
    settingsState: SettingsState,
    setToolSettings: (newTool: ControlTool) => void,
    setDrawToolSettings: (newDrawColor: string, newDrawSize: number) => void,
    setFogToolSettings: (newFogOpacity: number, newFogRadius: number) => void,
    resetFog: (mapIdToReset: number) => void,
    resetDraw: (mapIdToReset: number) => void,
}

export interface ToolControlsViewProps {
    tool: ControlTool,
    setTool: (newTool: ControlTool) => void,
    drawColor: string,
    setDrawColor: (newColor: string) => void,
    drawColorRef: RefObject<HTMLButtonElement>,
    showColorPicker: boolean,
    toggleColorPicker: () => void,
    drawSize: number,
    setDrawSize: (newSize: number) => void,
    fogRadius: number,
    setFogRadius: (newSize: number) => void,
    resetFog: () => void,
    resetDrawing: () => void,
}
