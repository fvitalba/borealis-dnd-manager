import Button from './Button'
import { DuplicateOutlineIcon, DesktopOutlineIcon, UserXOutlineIcon, UserSquareOutlineIcon, UserCheckOutlineIcon, CheckSquareOutlineIcon, SquareOutlineIcon, XSquareOutlineIcon } from './Icons'

const HostTokenConfigView = ({ maps, token, copy, onToggle, selectToken, onTextChange, onIntegerChange, onMapSelect, deleteToken }) => {
    return (
        <div className='token-config'>
            <div className='token-config-header'>
                <input value={ token.name || '' } placeholder='Name' size='8' onChange={ (e) => onTextChange('name', e) } className='control-panel-input-md' />
                <input value={ token.url || '' } placeholder='Url' size='8' onChange={ (e) => onTextChange('url', e) } className='pl-1 control-panel-input-very-long' />
            </div>
            <span className='tool-group'>
                <Button title='Duplicate token' value={ <DuplicateOutlineIcon /> } onClick={ copy } />
                <Button value={ token.pc ? <UserSquareOutlineIcon className='text-red-300' /> : <DesktopOutlineIcon /> } onClick={ (e) => onToggle('pc', e) } title='PC / NPC' />
                <Button value={ token.$selected ? <CheckSquareOutlineIcon /> : <SquareOutlineIcon /> } onClick={ (e) => selectToken(token, e) } title='Toggle selection' />
                <Button value={ token.ko ? <UserXOutlineIcon /> : <UserCheckOutlineIcon /> } onClick={ (e) => onToggle('ko', e) } title='Alive / Dead' />
            </span>
            wh:
            <input value={ token.width || '' } placeholder='w' onChange={ (e) => onIntegerChange('width', e) } type='number' step='5' min='0' title='width' className='control-panel-input-short' />
            <input value={ token.height || '' } placeholder='h' onChange={ (e) => onIntegerChange('height', e) } type='number' step='5' min='0' title='height' className='control-panel-input-short' />
            <select defaultValue={ token.mapId } onChange={ (e) => onMapSelect(e) } title='which map' className='control-panel-select'>
                <option key={ -1 } value={ -1 }>(all)</option>
                { maps.map((map) => (
                    <option key={ map.$id } value={ map.name }>{ map.name }</option>
                ))}
            </select>
            <span className='pl-1 tool-group'>
                <Button title='Delete token' value={ <XSquareOutlineIcon /> } onClick={ deleteToken } />
            </span>
        </div>
    )
}

export default HostTokenConfigView
