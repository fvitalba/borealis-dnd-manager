import Button from "./Button.js"

const ToolControlsView = ({ gameState, setGameState, resetFog }) => {
	const setSubtool = (subtool) => {
		setGameState({
			...gameState,
			state: {
				...gameState,
				subtool: subtool,
			}
		})
	}

	const onTextChange = (key, e) => {
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				[key]: e.target.value,
			}
		})
	}

	const setFogOpacity = (e) => {
		const newOpacity = e.target.value
		if (!isNaN(newOpacity))
			setGameState({
				...gameState,
				state: {
					...gameState,
					fogOpacity: newOpacity,
				}
			})
	}

	const ToolControl = () => {
		switch (gameState.state.tool) {
			case 'draw':
				return (
					<span>
						<Button title='eraser' value='&#x1f9fd;' onClick={ setSubtool('eraser') } isSelected={ gameState.state.subtool === 'eraser' } />
						<Button title='pencil' value='&#x1f58d;' onClick={ setSubtool('pencil') } isSelected={ gameState.state.subtool === 'pencil' } />
						<input size='3' title='draw size' value={ gameState.state.drawSize } onChange={ (e) => onTextChange('drawSize', e) } type='number' step='3' min='1' />
						<input size='3' title='draw color' value={ gameState.state.drawColor } onChange={ (e) => onTextChange('drawColor', e) } />
						<Button style={{ backgroundColor: gameState.state.drawColor }} value='&#x1f58c;' disabled />
					</span>
				)
			case 'move':
				return null
			case 'fog':
				return (
					<span>
						<Button title='reset fog' onClick={ resetFog } value='&#x1f300;' />
						<input size='3' title='fog radius' value={ gameState.state.fogRadius || 0 } onChange={ (e) => onTextChange('fogRadius', e) } type='number' step='5' min='1' />
						<input size='3' title='fog opacity' step='0.05' min='0' max='1' value={ gameState.state.fogOpacity } onChange={ (e) => setFogOpacity(e) } type='number' />
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
