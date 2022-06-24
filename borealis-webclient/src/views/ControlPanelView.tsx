import React from 'react'
import MapTool from '../components/MapTool'
import TokenTool from '../components/TokenTool'
import UserTool from '../components/UserTool'
import CharacterStats from '../components/CharacterStats'
import { ControlPanelState, ControlPanelTabName } from '../components/ControlPanel'
import {
    BorealisCollapseIcon,
    BorealisExpandIcon,
    BorealisUserSettingsIcon,
    BorealisMapControlIcon,
    BorealisTokenControlIcon,
    BorealisCharacterStatsControlIcon,
    BorealisCharacterInventoryControlIcon,
    BorealisCharacterSpellsControlIcon,
} from './Icons'
import ControlPanelContainer from './GenericViews/ControlPanelContainer'
import ControlPanelRow from './GenericViews/ControlPanelRow'
import ToggleButton from './GenericViews/ToggleButton'

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
                    <ToggleButton value={ <BorealisExpandIcon /> } toggleValue={ () => toggleControlPanelTab('hidden') } title='show control panel' />
                </ControlPanelRow>
            </ControlPanelContainer>
        )

    return (
        <ControlPanelContainer>
            <ControlPanelRow>
                <ToggleButton value={ <BorealisCollapseIcon /> } toggleValue={ () => toggleControlPanelTab('hidden') } title='hide control panel'/>
                <ToggleButton title='User' value={ <BorealisUserSettingsIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnUser') } isActive={ controlPanelState.toggleOnUser } />
                { isHost
                    ? <>
                        <ToggleButton title='Maps' value={ <BorealisMapControlIcon />} toggleValue={ () => toggleControlPanelTab('toggleOnMaps') } isActive={ controlPanelState.toggleOnMaps } />
                        <ToggleButton title='Tokens' value={ <BorealisTokenControlIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnTokens') } isActive={ controlPanelState.toggleOnTokens } />
                    </>
                    : null
                }
                <ToggleButton title='Character Stats' value={ <BorealisCharacterStatsControlIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnCharacterStats') } isActive={ controlPanelState.toggleOnCharacterStats } />
                <ToggleButton title='Character Inventory' value={ <BorealisCharacterInventoryControlIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnCharacterInventory') } isActive={ controlPanelState.toggleOnCharacterInventory } />
                <ToggleButton title='Character Spells' value={ <BorealisCharacterSpellsControlIcon /> } toggleValue={ () => toggleControlPanelTab('toggleOnCharacterSpells') } isActive={ controlPanelState.toggleOnCharacterSpells } />
                { /* isHost
                    ? <ActionButton title='Push refresh to players' value={ <RefreshOutlineIcon /> } onClick={ pushRefreshToPlayers } />
                    : <ActionButton title='Request gameboard refresh from host' onClick={ socketRequestRefresh } value={ <RefreshOutlineIcon /> } />
                */ }
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
