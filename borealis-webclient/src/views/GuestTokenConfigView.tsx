import React, { ChangeEvent } from 'react'
import Token from '../classes/Token'

interface GuestTokenConfigViewProps {
    token: Token,
    onTextChange: (arg0: string, arg1: ChangeEvent<HTMLInputElement>) => void,
}

const GuestTokenConfigView = ({ token, onTextChange }: GuestTokenConfigViewProps) => {
    return (
        <div className='token-config'>
            <input value={ token.name || '' } placeholder='Name' size={ 8 } onChange={ (e) => onTextChange('name', e) } className='w-48 control-panel-input' />
            <input value={ token.imageUrl || '' } placeholder='Url' size={ 8 } onChange={ (e) => onTextChange('url', e) } className='w-96 control-panel-input' />
        </div>
    )
}

export default GuestTokenConfigView
