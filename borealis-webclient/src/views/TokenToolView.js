import TokenConfig from '../components/TokenConfig'
import Button from './Button'
import { UserAddSolidIcon } from './Icons'

const TokenToolView = ({ newTokenUrl, setNewTokenUrl, createToken, tokens }) => {
    return (
        <div className='token-tool-view'>
            <div className='token-tool-creation'>
                <input placeholder='New token url' onChange={ (e) => setNewTokenUrl(e.target.value) } value={ newTokenUrl } className='w-96 control-panel-input' />
                <Button title='Create new token' value={ <UserAddSolidIcon /> } onClick={ createToken } />
            </div>
            {
                tokens.length > 0
                    ? <div className='token-config-collection'>
                        { tokens.map((token, $i) => (
                            <TokenConfig key={ `token${$i}` } token={ token } />
                        ))}
                    </div>
                    : null
            }
        </div>
    )
}

export default TokenToolView
