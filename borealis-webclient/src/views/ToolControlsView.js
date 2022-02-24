import Button from './Button'
import { PencilAltSolidIcon, PencilAltOutlineIcon, CloudFogSolidIcon, SquareOutlineIcon, DropletSolidIcon } from './Icons'


const ToolControlsView = ({ tool, subtool, drawColor, setDrawColor, drawSize, setDrawSize, fogOpacity, setFogOpacity, fogRadius, setFogRadius, setSubtool, resetFog, resetDrawing }) => {
    switch (tool) {
    case 'draw':
        return (
            <span className='tool-group'>
                <Button title='Erease' value={ <PencilAltOutlineIcon /> } onClick={ () => setSubtool('eraser') } isSelected={ subtool === 'eraser' } />
                <Button title='Draw' value={ <PencilAltSolidIcon /> } onClick={ () => setSubtool('pencil') } isSelected={ subtool === 'pencil' } />
                <input size='3' title='draw size' value={ drawSize } onChange={ (e) => setDrawSize(e.target.value) } type='number' step='3' min='1' className='control-panel-input' />
                <input size='3' title='draw color' value={ drawColor } onChange={ (e) => setDrawColor(e.target.value) } className='control-panel-input' />
                <Button id='color-preview' value={ <DropletSolidIcon id='color-preview-icon' style={{ color: drawColor }} /> } disabled />
                <Button title='Reset Drawings' value={ <SquareOutlineIcon /> } onClick={ resetDrawing } />
            </span>
        )
    case 'move':
        return null
    case 'fog':
        return (
            <span className='tool-group'>
                <input size='3' title='fog radius' value={ fogRadius } onChange={ (e) => setFogRadius(e.target.value) } type='number' step='5' min='1' className='control-panel-input' />
                <input size='3' title='fog opacity' step='0.05' min='0' max='1' value={ fogOpacity } onChange={ (e) => setFogOpacity(e.target.value) } type='number' className='control-panel-input' />
                <Button title='Reset Fog' onClick={ resetFog } value={ <CloudFogSolidIcon /> } />
            </span>
        )
    default:
        return null
    }
}

export default ToolControlsView
