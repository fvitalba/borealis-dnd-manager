const GuestTokenConfigView = ({ token, onTextChange, onIntegerChange }) => {
    return (
        <div className='token-config'>
            <input value={ token.name || '' } placeholder='Name' size='8' onChange={ (e) => onTextChange('name', e) } className='control-panel-input' />
            <input value={ token.url || '' } placeholder='Url' size='8' onChange={ (e) => onTextChange('url', e) } className='control-panel-input' />
            wh:
            <input value={ token.width || '' } placeholder='w' onChange={ (e) => onIntegerChange('width', e) } type='number' step='5' min='0' title='width' className='control-panel-input-short' />
            <input value={ token.height || '' } placeholder='h' onChange={ (e) => onIntegerChange('height', e) } type='number' step='5' min='0' title='height' className='control-panel-input-short' />
            xy:
            <input value={ token.x || '' } placeholder='x' onChange={ (e) => onIntegerChange('x', e) } type='number' step='5' title='x coord' className='control-panel-input-short' />
            <input value={ token.y || '' } placeholder='y' onChange={ (e) => onIntegerChange('y', e) } type='number' step='5' title='y coord' className='control-panel-input-short' />
        </div>
    )
}

export default GuestTokenConfigView
