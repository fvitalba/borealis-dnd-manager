import TokenConfig from '../components/TokenConfig.js'
import Button from './Button.js'

const TokenToolView = ({ newTokenUrl, setNewTokenUrl, createToken, tokens }) => {
    return (
        <div>
            <hr />
            <input placeholder='New token url' onChange={ (e) => setNewTokenUrl(e.target.value) } value={ newTokenUrl } />
            <Button title='Create new token' value='&#x2795;' onClick={ createToken } />
            { tokens.map((token, $i) => (
                <TokenConfig key={ `token${$i}` } token={ token } />
            ))}
        </div>
    )
}

export default TokenToolView
