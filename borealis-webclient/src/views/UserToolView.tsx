import React from 'react'
import {
    GlobeSolidIcon,
    CloudOffSolidIcon,
    CloudUploadSolidIcon,
    CloudDownloadSolidIcon,
    CursorSolidIcon,
    CursorOutlineIcon,
    LinkOutlineIcon
} from './Icons'
import ControlPanelRow from './GenericViews/ControlPanelRow'
import TextInput from './GenericViews/TextInput'
import ToggleButton from './GenericViews/ToggleButton'
import ActionButton from './GenericViews/ActionButton'

interface UserToolViewProps {
    isHost: boolean,
    initAsDev: () => void,
    toggleFog: () => void,
    saveGameInServer: () => void,
    loadGameFromServer: () => void,
    userName: string,
    updateUserName: (arg0: React.ChangeEvent<HTMLInputElement>) => void,
    mouseIsShared: boolean,
    toggleShareMouse: () => void,
    copyUrlToClipboard: () => void,
}

const UserToolView = ({ isHost, initAsDev, toggleFog, saveGameInServer, loadGameFromServer, userName, updateUserName, mouseIsShared, toggleShareMouse, copyUrlToClipboard }: UserToolViewProps) => {
    return (
        <ControlPanelRow>
            <TextInput title='User name' placeholder='User name' value={ userName } onChange={ updateUserName } autofocus={ true } />
            <ToggleButton title={ mouseIsShared ? 'Cursor shared' : 'Cursor hidden' } value={ mouseIsShared ? <CursorSolidIcon /> : <CursorOutlineIcon /> } toggleValue={ toggleShareMouse } isActive={ mouseIsShared } />
            { isHost
                ? <>
                    <ActionButton title='Share Link' value={ <LinkOutlineIcon /> } onClick={ copyUrlToClipboard } />
                    <ActionButton title='Load example' value={ <GlobeSolidIcon /> } onClick={ initAsDev } />
                    <ActionButton title='Toggle Fog' value={ <CloudOffSolidIcon /> } onClick={ toggleFog } />
                    <ActionButton title='Save room' value={ <CloudUploadSolidIcon /> } onClick={ saveGameInServer } />
                    <ActionButton title='Load room' value={ <CloudDownloadSolidIcon /> } onClick={ loadGameFromServer } />
                </>
                : null
            }
        </ControlPanelRow>
    )
}

export default UserToolView
