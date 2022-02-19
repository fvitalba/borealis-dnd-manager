import Button from './Button'
import { Install } from '@styled-icons/entypo/Install'
import { CloudFogFill } from '@styled-icons/bootstrap/CloudFogFill'
import { Save } from '@styled-icons/entypo/Save'
import { Upload } from '@styled-icons/fa-solid/Upload'

const UserToolView = ({ initAsDev, toggleFog, saveGameInServer, loadGameFromServer, username, updateUsername, cursorSize, updateCursorSize }) => {
    return (
        <div className='control-panel-submenu'>
            <span className='tool-group'>
                <input title='User name' placeholder='User name' value={ username } onChange={ (e) => updateUsername(e.target.value) } className='control-panel-input' />
                <input title='Cursor size' value={ cursorSize } onChange={ (e) => updateCursorSize(e.target.value) } type='number' min='0' className='control-panel-input' />
                { /* TODO: enable the mousesharing <ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } /> */ }
            </span>
            <span className='tool-group'>
                <Button title='Load example' value={ <Install width='30' /> } onClick={ initAsDev } />
                <Button title='Toggle Fog' value={ <CloudFogFill width='30' /> } onClick={ toggleFog } />
                <Button title='Save room' value={ <Save width='30' /> } onClick={ saveGameInServer } />
                <Button title='Load room' value={ <Upload width='30' /> } onClick={ loadGameFromServer } />
            </span>
        </div>
    )
}

export default UserToolView
