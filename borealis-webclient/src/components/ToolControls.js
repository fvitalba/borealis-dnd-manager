import ToolControlsView from "../views/ToolControlsView.js"

const ToolControls = ({ gameState, setGameState, resetFog }) => {
	const setSubtool = (subtool) => {
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				subtool: subtool,
			}
		})
	}

	const onTextChangeGame = (key, e) => {
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
					...gameState.state,
					fogOpacity: newOpacity,
				}
			})
	}

	return (
		<span>
			<ToolControlsView 
				gameState={ gameState } 
				resetFog={ resetFog } 
				onTextChangeGame={ onTextChangeGame } 
				setFogOpacity={ setFogOpacity } 
				setSubtool={ setSubtool } />
		</span>
	)
}

export default ToolControls
