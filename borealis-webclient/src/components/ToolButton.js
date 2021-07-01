import Button from '../views/button.js'

function ToolButton({ cp, title, value, game }) {
	//TODO: To review post Refactoring
	const isSelected = title === game.state.tool
	const onClick = cp.setGameState.bind(cp, 'tool', title)
	return (
		<Button title={ title } value={ value.toString() } onClick={ onClick } isSelected={ isSelected } />
	)
}

export default ToolButton
