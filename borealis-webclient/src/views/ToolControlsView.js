import Button from './Button.js'

const ToolControlsView = ({ gameState, onTextChangeGame, setFogOpacity, setSubtool, resetFog, resetDrawing }) => {
	switch (gameState.state.tool) {
		case 'draw':
			return (
				<span>
					<Button title='eraser' value='&#x1f9fd;' onClick={ () => setSubtool('eraser') } isSelected={ gameState.state.subtool === 'eraser' } />
					<Button title='pencil' value='&#x1f58d;' onClick={ () => setSubtool('pencil') } isSelected={ gameState.state.subtool === 'pencil' } />
					<input size='3' title='draw size' value={ gameState.state.drawSize } onChange={ (e) => onTextChangeGame('drawSize', e) } type='number' step='3' min='1' />
					<input size='3' title='draw color' value={ gameState.state.drawColor } onChange={ (e) => onTextChangeGame('drawColor', e) } />
					<Button style={{ backgroundColor: gameState.state.drawColor }} value='&#x1f58c;' disabled />
					<Button title='reset drawing' onClick={ resetDrawing } value='&#x1f300;' />
				</span>
			)
		case 'move':
			return null
		case 'fog':
			return (
				<span>
					<Button title='reset fog' onClick={ resetFog } value='&#x1f300;' />
					<input size='3' title='fog radius' value={ gameState.state.fogRadius || 0 } onChange={ (e) => onTextChangeGame('fogRadius', e) } type='number' step='5' min='1' />
					<input size='3' title='fog opacity' step='0.05' min='0' max='1' value={ gameState.state.fogOpacity } onChange={ (e) => setFogOpacity(e) } type='number' />
				</span>
			)
		default:
			return null
	}
}

export default ToolControlsView
