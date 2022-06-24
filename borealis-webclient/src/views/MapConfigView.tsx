import React, { ChangeEvent } from 'react'
import { MapConfigState } from '../components/MapConfig'
import {
    BorealisSelectedMapIcon,
    BorealisUnselectedMapIcon,
    BorealisDeleteMapIcon,
} from './Icons'
import ActionButton from './GenericViews/ActionButton'
import ControlPanelRow from './GenericViews/ControlPanelRow'
import ControlPanelSubcontainer from './GenericViews/ControlPanelSubcontainer'
import TextInput from './GenericViews/TextInput'

interface MapConfigViewProps {
    isSelected: boolean,
    mapConfigState: MapConfigState,
    load: () => void,
    onTextChange: (arg0: string, arg1: ChangeEvent<HTMLInputElement>) => void,
    deleteMap: () => void,
}

const MapConfigView = ({ isSelected, mapConfigState, load, onTextChange, deleteMap }: MapConfigViewProps) => {
    return (
        <ControlPanelSubcontainer>
            <ControlPanelRow>
                <h3 className={ isSelected ? 'text-text-active mb-0' : 'mb-0' }>{ mapConfigState.name }</h3>
            </ControlPanelRow>
            <ControlPanelRow>
                <TextInput value={ mapConfigState.imageUrl } placeholder='Map url' onChange={ (e) => onTextChange('imageUrl', e) } />
                <ActionButton title='Save & load map' value={ isSelected ? <BorealisSelectedMapIcon /> : <BorealisUnselectedMapIcon /> } onClick={ load } />
                <ActionButton title='Delete map' value={ <BorealisDeleteMapIcon /> } onClick={ deleteMap } />
            </ControlPanelRow>
        </ControlPanelSubcontainer>
    )
}

export default MapConfigView
