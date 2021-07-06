import Button from "./button"
import ToggleButton from "../components/ToggleButton"

const UserToolView = ({ toggleOnUser, game, copyJson, pasteJson, setGameInt, setGameText }) => {
	if (!toggleOnUser)
		return null
	return (
		<div>
			<hr />
			<input title='User name' placeholder='User name' value={ game.state.username || ''} onChange={ setGameText.bind(this, 'username') } />
			<ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanel={ game } />
			<input title='Cursor size' value={ game.state.cursorSize || '' } onChange={ setGameInt.bind(this, 'cursorSize') } type='number' min='0' />
			<hr />
			<Button title='Redo as dev' value='&#x1f530;' onClick={ game.initAsDev.bind(game) } />
			<Button title='Copy JSON to clipboard' value='&#x1f46f;' onClick={ copyJson.bind(this) } />
			<Button title='Paste JSON from clipboard' value='&#x1f4cb;' onClick={ pasteJson.bind(this) } />
		</div>
	)
}

export default UserToolView
