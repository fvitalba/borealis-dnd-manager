import React from 'react'
import { ControlPanelSubcontainer } from '../..'
import { TextInput } from '@/components/TextInput'
import { GuestTokenConfigViewProps } from './types'

const GuestTokenConfigView = ({ token, onTextChange }: GuestTokenConfigViewProps) => {
    return (
        <ControlPanelSubcontainer>
            <TextInput value={ token.name } placeholder='Name' onChange={ (e) => onTextChange('name', e) } />
            <TextInput value={ token.imageUrl } placeholder='Image Url' onChange={ (e) => onTextChange('imageUrl', e) } />
        </ControlPanelSubcontainer>
    )
}

export default GuestTokenConfigView
