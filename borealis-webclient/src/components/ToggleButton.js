import Button from '../views/Button.js'

function ToggleButton({ gameState, setGameState, title, value }) {
	const toggleKey = `toggleOn${title}`
	const onClick = () => {
		setGameState({
			...gameState,
			state: {
				...gameState.state,
			[toggleKey]: !gameState.state[toggleKey],
			}
		})
	}
	const isSelected = gameState.state[toggleKey]
	return (
		<Button title={ title } value={ value } onClick={ onClick } isSelected={ isSelected } />
	)
}

export default ToggleButton
