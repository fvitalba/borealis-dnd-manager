import Button from './Button'
import { GlobeSolidIcon, CloudOffSolidIcon, CloudUploadSolidIcon, CloudDownloadSolidIcon, CursorSolidIcon, CursorOutlineIcon, LinkOutlineIcon } from './Icons'

const UserToolView = ({ isHost, initAsDev, toggleFog, saveGameInServer, loadGameFromServer, username, updateUsername, mouseIsShared, toggleShareMouse, copyUrlToClipboard }) => {
    return (
        <div className='user-tool-view'>
            <input title='User name' placeholder='User name' value={ username } onChange={ (e) => updateUsername(e.target.value) } className='control-panel-input' />
            <Button title={ mouseIsShared ? 'Cursor shared' : 'Cursor hidden' } value={ mouseIsShared ? <CursorSolidIcon /> : <CursorOutlineIcon /> } onClick={ toggleShareMouse } />
            { isHost
                ? <div className='flex flex-row flex-nowrap' >
                    <Button title={ 'Share Link' } value={ <LinkOutlineIcon /> } onClick={ copyUrlToClipboard } />
                    <Button title='Load example' value={ <GlobeSolidIcon /> } onClick={ initAsDev } />
                    <Button title='Toggle Fog' value={ <CloudOffSolidIcon /> } onClick={ toggleFog } />
                    <Button title='Save room' value={ <CloudUploadSolidIcon /> } onClick={ saveGameInServer } />
                    <Button title='Load room' value={ <CloudDownloadSolidIcon /> } onClick={ loadGameFromServer } />
                </div>
                : null
            }
        </div>
    )
}

export default UserToolView
