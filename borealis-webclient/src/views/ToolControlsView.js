import Button from './Button.js'

const ToolControlsView = ({ gameState, onTextChangeGame, setFogOpacity, setSubtool, resetFog, resetDrawing }) => {
	switch (gameState.settings.tool) {
		case 'draw':
			return (
				<span>
					<Button title='eraser' value='&#x1f9fd;' onClick={ () => setSubtool('eraser') } isSelected={ gameState.settings.subtool === 'eraser' } />
					<Button title='pencil' value='&#x1f58d;' onClick={ () => setSubtool('pencil') } isSelected={ gameState.settings.subtool === 'pencil' } />
					<input size='3' title='draw size' value={ gameState.settings.drawSize } onChange={ (e) => onTextChangeGame('drawSize', e) } type='number' step='3' min='1' />
					<input size='3' title='draw color' value={ gameState.settings.drawColor } onChange={ (e) => onTextChangeGame('drawColor', e) } />
					<Button style={{ backgroundColor: gameState.settings.drawColor }} value='&#x1f58c;' disabled />
					<Button title='reset drawing' onClick={ resetDrawing } value='&#x1f300;' />
				</span>
			)
		case 'move':
			return null
		case 'fog':
			return (
				<span>
					<Button title='reset fog' onClick={ resetFog } value='&#x1f300;' />
					<input size='3' title='fog radius' value={ gameState.settings.fogRadius || 0 } onChange={ (e) => onTextChangeGame('fogRadius', e) } type='number' step='5' min='1' />
					<input size='3' title='fog opacity' step='0.05' min='0' max='1' value={ gameState.settings.fogOpacity } onChange={ (e) => setFogOpacity(e) } type='number' />
				</span>
			)
		default:
			return null
	}
}

export default ToolControlsView
