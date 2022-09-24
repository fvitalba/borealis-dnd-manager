import React, { RefObject } from 'react'
import { ColorPicker } from '../../components/ColorPicker'
import ControlTool from '../../enums/Tool'
import ActionButton from '../GenericViews/ActionButton'
import ControlPanelRow from '../GenericViews/ControlPanelRow'
import ToggleButton from '../GenericViews/ToggleButton'
import NumberInput from '../GenericViews/NumberInput'
import {
    BorealisFreeHandDrawIcon,
    BorealisFreeHandEreaseIcon,
    BorealisColorPickerIcon,
    BorealisResetDrawingsIcon,
    BorealisResetFogIcon,
} from '../Icons'

interface ToolControlsViewProps {
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

const ToolControlsView = ({ tool, setTool, drawColor, setDrawColor, drawColorRef, showColorPicker, toggleColorPicker, drawSize, setDrawSize, fogRadius, setFogRadius, resetFog, resetDrawing }: ToolControlsViewProps) => {
    const toggleEreaseTool = () => {
        switch (tool) {
        case ControlTool.Draw:
            setTool(ControlTool.EreaseDraw)
            break
        case ControlTool.EreaseDraw:
            setTool(ControlTool.Draw)
            break
        }
    }

    switch (tool) {
    case ControlTool.Draw:
    case ControlTool.EreaseDraw:
        return (
            <ControlPanelRow>
                <ToggleButton title={ tool === ControlTool.EreaseDraw ? 'Erease (Click to switch)' : 'Draw (Click to switch)' } value={ tool === ControlTool.EreaseDraw ? <BorealisFreeHandEreaseIcon /> : <BorealisFreeHandDrawIcon /> } toggleValue={ toggleEreaseTool } />
                <NumberInput title='draw size' value={ drawSize } onChange={ (e) => setDrawSize(parseInt(e.target.value)) } step={ 3 } min={ 1 } />
                <ActionButton title='Color Preview' ref={ drawColorRef } value={ <BorealisColorPickerIcon id='color-preview-icon' style={{ color: drawColor }} /> } onClick={ toggleColorPicker } />
                <ActionButton title='Erease all Drawings' value={ <BorealisResetDrawingsIcon /> } onClick={ resetDrawing } />
                { showColorPicker ? <ColorPicker currentColor={ drawColor } colorPreviewRef={ drawColorRef } setDrawColor={ setDrawColor } /> : null }
            </ControlPanelRow>
        )
    case ControlTool.Move:
        return <></>
    case ControlTool.Fog:
    case ControlTool.EreaseFog:
        return (
            <ControlPanelRow>
                <NumberInput title='fog radius' value={ fogRadius } onChange={ (e) => setFogRadius(parseInt(e.target.value)) } step={ 5 } min={ 1 } />
                <ActionButton title='Reset Fog' onClick={ resetFog } value={ <BorealisResetFogIcon /> } />
            </ControlPanelRow>
        )
    default:
        return <></>
    }
}

export default ToolControlsView
