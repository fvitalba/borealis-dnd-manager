import React, { ChangeEvent } from 'react'
import Token, { TokenTextProperty } from '../classes/Token'

interface GuestTokenConfigViewProps {
    token: Token,
    onTextChange: (arg0: TokenTextProperty, arg1: ChangeEvent<HTMLInputElement>) => void,
}

const GuestTokenConfigView = ({ token, onTextChange }: GuestTokenConfigViewProps) => {
    return (
        <div className='token-config'>
            <input value={ token.name } placeholder='Name' size={ 8 } onChange={ (e) => onTextChange('name', e) } className='w-48 control-panel-input' />
            <input value={ token.imageUrl } placeholder='Image Url' size={ 8 } onChange={ (e) => onTextChange('imageUrl', e) } className='w-96 control-panel-input' />
        </div>
    )
}

export default GuestTokenConfigView
