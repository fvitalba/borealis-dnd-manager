import React from 'react'
import { MapConfig } from './MapConfig'
import {
    BorealisAddNewMapIcon,
    BorealisMapSelectedIcon,
    BorealisMapUnselectedIcon,
    BorealisPlayIcon,
} from '@/views/Icons'
import { ControlPanelSubcontainer } from '@/features/ControlPanel'
import { ControlPanelRow } from '@/features/ControlPanel'
import { TextInput } from '@/components/TextInput'
import { TextInputSelector } from '@/components/TextInputSelector'
import { ActionButton } from '@/components/ActionButton'
import { MapToolViewProps } from './types'

const MapToolView = ({ maps, activeMapId, newMapName, setNewMapName, isCreateMapEnabled, createMap, selectedMapName, currSelectedMapName, onMapSelect, onSubmitSelectMap, isSubmitSelectionEnabled, showSelectedMap }: MapToolViewProps) => {
    const mapOptions = maps.map((map, index) => {
        return {
            index: index,
            caption: `${map.name}`,
            icon: map.id === activeMapId ? <BorealisMapSelectedIcon /> : <BorealisMapUnselectedIcon />
        }
    }).filter((option) => option.caption !== undefined)

    const onSelectElement = (elementIndex: number) => {
        onMapSelect(elementIndex)
    }

    const selectedMap = showSelectedMap ? maps.filter((map) => map.name === currSelectedMapName) : []

    return (
        <ControlPanelSubcontainer>
            <ControlPanelRow>
                <TextInput title='New Map Name' placeholder='Map Name' value={ newMapName } onChange={ setNewMapName } autofocus={ true } />
                <ActionButton title='Create new map' value={ <BorealisAddNewMapIcon /> } onClick={ createMap } disabled={ (newMapName === '') || (!isCreateMapEnabled) } />
            </ControlPanelRow>
            <ControlPanelRow>
                <TextInputSelector title='Choose Map' placeholder='Choose Map' value={ selectedMapName } onSelectElement={ onSelectElement } label='Choose existing Map:' options={ mapOptions } />
                <ActionButton title='Select map' value={ <BorealisPlayIcon /> } onClick={ onSubmitSelectMap } disabled={ !isSubmitSelectionEnabled } />
            </ControlPanelRow>
            { selectedMap.length > 0
                ? <ControlPanelRow>
                    { selectedMap.map((map) => (
                        <MapConfig key={ `map${map.id}` } map={ map } />
                    ))}
                </ControlPanelRow>
                : null
            }
        </ControlPanelSubcontainer>
    )
}

export default MapToolView
