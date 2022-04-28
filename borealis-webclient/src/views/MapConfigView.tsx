import React, { ChangeEvent } from 'react'
import { MapConfigState } from '../components/MapConfig'
import Button from './Button'
import { CheckSquareOutlineIcon, SquareOutlineIcon, DocumentXOutlineIcon } from './Icons'

interface MapConfigViewProps {
    isSelected: boolean,
    mapConfigState: MapConfigState,
    load: () => void,
    onTextChange: (arg0: string, arg1: ChangeEvent<HTMLInputElement>) => void,
    deleteMap: () => void,
}

const MapConfigView = ({ isSelected, mapConfigState, load, onTextChange, deleteMap }: MapConfigViewProps) => {
    return (
        <div className={ isSelected ? 'map-config-selected' : 'map-config' }>
            <div className='map-config-map-info' >
                <div className={ isSelected ? 'map-config-map-name-selected' : 'map-config-map-name' } >
                    { mapConfigState.name }
                </div>
                <div className='map-config-map-details' >
                    <input value={ mapConfigState.imageUrl } placeholder='Map url' size={ 8 } onChange={ (e) => onTextChange('imageUrl', e) } className='w-96 control-panel-input' />
                </div>
            </div>
            <div className='map-config-map-actions'>
                <Button title='Save & load map' value={ isSelected ? <CheckSquareOutlineIcon /> : <SquareOutlineIcon /> } onClick={ load } />
                <Button title='Delete map' value={ <DocumentXOutlineIcon /> } onClick={ deleteMap } />
            </div>
        </div>
    )
}

export default MapConfigView
