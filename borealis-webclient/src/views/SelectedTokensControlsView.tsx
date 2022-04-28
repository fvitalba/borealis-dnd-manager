import React from 'react'
import Token from '../classes/Token'
import TokenConfig from '../components/TokenConfig'

interface SelectedTokensControlsViewProps {
    tokens: Array<Token>,
}

const SelectedTokensControlsView = ({ tokens }: SelectedTokensControlsViewProps) => {
    const filteredTokens = tokens.filter(t => t.selected)
    return (
        <div>
            { filteredTokens.map((token, index) => (
                <TokenConfig key={ `token${index}` } token={ token } />
            ))}
        </div>
    )
}

export default SelectedTokensControlsView
