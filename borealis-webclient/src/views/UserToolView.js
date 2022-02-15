import Button from './Button.js'

const UserToolView = ({ initAsDev, toggleFog, copyJson, pasteJson, username, updateUsername, cursorSize, updateCursorSize }) => {
	return (
		<div>
			<hr />
			<input title='User name' placeholder='User name' value={ username} onChange={ (e) => updateUsername(e.target.value) } />
			{ /* TODO: enable the mousesharing <ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } /> */ }
			<input title='Cursor size' value={ cursorSize } onChange={ (e) => updateCursorSize(e.target.value) } type='number' min='0' />
			<hr />
			<Button title='Redo as dev' value='&#x1f530;' onClick={ initAsDev } />
			<Button title='Toggle fog' value='&#127787;' onClick={ toggleFog } />
			<Button title='Copy JSON to clipboard' value='&#x1f46f;' onClick={ copyJson } />
			<Button title='Paste JSON from clipboard' value='&#x1f4cb;' onClick={ pasteJson } />
		</div>
	)
}

export default UserToolView
