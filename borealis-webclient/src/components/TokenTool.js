import { useState } from 'react'
import { connect } from 'react-redux'
import { addToken } from '../reducers/gameReducer.js'
import TokenToolView from '../views/TokenToolView.js'
import SelectedTokensControls from './SelectedTokensControls.js'

const TokenTool = ({ toggleOnTokens, game, addToken, metadata }) => {
    const [newTokenUrl, setNewTokenUrl] = useState('')

	if (!metadata.isHost)
		return null

    const createToken = () => {
        if (!newTokenUrl)
            return
        addToken(undefined, newTokenUrl, game.mapId)
        setNewTokenUrl('')
    }

    return (
        toggleOnTokens ?
            <TokenToolView newTokenUrl={ newTokenUrl } setNewTokenUrl={ setNewTokenUrl } createToken={ createToken } tokens={ game.tokens } /> :
            <SelectedTokensControls tokens={ game.tokens } />
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
