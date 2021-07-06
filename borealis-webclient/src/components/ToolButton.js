import Button from '../views/Button.js'

function ToolButton({ controlPanel, title, value, game }) {
	//TODO: To review post Refactoring
	const isSelected = title === game.state.tool
	const onClick = controlPanel.setGameState.bind(controlPanel, 'tool', title)
	return (
		<Button title={ title } value={ value.toString() } onClick={ onClick } isSelected={ isSelected } />
	)
}

export default ToolButton
