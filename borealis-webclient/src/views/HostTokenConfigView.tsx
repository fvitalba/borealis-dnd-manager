import React, { ChangeEvent, MouseEvent } from 'react'
import Map from '../classes/Map'
import Token, { TokenBooleanProperty, TokenTextProperty } from '../classes/Token'
import TokenCondition from '../enums/TokenCondition'
import TokenSize from '../enums/TokenSize'
import TokenType from '../enums/TokenType'
import Button from './Button'
import {
    DuplicateOutlineIcon,
    CheckSquareOutlineIcon,
    SquareOutlineIcon,
    XSquareOutlineIcon,
    EyeOutlineIcon,
    EyeOffOutlineIcon,
    FormattingOutlineIcon,
    FormattingClearOutlineIcon
} from './Icons'

interface HostTokenConfigViewProps {
    tokenSizes: Array<TokenSize>,
    tokenTypes: Array<TokenType>,
    tokenConditions: Array<TokenCondition>,
    maps: Array<Map>,
    token: Token,
    copy: () => void,
    onToggle: (arg0: TokenBooleanProperty, arg1: MouseEvent<HTMLButtonElement>) => void,
    onTextChange: (arg0: TokenTextProperty, arg1: ChangeEvent<HTMLInputElement>) => void,
    selectToken: (arg0: MouseEvent<HTMLButtonElement>) => void,
    onTypeSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    onConditionSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    onSizeSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    onMapSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    deleteToken: (arg0: MouseEvent<HTMLButtonElement>) => void,
}

const HostTokenConfigView = ({ tokenTypes, tokenConditions, tokenSizes, maps, token, copy, onToggle, onTextChange, selectToken, onTypeSelect, onConditionSelect, onSizeSelect, onMapSelect, deleteToken }: HostTokenConfigViewProps) => {
    const controlPanelInputClass = token.selected ? 'control-panel-input-selected' : 'control-panel-input'
    const controlPanelSelectClass = token.selected ? 'control-panel-select-selected' : 'control-panel-select'

    return (
        <div className={ token.selected ? 'token-config-selected' : 'token-config' }>
            <div className='token-config-header'>
                <input value={ token.name } placeholder='Name' size={ 8 } onChange={ (e) => onTextChange('name', e) } className={ 'w-48 ' + controlPanelInputClass } />
                <input value={ token.imageUrl } placeholder='Image Url' size={ 8 } onChange={ (e) => onTextChange('imageUrl', e) } className={ 'w-96 ' + controlPanelInputClass } />
                <Button title='Delete token' value={ <XSquareOutlineIcon /> } onClick={ deleteToken } />
            </div>
            <div className='token-config-details'>
                <Button value={ <DuplicateOutlineIcon /> } onClick={ copy } title='Duplicate token' />
                <Button value={ token.hidden ? <EyeOffOutlineIcon /> : <EyeOutlineIcon /> } onClick={ (e) => onToggle('hidden', e) } title={ token.hidden ? 'Hidden' : 'Shown' } />
                <select value={ token.type } onChange={ onTypeSelect } title='which type' className={ controlPanelSelectClass }>
                    { tokenTypes.map((type) => (
                        <option key={ type } value={ type } >{ TokenType[type] }</option>
                    ))}
                </select>
                <Button value={ token.selected ? <CheckSquareOutlineIcon /> : <SquareOutlineIcon /> } onClick={ (e) => selectToken(e) } title={ token.selected ? 'Selected' : 'Unselected' } />
                <select value={ token.condition } onChange={ onConditionSelect } title='which condition' className={ controlPanelSelectClass }>
                    { tokenConditions.map((condition) => (
                        <option key={ condition } value={ condition } >{ TokenCondition[condition] }</option>
                    ))}
                </select>
                <Button value={ token.showLabel ? <FormattingOutlineIcon /> : <FormattingClearOutlineIcon /> } onClick={ (e) => onToggle('showLabel', e) } title={ token.showLabel ? 'Label shown' : 'Label hidden' } />
                <select value={ token.size } onChange={ onSizeSelect } title='which size' className={ controlPanelSelectClass }>
                    { tokenSizes.map((size) => (
                        <option key={ size } value={ size } >{ TokenSize[size] }</option>
                    ))}
                </select>
                <select value={ token.mapId } onChange={ onMapSelect } title='which map' className={ controlPanelSelectClass }>
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
