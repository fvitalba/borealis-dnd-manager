import React from 'react'
import { ColorPicker } from '../ColorPicker'
import ControlTool from '../../enums/Tool'
import { ActionButton } from '../ActionButton'
import { ControlPanelRow } from '../ControlPanel'
import { ToggleButton } from '../ToggleButton'
import NumberInput from '../../views/GenericViews/NumberInput'
import {
    BorealisFreeHandDrawIcon,
    BorealisFreeHandEreaseIcon,
    BorealisColorPickerIcon,
    BorealisResetDrawingsIcon,
    BorealisResetFogIcon,
} from '../../views/Icons'
import { ToolControlsViewProps } from './types'

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
