import React from 'react'
import TokenConfig from '../TokenConfig/TokenConfig'
import { SelectedTokensControlsViewProps } from './types'

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
