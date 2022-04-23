import React, { RefObject } from 'react'
import ColorPicker from '../components/ColorPicker'
import ControlTool from '../enums/Tool'
import Button from './Button'
import {
    PencilAltSolidIcon,
    PencilAltOutlineIcon,
    CloudFogSolidIcon,
    SquareOutlineIcon,
    DropletSolidIcon
} from './Icons'

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
    switch (tool) {
    case ControlTool.Draw:
    case ControlTool.EreaseDraw:
        return (
            <div className='tool-control-group'>
                <Button title='Erease' value={ <PencilAltOutlineIcon /> } onClick={ () => setTool(ControlTool.EreaseDraw) } isSelected={ tool === ControlTool.EreaseDraw } />
                <Button title='Draw' value={ <PencilAltSolidIcon /> } onClick={ () => setTool(ControlTool.Draw) } isSelected={ tool === ControlTool.Draw } />
                <input size={ 3 } title='draw size' value={ drawSize } onChange={ (e) => setDrawSize(parseInt(e.target.value)) } type='number' step='3' min='1' className='control-panel-input' />
                <Button id='color-preview' title='Color Preview' ref={ drawColorRef } value={ <DropletSolidIcon id='color-preview-icon' style={{ color: drawColor }} /> } onClick={ toggleColorPicker } />
                <Button title='Reset Drawings' value={ <SquareOutlineIcon /> } onClick={ resetDrawing } />
                { showColorPicker ? <ColorPicker currentColor={ drawColor } colorPreviewRef={ drawColorRef } setDrawColor={ setDrawColor } /> : null }
            </div>
        )
    case ControlTool.Move:
        return <></>
    case ControlTool.Fog:
    case ControlTool.EreaseFog:
        return (
            <div className='tool-control-group'>
                <input size={ 3 } title='fog radius' value={ fogRadius } onChange={ (e) => setFogRadius(parseInt(e.target.value)) } type='number' step='5' min='1' className='control-panel-input' />
                <Button title='Reset Fog' onClick={ resetFog } value={ <CloudFogSolidIcon /> } />
            </div>
        )
    default:
        return <></>
    }
}

export default ToolControlsView
