import { RefObject } from 'react'
import ControlTool from '@/enums/Tool'
import Game from '@/classes/Game'
import { SettingsState } from '@/reducers/settingsReducer'

export interface ToolControlsProps {
    gameState: Game,
    settingsState: SettingsState,
    setToolSettings: (arg0: ControlTool) => void,
    setDrawToolSettings: (arg0: string, arg1: number) => void,
    setFogToolSettings: (arg0: number, arg1: number) => void,
    resetFog: (arg0: number) => void,
    resetDraw: (arg0: number) => void,
}

export interface ToolControlsViewProps {
    tool: ControlTool,
    setTool: (arg0: ControlTool) => void,
    drawColor: string,
    setDrawColor: (arg0: string) => void,
    drawColorRef: RefObject<HTMLButtonElement>,
    showColorPicker: boolean,
    toggleColorPicker: () => void,
    drawSize: number,
    setDrawSize: (arg0: number) => void,
    fogRadius: number,
    setFogRadius: (arg0: number) => void,
    resetFog: () => void,
    resetDrawing: () => void,
}
