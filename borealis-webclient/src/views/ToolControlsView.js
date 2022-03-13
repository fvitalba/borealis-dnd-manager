import Button from './Button'
import { PencilAltSolidIcon, PencilAltOutlineIcon, CloudFogSolidIcon, SquareOutlineIcon, DropletSolidIcon } from './Icons'


const ToolControlsView = ({ tool, subtool, drawColor, setDrawColor, drawSize, setDrawSize, fogRadius, setFogRadius, setSubtool, resetFog, resetDrawing }) => {
    switch (tool) {
    case 'draw':
        return (
            <div className='tool-control-group'>
                <Button title='Erease' value={ <PencilAltOutlineIcon /> } onClick={ () => setSubtool('eraser') } isSelected={ subtool === 'eraser' } />
                <Button title='Draw' value={ <PencilAltSolidIcon /> } onClick={ () => setSubtool('pencil') } isSelected={ subtool === 'pencil' } />
                <input size='3' title='draw size' value={ drawSize } onChange={ (e) => setDrawSize(e.target.value) } type='number' step='3' min='1' className='control-panel-input' />
                <input size='3' title='draw color' value={ drawColor } onChange={ (e) => setDrawColor(e.target.value) } className='control-panel-input' />
                <Button id='color-preview' value={ <DropletSolidIcon id='color-preview-icon' style={{ color: drawColor }} /> } disabled />
                <Button title='Reset Drawings' value={ <SquareOutlineIcon /> } onClick={ resetDrawing } />
            </div>
        )
    case 'move':
        return null
    case 'fog':
        return (
            <div className='tool-control-group'>
                <input size='3' title='fog radius' value={ fogRadius } onChange={ (e) => setFogRadius(e.target.value) } type='number' step='5' min='1' className='control-panel-input' />
                <Button title='Reset Fog' onClick={ resetFog } value={ <CloudFogSolidIcon /> } />
            </div>
        )
    default:
        return null
    }
}

export default ToolControlsView
