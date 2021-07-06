import Button from "./Button.js"

const ToolControlsView = ({ game, tool, setGameState, onTextChange, setFogOpacity, resetFog }) => {
	const ToolControl = () => {
		switch (tool) {
			case 'draw':
				return (
					<span>
						<Button title='eraser' value='&#x1f9fd;' onClick={ setGameState.bind(this, 'subtool', 'eraser') } isSelected={ game.state.subtool === 'eraser' } />
						<Button title='pencil' value='&#x1f58d;' onClick={ setGameState.bind(this, 'subtool', 'pencil') } isSelected={ game.state.subtool === 'pencil' } />
						<input size='3' title='draw size' value={ game.state.drawSize } onChange={ onTextChange.bind(game, 'drawSize') } type='number' step='3' min='1' />
						<input size='3' title='draw color' value={ game.state.drawColor } onChange={ onTextChange.bind(game, 'drawColor') } />
						<Button style={{ backgroundColor: game.state.drawColor }} value='&#x1f58c;' disabled />
					</span>
				)
			case 'move':
				return null
			case 'fog':
				return (
					<span>
						<Button title='reset fog' onClick={ resetFog } value='&#x1f300;' />
						<input size='3' title='fog radius' value={ game.state.fogRadius || 0 } onChange={ onTextChange.bind(game, 'fogRadius') } type='number' step='5' min='1' />
						<input size='3' title='fog opacity' step='0.05' min='0' max='1' value={ game.state.fogOpacity } onChange={ setFogOpacity } type='number' />
					</span>
				)
			default:
				return null
		}
	}

	return(
		<span>{ ToolControl }</span>
	)
}

export default ToolControlsView
