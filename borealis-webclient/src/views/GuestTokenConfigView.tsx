const GuestTokenConfigView = ({ token, onTextChange }) => {
    return (
        <div className='token-config'>
            <input value={ token.name || '' } placeholder='Name' size='8' onChange={ (e) => onTextChange('name', e) } className='w-48 control-panel-input' />
            <input value={ token.url || '' } placeholder='Url' size='8' onChange={ (e) => onTextChange('url', e) } className='w-96 control-panel-input' />
        </div>
    )
}

export default GuestTokenConfigView
