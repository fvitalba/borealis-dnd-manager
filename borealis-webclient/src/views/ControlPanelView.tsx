import React from 'react'
import MapTool from '../components/MapTool'
import TokenTool from '../components/TokenTool'
import UserTool from '../components/UserTool'
import CharacterStats from '../components/CharacterStats'
import { ControlPanelState, ControlPanelTabName } from '../components/ControlPanel'
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
import ControlPanelContainer from './GenericViews/ControlPanelContainer'
import ControlPanelRow from './GenericViews/ControlPanelRow'
import ToggleButton from './GenericViews/ToggleButton'
import ActionButton from './GenericViews/ActionButton'

interface ControlPanelViewProps {
    controlPanelState: ControlPanelState,
    hidden: boolean,
    toggleControlPanelTab: (tabName: ControlPanelTabName) => void,
    submenuHidden: boolean,
    fogEnabled: boolean,
    isHost: boolean,
    socketRequestRefresh: () => void,
    pushRefreshToPlayers: () => void,
}


const ControlPanelView = ({ controlPanelState, hidden, toggleControlPanelTab, submenuHidden, isHost, socketRequestRefresh, pushRefreshToPlayers }: ControlPanelViewProps) => {
    if (hidden)
        return (
            <ControlPanelContainer>
                <ControlPanelRow>
                    <ToggleButton value={ <PlusCircleOutlineIcon /> } toggleValue={ () => toggleControlPanelTab('hidden') } title='show control panel' />
                </ControlPanelRow>
            </ControlPanelContainer>
        )

    return (
        <ControlPanelContainer>
            <ControlPanelRow>
                <ToggleButton value={ <MinusCircleOutlineIcon /> } toggleValue={ () => toggleControlPanelTab('hidden') } title='hide control panel'/>
                <ToggleButton title='User' value={ <UserCircleSolidIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnUser') } isActive={ controlPanelState.toggleOnUser } />
                { isHost
                    ? <>
                        <ToggleButton title='Maps' value={ <MapSolidIcon />} toggleValue={ () => toggleControlPanelTab('toggleOnMaps') } isActive={ controlPanelState.toggleOnMaps } />
                        <ToggleButton title='Tokens' value={ <GhostSolidIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnTokens') } isActive={ controlPanelState.toggleOnTokens } />
                    </>
                    : null
                }
                <ToggleButton title='Character Stats' value={ <ChartBarAltSquareSolidIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnCharacterStats') } isActive={ controlPanelState.toggleOnCharacterStats } />
                <ToggleButton title='Character Inventory' value={ <BoxSolidIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnCharacterInventory') } isActive={ controlPanelState.toggleOnCharacterInventory } />
                <ToggleButton title='Character Spells' value={ <BookOpenSolidIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnCharacterSpells') } isActive={ controlPanelState.toggleOnCharacterSpells } />
                { isHost
                    ? <ActionButton title='Push refresh to players' value={ <RefreshOutlineIcon /> } onClick={ pushRefreshToPlayers } />
                    : <ActionButton title='Request gameboard refresh from host' onClick={ socketRequestRefresh } value={ <RefreshOutlineIcon /> } />
                }
            </ControlPanelRow>
            { !submenuHidden
                ? <ControlPanelRow>
                    <MapTool toggleOnMaps={ controlPanelState.toggleOnMaps } />
                    <TokenTool toggleOnTokens={ controlPanelState.toggleOnTokens } />
                    <UserTool toggleOnUser={ controlPanelState.toggleOnUser } />
                    <CharacterStats toggleOnCharacterStats={ controlPanelState.toggleOnCharacterStats } />
                </ControlPanelRow>
                : null
            }
        </ControlPanelContainer>
    )
}

export default ControlPanelView
