import { useState } from 'react'
import { connect } from 'react-redux'
import { addToken } from '../reducers/gameReducer'
import TokenToolView from '../views/TokenToolView'
import SelectedTokensControls from './SelectedTokensControls'

const TokenTool = ({ toggleOnTokens, game, addToken, metadata }) => {
    const [newTokenName, setNewTokenName] = useState('')

    if (!metadata.isHost)
        return null

    const createToken = () => {
        if (!newTokenName)
            return
        addToken(newTokenName, '', game.mapId)
        setNewTokenName('')
    }

    const currentTokens = game.tokens.filter((token) => (token.mapId === undefined) || (token.mapId === game.mapId))

    return (
        toggleOnTokens
            ? <TokenToolView newTokenName={ newTokenName } setNewTokenName={ setNewTokenName } createToken={ createToken } tokens={ currentTokens } />
            : <SelectedTokensControls tokens={ currentTokens } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        metadata: state.metadata,
    }
}

const mapDispatchToProps = {
    addToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenTool)
