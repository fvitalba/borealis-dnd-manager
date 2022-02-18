import Button from './Button.js'

const UserToolView = ({ initAsDev, toggleFog, saveGameInServer, loadGameFromServer, username, updateUsername, cursorSize, updateCursorSize }) => {
    return (
        <div>
            <hr />
            <input title='User name' placeholder='User name' value={ username} onChange={ (e) => updateUsername(e.target.value) } />
            { /* TODO: enable the mousesharing <ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } /> */ }
            <input title='Cursor size' value={ cursorSize } onChange={ (e) => updateCursorSize(e.target.value) } type='number' min='0' />
            <hr />
            <Button title='Redo as dev' value='&#x1f530;' onClick={ initAsDev } />
            <Button title='Toggle fog' value='&#127787;' onClick={ toggleFog } />
            <Button title='Save room' value='&#x1F4BE;' onClick={ saveGameInServer } />
            <Button title='Load room' value='&#x1F4C0;' onClick={ loadGameFromServer } />
        </div>
    )
}

export default UserToolView
