import Button from './Button.js'

const UserToolView = ({ initAsDev, copyJson, pasteJson, username, updateUsername, cursorSize, updateCursorSize }) => {
	return (
		<div>
			<hr />
			<input title='User name' placeholder='User name' value={ username} onChange={ (e) => updateUsername(e) } />
			{ /* TODO: enable the mousesharing <ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } /> */ }
			<input title='Cursor size' value={ cursorSize } onChange={ (e) => updateCursorSize(e) } type='number' min='0' />
			<hr />
			<Button title='Redo as dev' value='&#x1f530;' onClick={ initAsDev } />
			<Button title='Copy JSON to clipboard' value='&#x1f46f;' onClick={ copyJson } />
			<Button title='Paste JSON from clipboard' value='&#x1f4cb;' onClick={ pasteJson } />
		</div>
	)
}

export default UserToolView
