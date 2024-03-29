import React from 'react'
import {
    BorealisSelectedMapIcon,
    BorealisUnselectedMapIcon,
    BorealisDeleteMapIcon,
} from '@/styles/Icons'
import { ActionButton } from '@/components/ActionButton'
import { ControlPanelRow } from '../..'
import { ControlPanelSubcontainer } from '../..'
import { TextInput } from '@/components/TextInput'
import { MapConfigViewProps } from './types'

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
