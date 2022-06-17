import React, { ChangeEvent } from 'react'
import Token, { TokenTextProperty } from '../classes/Token'
import ControlPanelSubcontainer from './GenericViews/ControlPanelSubcontainer'
import TextInput from './GenericViews/TextInput'

interface GuestTokenConfigViewProps {
    token: Token,
    onTextChange: (arg0: TokenTextProperty, arg1: ChangeEvent<HTMLInputElement>) => void,
}

const GuestTokenConfigView = ({ token, onTextChange }: GuestTokenConfigViewProps) => {
    return (
        <ControlPanelSubcontainer>
            <TextInput value={ token.name } placeholder='Name' onChange={ (e) => onTextChange('name', e) } />
            <TextInput value={ token.imageUrl } placeholder='Image Url' onChange={ (e) => onTextChange('imageUrl', e) } />
        </ControlPanelSubcontainer>
    )
}

export default GuestTokenConfigView
