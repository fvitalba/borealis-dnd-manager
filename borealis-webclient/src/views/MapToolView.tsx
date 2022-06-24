import React, { ChangeEvent } from 'react'
import Map from '../classes/Map'
import MapConfig from '../components/MapConfig'
import {
    BorealisAddNewMapIcon,
    BorealisMapSelectedIcon,
    BorealisMapUnselectedIcon,
    BorealisPlayIcon,
} from './Icons'
import ControlPanelSubcontainer from './GenericViews/ControlPanelSubcontainer'
import ControlPanelRow from './GenericViews/ControlPanelRow'
import TextInput from './GenericViews/TextInput'
import TextInputSelector from './GenericViews/TextInputSelector'
import ActionButton from './GenericViews/ActionButton'

interface MapToolViewProps {
    maps: Array<Map>,
    activeMapId: number,
    newMapName: string,
    setNewMapName: (e: ChangeEvent<HTMLInputElement>) => void,
    isCreateMapEnabled: boolean,
    createMap: () => void,
    selectedMapName: string,
    currSelectedMapName: string,
    onMapSelect: (mapIndex: number) => void,
    onSubmitSelectMap: () => void,
    isSubmitSelectionEnabled: boolean,
    showSelectedMap: boolean,
}

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
