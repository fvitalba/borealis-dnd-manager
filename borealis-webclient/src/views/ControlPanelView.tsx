import React from 'react'
import ToggleButton from '../components/ToggleButton'
import ToolControls from '../components/ToolControls'
import MapTool from '../components/MapTool'
import TokenTool from '../components/TokenTool'
import UserTool from '../components/UserTool'
import CharacterStats from '../components/CharacterStats'
import { ControlPanelState } from '../components/ControlPanel'
import ToolSelectView from './ToolSelectView'
import Button from './Button'
import {
    PlusCircleOutlineIcon,
    MinusCircleOutlineIcon,
    UserCircleSolidIcon,
    MapSolidIcon,
    GhostSolidIcon,
    RefreshOutlineIcon,
    ChartBarAltSquareSolidIcon,
    BookOpenSolidIcon,
    BoxSolidIcon
} from './Icons'

interface ControlPanelViewProps {
    controlPanelState: ControlPanelState,
    setControlPanelState: (arg0: ControlPanelState) => void,
    hidden: boolean,
    toggleHidden: () => void,
    submenuHidden: boolean,
    fogEnabled: boolean,
    isHost: boolean,
    socketRequestRefresh: () => void,
    pushRefreshToPlayers: () => void,
}


const ControlPanelView = ({ controlPanelState, setControlPanelState, hidden, toggleHidden, submenuHidden, fogEnabled, isHost, socketRequestRefresh, pushRefreshToPlayers }: ControlPanelViewProps) => {
    //TODO: move submenuhidden from prop to part of sub-components
    if (hidden)
        return (
            <div className='control-panel-container'>
                <div className='control-panel-tools'>
                    <Button value={ <PlusCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide control panel' />
                </div>
            </div>
        )

    if (isHost)
        return (
            <div className='control-panel-container'>
                <div className='control-panel-tools'>
                    <Button value={ <MinusCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide control panel'/>
                    <ToggleButton title='User' propertyName='User' value={ <UserCircleSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Maps' propertyName='Maps' value={ <MapSolidIcon />} controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Tokens' propertyName='Tokens' value={ <GhostSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Character Stats' propertyName='CharacterStats' value={ <ChartBarAltSquareSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <Button title='Push refresh to players' value={ <RefreshOutlineIcon /> } onClick={ pushRefreshToPlayers } />
                    <ToolSelectView isHost={ isHost } fogEnabled={ fogEnabled } />
                    <ToolControls />
                </div>
                {
                    !submenuHidden
                        ? <div className='control-panel-submenu'>
                            <MapTool toggleOnMaps={ controlPanelState.toggleOnMaps } />
                            <TokenTool toggleOnTokens={ controlPanelState.toggleOnTokens } />
                            <UserTool toggleOnUser={ controlPanelState.toggleOnUser } />
                            <CharacterStats toggleOnCharacterStats={ controlPanelState.toggleOnCharacterStats } />
                        </div>
                        : null
                }
            </div>
        )
    else
        return (
            <div className='control-panel-container'>
                <div className='control-panel-tools'>
                    <Button value={ <MinusCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide control panel' />
                    <ToggleButton title='User' propertyName='User' value={ <UserCircleSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Character Stats' propertyName='CharacterStats' value={ <ChartBarAltSquareSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Character Inventory' propertyName='CharacterInventory' value={ <BoxSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Character Spells' propertyName='CharacterSpells' value={ <BookOpenSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <Button title='Request gameboard refresh from host' onClick={ socketRequestRefresh } value={ <RefreshOutlineIcon /> } />
                    <ToolSelectView isHost={ isHost } fogEnabled={ fogEnabled } />
                    <ToolControls />
                </div>
                {
                    !submenuHidden
                        ? <div className='control-panel-submenu'>
                            <UserTool toggleOnUser={ controlPanelState.toggleOnUser } />
                            <CharacterStats toggleOnCharacterStats={ controlPanelState.toggleOnCharacterStats } />
                        </div>
                        : null
                }
            </div>
        )
}

export default ControlPanelView
