import TokenConfig from '../components/TokenConfig'
import Button from './Button'

const TokenToolView = ({ newTokenUrl, setNewTokenUrl, createToken, tokens }) => {
    return (
        <div className='control-panel-submenu'>
            <input placeholder='New token url' onChange={ (e) => setNewTokenUrl(e.target.value) } value={ newTokenUrl } className='control-panel-input' />
            <Button title='Create new token' value='&#x2795;' onClick={ createToken } />
            { tokens.map((token, $i) => (
                <TokenConfig key={ `token${$i}` } token={ token } />
            ))}
        </div>
    )
}

export default TokenToolView
