import Button from './Button'
import {
    DuplicateOutlineIcon,
    DesktopOutlineIcon,
    UserXOutlineIcon,
    UserSquareOutlineIcon,
    UserCheckOutlineIcon,
    CheckSquareOutlineIcon,
    SquareOutlineIcon,
    XSquareOutlineIcon,
    EyeOutlineIcon,
    EyeOffOutlineIcon,
    FormattingOutlineIcon,
    FormattingClearOutlineIcon
} from './Icons'

const HostTokenConfigView = ({ maps, token, copy, onToggle, selectToken, onTextChange, onIntegerChange, onMapSelect, deleteToken }) => {
    const controlPanelInputClass = token.selected ? 'control-panel-input-selected' : 'control-panel-input'
    const controlPanelSelectClass = token.selected ? 'control-panel-select-selected' : 'control-panel-select'

    return (
        <div className={ token.selected ? 'token-config-selected' : 'token-config' }>
            <div className='token-config-header'>
                <input value={ token.name || '' } placeholder='Name' size='8' onChange={ (e) => onTextChange('name', e) } className={ 'w-48 ' + controlPanelInputClass } />
                <input value={ token.url || '' } placeholder='Url' size='8' onChange={ (e) => onTextChange('url', e) } className={ 'w-96 ' + controlPanelInputClass } />
                <Button title='Delete token' value={ <XSquareOutlineIcon /> } onClick={ deleteToken } />
            </div>
            <div className='token-config-details'>
                <Button value={ <DuplicateOutlineIcon /> } onClick={ copy } title='Duplicate token' />
                <Button value={ token.hidden ? <EyeOffOutlineIcon /> : <EyeOutlineIcon /> } onClick={ (e) => onToggle('hidden', e) } title={ token.hidden ? 'Hidden' : 'Shown' } />
                <Button value={ token.pc ? <UserSquareOutlineIcon className='text-red-300' /> : <DesktopOutlineIcon /> } onClick={ (e) => onToggle('pc', e) } title={ token.pc ? 'Player Character' : 'Non-Player Character' } />
                <Button value={ token.selected ? <CheckSquareOutlineIcon /> : <SquareOutlineIcon /> } onClick={ (e) => selectToken(token, e) } title={ token.selected ? 'Selected' : 'Unselected' } />
                <Button value={ token.ko ? <UserXOutlineIcon /> : <UserCheckOutlineIcon /> } onClick={ (e) => onToggle('ko', e) } title={ token.ko ? 'Dead' : 'Alive' } />
                <Button value={ token.showLabel ? <FormattingOutlineIcon /> : <FormattingClearOutlineIcon /> } onClick={ (e) => onToggle('showLabel', e) } title={ token.showLabel ? 'Label shown' : 'Label hidden' } />
                <label>wh:</label>
                <input value={ token.width || '' } placeholder='w' onChange={ (e) => onIntegerChange('width', e) } type='number' step='5' min='0' title='width' className={ 'w-24 ' + controlPanelInputClass } />
                <input value={ token.height || '' } placeholder='h' onChange={ (e) => onIntegerChange('height', e) } type='number' step='5' min='0' title='height' className={ 'w-24 ' + controlPanelInputClass } />
                <select value={ !isNaN(token.mapId) ? token.mapId : -1 } onChange={ (e) => onMapSelect(e) } title='which map' className={ controlPanelSelectClass }>
                    <option key={ -1 } value={ -1 } >All</option>
                    { maps.map((map) => (
                        <option key={ map.id } value={ map.id } >{ map.name }</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default HostTokenConfigView
