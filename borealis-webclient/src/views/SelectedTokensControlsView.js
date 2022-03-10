import TokenConfig from '../components/TokenConfig'

const SelectedTokensControlsView = ({ tokens }) => {
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
