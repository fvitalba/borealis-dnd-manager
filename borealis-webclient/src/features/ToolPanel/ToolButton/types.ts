import ControlTool from '@/enums/Tool'
import { SettingsState } from '@/reducers/settingsReducer'

export interface ToolButtonProps {
    title: string,
    value: JSX.Element,
    controlTools: Array<ControlTool>,
    settingsState: SettingsState,
    setToolSettings: (newTool: ControlTool) => void,
}
