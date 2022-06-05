import React from 'react'
import Map from '../classes/Map'
import MapConfig from '../components/MapConfig'
import { PlusSquareSolidIcon } from './Icons'
import ControlPanelContainer from './GenericViews/ControlPanelContainer'
import ControlPanelRow from './GenericViews/ControlPanelRow'
import TextInput from './GenericViews/TextInput'
import ActionButton from './GenericViews/ActionButton'

interface MapToolViewProps {
    maps: Array<Map>,
    newMapName: string,
    setNewMapName: (arg0: React.ChangeEvent<HTMLInputElement>) => void,
    createMap: () => void,
}

const MapToolView = ({ maps, newMapName, setNewMapName, createMap }: MapToolViewProps) => {
    return (
        <ControlPanelContainer>
            <ControlPanelRow>
                <TextInput title='New Map Name' placeholder='Map Name' value={ newMapName } onChange={ setNewMapName } autofocus={ true } />
                <ActionButton title='Create new map' value={ <PlusSquareSolidIcon /> } onClick={ createMap } disabled={ newMapName === '' } />
            </ControlPanelRow>
            {
                maps.length > 0
                    ? <ControlPanelRow>
                        { maps.map((map) => (
                            <MapConfig key={ `map${map.id}` } map={ map } />
                        ))}
                    </ControlPanelRow>
                    : null
            }
        </ControlPanelContainer>
    )
}

export default MapToolView
