import Button from './Button.js'
import ToggleButton from '../components/ToggleButton.js'

const UserToolView = ({ gameState, controlPanelState, setControlPanelState, initAsDev, toggleOnUser, copyJson, pasteJson, setGameSettingsInt, setGameSettingsText }) => {
	if (!toggleOnUser)
		return null
	return (
		<div>
			<hr />
			<input title='User name' placeholder='User name' value={ gameState.settings.username || ''} onChange={ (e) => setGameSettingsText('username', e) } />
			<ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
			<input title='Cursor size' value={ gameState.metadata.cursorsize || '' } onChange={ (e) => setGameSettingsInt('cursorSize', e) } type='number' min='0' />
			<hr />
			<Button title='Redo as dev' value='&#x1f530;' onClick={ initAsDev } />
			<Button title='Copy JSON to clipboard' value='&#x1f46f;' onClick={ copyJson } />
			<Button title='Paste JSON from clipboard' value='&#x1f4cb;' onClick={ pasteJson } />
		</div>
	)
}

export default UserToolView
