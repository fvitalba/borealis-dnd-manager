import TokenConfig from '../components/TokenConfig.js'

const SelectedTokensControlsView = ({ tokens }) => {
    const filteredTokens = tokens.filter(t => t.$selected)
    return (
        <div>
            { filteredTokens.map((token, $i) => (
                <TokenConfig key={ `token${$i}` } token={ token } />
            ))}
        </div>
    )
}

export default SelectedTokensControlsView
