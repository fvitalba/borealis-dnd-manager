import React from 'react'
import TokenCondition from '@/enums/TokenCondition'
import TokenSize from '@/enums/TokenSize'
import TokenType from '@/enums/TokenType'
import { ActionButton } from '@/components/ActionButton'
import { ControlPanelRow } from '../..'
import { ControlPanelSubcontainer } from '../..'
import { TextInput } from '@/components/TextInput'
import { OptionSelector } from '@/components/OptionSelector'
import {
    BorealisDeleteTokenIcon,
    BorealisDuplicateTokenIcon,
    BorealisShowTokenIcon,
    BorealisHideTokenIcon,
    BorealisTokenSelectedIcon,
    BorealisTokenDeselectedIcon,
    BorealisShowTokenNameIcon,
    BorealisHideTokenNameIcon,
} from '@/views/Icons'
import { HostTokenConfigViewProps } from './types'

const HostTokenConfigView = ({ tokenTypes, tokenConditions, tokenSizes, maps, token, copy, onToggle, onTextChange, selectToken, onTypeSelect, onConditionSelect, onSizeSelect, onMapSelect, deleteToken }: HostTokenConfigViewProps) => {
    const tokenTypeOptions = tokenTypes.map((tokenType) => {
        return {
            key: tokenType,
            value: tokenType,
            caption: TokenType[tokenType],
        }
    })
    const tokenConditionOptions = tokenConditions.map((tokenCondition) => {
        return {
            key: tokenCondition,
            value: tokenCondition,
            caption: TokenCondition[tokenCondition],
        }
    })
    const tokenSizeOptions = tokenSizes.map((tokenSize) => {
        return {
            key: tokenSize,
            value: tokenSize,
            caption: TokenSize[tokenSize],
        }
    })
    const tokenMapOptions = [{
        key: -1,
        value: -1,
        caption: 'All',
    }].concat(maps.map((map) => {
        return {
            key: map.id,
            value: map.id,
            caption: map.name,
        }
    }))

    return (
        <ControlPanelSubcontainer>
            <ControlPanelRow>
                <TextInput value={ token.name } placeholder='Name' onChange={ (e) => onTextChange('name', e) } />
                <TextInput value={ token.imageUrl } placeholder='Image Url' onChange={ (e) => onTextChange('imageUrl', e) } />
                <ActionButton title='Delete token' value={ <BorealisDeleteTokenIcon /> } onClick={ deleteToken } />
            </ControlPanelRow>
            <ControlPanelRow>
                <ActionButton value={ <BorealisDuplicateTokenIcon /> } onClick={ copy } title='Duplicate token' />
                <ActionButton value={ token.hidden ? <BorealisHideTokenIcon /> : <BorealisShowTokenIcon /> } onClick={ (e) => onToggle('hidden', e) } title={ token.hidden ? 'Hidden' : 'Shown' } />
                <OptionSelector value={ token.type } onChange={ onTypeSelect } title='which type' options={ tokenTypeOptions } />
                <ActionButton value={ token.selected ? <BorealisTokenSelectedIcon /> : <BorealisTokenDeselectedIcon /> } onClick={ (e) => selectToken(e) } title={ token.selected ? 'Selected' : 'Unselected' } />
                <OptionSelector value={ token.condition } onChange={ onConditionSelect } title='which condition' options={ tokenConditionOptions } />
                <ActionButton value={ token.showLabel ? <BorealisShowTokenNameIcon /> : <BorealisHideTokenNameIcon /> } onClick={ (e) => onToggle('showLabel', e) } title={ token.showLabel ? 'Label shown' : 'Label hidden' } />
                <OptionSelector value={ token.size } onChange={ onSizeSelect } title='which size' options={ tokenSizeOptions } />
                <OptionSelector value={ token.mapId } onChange={ onMapSelect } title='which map' options={ tokenMapOptions } />
            </ControlPanelRow>
        </ControlPanelSubcontainer>
    )
}

export default HostTokenConfigView
