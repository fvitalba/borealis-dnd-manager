import React from 'react'
import { connect } from 'react-redux'
import StateInterface from '@/interfaces/StateInterface'
import SelectedTokensControlsView from './SelectedTokensControlsView'
import { SelectedTokensControlsProps } from './types'

const SelectedTokensControls = ({ tokenState }: SelectedTokensControlsProps) => {
    const filteredTokens = tokenState.tokens.filter(token => token.selected)
    return (
        <SelectedTokensControlsView tokens={ filteredTokens } />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        tokenState: state.token,
    }
}

export default connect(mapStateToProps, {})(SelectedTokensControls)
