import { connect } from 'react-redux'
import SelectedTokensControlsView from '../views/SelectedTokensControlsView'

const SelectedTokensControls = ({ game }) => {
    const filteredTokens = game.tokens.filter(t => t.selected)
    return (
        <SelectedTokensControlsView tokens={ filteredTokens } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

export default connect(mapStateToProps, undefined)(SelectedTokensControls)
