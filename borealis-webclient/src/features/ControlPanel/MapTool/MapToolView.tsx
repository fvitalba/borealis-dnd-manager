import React from 'react'
import { MapConfig } from './MapConfig'
import {
    BorealisAddNewMapIcon,
    BorealisMapSelectedIcon,
    BorealisMapUnselectedIcon,
} from '@/views/Icons'
import { ControlPanelSubcontainer } from '@/features/ControlPanel'
import { ControlPanelRow } from '@/features/ControlPanel'
import { TextInput } from '@/components/TextInput'
import { ActionButton } from '@/components/ActionButton'
import { FolderSelector } from '@/components/FolderSelector'
import { MapToolViewProps } from './types'

const MapToolView = ({ maps, activeMapId, newMapName, setNewMapName, isCreateMapEnabled, createMap, currSelectedMapName, onMapSelect, showSelectedMap }: MapToolViewProps) => {
    const mapOptions = maps.map((map, index) => {
        return {
            index: index,
            caption: `${map.name}`,
            icon: map.id === activeMapId ? <BorealisMapSelectedIcon /> : <BorealisMapUnselectedIcon />
        }
    }).filter((option) => option.caption !== undefined)

    const onFolderSelectElement = (elementIndex: number) => {
        onMapSelect(elementIndex, true)
    }

    const selectedMap = showSelectedMap ? maps.filter((map) => map.name === currSelectedMapName) : []

    return (
        <ControlPanelSubcontainer>
            <ControlPanelRow>
                <TextInput title='New Map Name' placeholder='Map Name' value={ newMapName } onChange={ setNewMapName } autofocus={ true } />
                <ActionButton title='Create new map' value={ <BorealisAddNewMapIcon /> } onClick={ createMap } disabled={ (newMapName === '') || (!isCreateMapEnabled) } />
            </ControlPanelRow>
            <ControlPanelRow>
                <FolderSelector elements={ mapOptions } onSelectElement={ onFolderSelectElement } />
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
