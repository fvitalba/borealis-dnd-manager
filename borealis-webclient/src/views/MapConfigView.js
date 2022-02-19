import Button from './Button'

const MapConfigView = ({ isSelected, mapConfigState, load, onTextChange, onIntegerChange, deleteMap }) => {
    return (
        <div className={ isSelected ? 'selected' : null }>
            { mapConfigState.name }
            <input value={ mapConfigState.imageUrl || '' } placeholder='Map url' size='8' onChange={ (e) => onTextChange('imageUrl', e) } className='control-panel-input' />
            w:
            <input value={ mapConfigState.width || 0 } placeholder='width' onChange={ (e) => onIntegerChange('width', e) } type='number' min='0' step='10' title='width' className='control-panel-input' />
            h:
            <input value={ mapConfigState.height || 0 } placeholder='height' onChange={ (e) => onIntegerChange('height', e) } type='number' min='0' step='10' title='height' className='control-panel-input' />
            <Button title='Save & load map' value='&#x1f4c0;' onClick={ load } />
            <Button title='Delete map' value='&#x1f5d1;' onClick={ deleteMap } />
        </div>
    )
}

export default MapConfigView
