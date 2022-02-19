import Button from './Button'
import { PencilFill } from '@styled-icons/bootstrap/PencilFill'
import { Pencil } from '@styled-icons/bootstrap/Pencil'
import { FormatColorReset } from '@styled-icons/material-rounded/FormatColorReset'
import { CloudHaze2Fill } from '@styled-icons/bootstrap/CloudHaze2Fill'
import { Color } from '@styled-icons/fluentui-system-filled/Color'

const ToolControlsView = ({ tool, subtool, drawColor, setDrawColor, drawSize, setDrawSize, fogOpacity, setFogOpacity, fogRadius, setFogRadius, setSubtool, resetFog, resetDrawing }) => {
    switch (tool) {
    case 'draw':
        return (
            <span className='tool-group'>
                <Button title='Erease' value={ <Pencil width='30' /> } onClick={ () => setSubtool('eraser') } isSelected={ subtool === 'eraser' } />
                <Button title='Draw' value={ <PencilFill width='30' /> } onClick={ () => setSubtool('pencil') } isSelected={ subtool === 'pencil' } />
                <input size='3' title='draw size' value={ drawSize } onChange={ (e) => setDrawSize(e.target.value) } type='number' step='3' min='1' className='control-panel-input' />
                <input size='3' title='draw color' value={ drawColor } onChange={ (e) => setDrawColor(e.target.value) } className='control-panel-input' />
                <Button id='color-preview' value={ <Color id='color-preview-icon' style={{ color: drawColor }} width='30' /> } disabled />
                <Button title='Reset Drawings' value={ <FormatColorReset width='30' /> } onClick={ resetDrawing } />
            </span>
        )
    case 'move':
        return null
    case 'fog':
        return (
            <span className='tool-group'>
                <input size='3' title='fog radius' value={ fogRadius } onChange={ (e) => setFogRadius(e.target.value) } type='number' step='5' min='1' className='control-panel-input' />
                <input size='3' title='fog opacity' step='0.05' min='0' max='1' value={ fogOpacity } onChange={ (e) => setFogOpacity(e.target.value) } type='number' className='control-panel-input' />
                <Button title='Reset Fog' onClick={ resetFog } value={ <CloudHaze2Fill width='30' /> } />
            </span>
        )
    default:
        return null
    }
}

export default ToolControlsView
