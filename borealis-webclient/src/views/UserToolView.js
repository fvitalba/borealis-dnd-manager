import Button from './Button'
import { GlobeSolidIcon, CloudOffSolidIcon, CloudUploadSolidIcon, CloudDownloadSolidIcon } from './Icons'

const UserToolView = ({ initAsDev, toggleFog, saveGameInServer, loadGameFromServer, username, updateUsername /*, cursorSize, updateCursorSize */ }) => {
    return (
        <div className='user-tool-view'>
            <input title='User name' placeholder='User name' value={ username } onChange={ (e) => updateUsername(e.target.value) } className='control-panel-input' />
            { /* <input title='Cursor size' value={ cursorSize } onChange={ (e) => updateCursorSize(e.target.value) } type='number' min='0' className='control-panel-input' /> */ }
            { /* TODO: enable the mousesharing <ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } /> */ }
            <Button title='Load example' value={ <GlobeSolidIcon /> } onClick={ initAsDev } />
            <Button title='Toggle Fog' value={ <CloudOffSolidIcon /> } onClick={ toggleFog } />
            <Button title='Save room' value={ <CloudUploadSolidIcon /> } onClick={ saveGameInServer } />
            <Button title='Load room' value={ <CloudDownloadSolidIcon /> } onClick={ loadGameFromServer } />
        </div>
    )
}

export default UserToolView
