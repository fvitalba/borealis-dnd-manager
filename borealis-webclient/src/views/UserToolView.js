import Button from "./Button.js"
import ToggleButton from "../components/ToggleButton.js"

const UserToolView = ({ toggleOnUser, game, copyJson, pasteJson, setGameInt, setGameText }) => {
	if (!toggleOnUser)
		return null
	return (
		<div>
			<hr />
			<input title='User name' placeholder='User name' value={ game.state.username || ''} onChange={ (e) => setGameText('username', e) } />
			<ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanel={ game } />
			<input title='Cursor size' value={ game.state.cursorSize || '' } onChange={ (e) => setGameInt('cursorSize', e) } type='number' min='0' />
			<hr />
			<Button title='Redo as dev' value='&#x1f530;' onClick={ game.initAsDev() } />
			<Button title='Copy JSON to clipboard' value='&#x1f46f;' onClick={ copyJson() } />
			<Button title='Paste JSON from clipboard' value='&#x1f4cb;' onClick={ pasteJson() } />
		</div>
	)
}

export default UserToolView
