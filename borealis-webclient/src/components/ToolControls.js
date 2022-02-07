import ToolControlsView from "../views/ToolControlsView.js"

const ToolControls = ({ gameState, setGameState, resetFog, resetDrawing }) => {
	const setSubtool = (subtool) => {
		setGameState({
			...gameState,
			settings: {
				...gameState.settings,
				subtool: subtool,
			}
		})
	}

	const onTextChangeGame = (key, e) => {
		setGameState({
			...gameState,
			settings: {
				...gameState.settings,
				[key]: e.target.value,
			}
		})
	}

	const setFogOpacity = (e) => {
		const newOpacity = e.target.value
		if (!isNaN(newOpacity))
			setGameState({
				...gameState,
				settings: {
					...gameState.settings,
					fogOpacity: newOpacity,
				}
			})
	}

	return (
		<span>
			<ToolControlsView 
				gameState={ gameState } 
				onTextChangeGame={ onTextChangeGame } 
				setFogOpacity={ setFogOpacity } 
				setSubtool={ setSubtool } 
				resetFog={ resetFog } 
				resetDrawing={ resetDrawing } />
		</span>
	)
}

export default ToolControls
