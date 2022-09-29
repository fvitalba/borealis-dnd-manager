import React from 'react'
import {
    BorealisShareMouseIcon,
    BorealisStopShareMouseIcon,
    BorealisShareLinkIcon,
    BorealisDefaultWorldIcon,
    BorealisShowFogIcon,
    BorealisHideFogIcon,
    BorealisSaveWorldIcon,
    BorealisLoadWorldIcon,
    BorealisLogoutIcon,
} from '@/views/Icons'
import { ControlPanelRow } from '@/features/ControlPanel'
import { TextInput } from '@/components/TextInput'
import { ToggleButton } from '@/components/ToggleButton'
import { ActionButton } from '@/components/ActionButton'
import { UserToolViewProps } from './types'

const UserToolView = ({ isHost, initAsDev, fogEnabled, toggleFog, saveGameInServer, loadGameFromServer, userName, updateUserName, mouseIsShared, toggleShareMouse, copyUrlToClipboard, logoutUser }: UserToolViewProps) => {
    return (
        <ControlPanelRow>
            <TextInput title='User name' placeholder='User name' value={ userName } onChange={ updateUserName } autofocus={ true } />
            <ToggleButton title={ mouseIsShared ? 'Cursor shared' : 'Cursor hidden' } value={ mouseIsShared ? <BorealisShareMouseIcon /> : <BorealisStopShareMouseIcon /> } toggleValue={ toggleShareMouse } isActive={ mouseIsShared } />
            { isHost
                ? <>
                    <ActionButton title='Share Link' value={ <BorealisShareLinkIcon /> } onClick={ copyUrlToClipboard } />
                    <ActionButton title='Load example' value={ <BorealisDefaultWorldIcon /> } onClick={ initAsDev } />
                    <ActionButton title='Toggle Fog' value={ fogEnabled ? <BorealisHideFogIcon /> : <BorealisShowFogIcon /> } onClick={ toggleFog } />
                    <ActionButton title='Save room' value={ <BorealisSaveWorldIcon /> } onClick={ saveGameInServer } />
                    <ActionButton title='Load room' value={ <BorealisLoadWorldIcon /> } onClick={ loadGameFromServer } />
                    <ActionButton title='Logout' value={ <BorealisLogoutIcon /> } onClick={ logoutUser } />
                </>
                : null
            }
        </ControlPanelRow>
    )
}

export default UserToolView
