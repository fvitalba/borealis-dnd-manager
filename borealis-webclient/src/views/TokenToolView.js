import TokenConfig from '../components/TokenConfig'
import Button from './Button'

import { PersonAdd } from '@styled-icons/evaicons-solid/PersonAdd'

const TokenToolView = ({ newTokenUrl, setNewTokenUrl, createToken, tokens }) => {
    return (
        <div className='control-panel-submenu'>
            <input placeholder='New token url' onChange={ (e) => setNewTokenUrl(e.target.value) } value={ newTokenUrl } className='control-panel-input-very-long' />
            <span className='pl-1 tool-group'>
                <Button title='Create new token' value={ <PersonAdd width='30' /> } onClick={ createToken } />
            </span>
            <div className='token-config-collection'>
                { tokens.map((token, $i) => (
                    <TokenConfig key={ `token${$i}` } token={ token } />
                ))}
            </div>
        </div>
    )
}

export default TokenToolView
