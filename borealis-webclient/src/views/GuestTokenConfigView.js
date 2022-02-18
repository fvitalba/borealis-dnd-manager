const GuestTokenConfigView = ({ token, onTextChange, onIntegerChange }) => {
    return (
        <div className='tokenConfig'>
            <input value={ token.name || '' } placeholder='Name' size='8' onChange={ (e) => onTextChange('name', e) } />
            <input value={ token.url || '' } placeholder='Url' size='8' onChange={ (e) => onTextChange('url', e) } />
            wh:
            <input value={ token.width || '' } placeholder='w' className='text2' onChange={ (e) => onIntegerChange('width', e) } type='number' step='5' min='0' title='width' />
            <input value={ token.height || '' } placeholder='h' className='text2' onChange={ (e) => onIntegerChange('height', e) } type='number' step='5' min='0' title='height' />
            xy:
            <input value={ token.x || '' } placeholder='x' className='text3' onChange={ (e) => onIntegerChange('x', e) } type='number' step='5' title='x coord' />
            <input value={ token.y || '' } placeholder='y' className='text3' onChange={ (e) => onIntegerChange('y', e) } type='number' step='5' title='y coord' />
        </div>
    )
}

export default GuestTokenConfigView
