import TokenConfig from '../components/TokenConfig'
import Button from './Button'
import { UserAddSolidIcon } from './Icons'

const TokenToolView = ({ newTokenName, setNewTokenName, createToken, tokens }) => {
    return (
        <div className='token-tool-view'>
            <div className='token-tool-creation'>
                <input placeholder='New token name' onChange={ (e) => setNewTokenName(e.target.value) } value={ newTokenName } className='w-96 control-panel-input' />
                <Button title='Create new token' value={ <UserAddSolidIcon /> } onClick={ createToken } disabled={ newTokenName === '' } />
            </div>
            {
                tokens.length > 0
                    ? <div className='token-config-collection'>
                        { tokens.map((token, index) => (
                            <TokenConfig key={ `token${index}` } token={ token } />
                        ))}
                    </div>
                    : null
            }
        </div>
    )
}

export default TokenToolView
