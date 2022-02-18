import { connect } from 'react-redux'
import { setToolSettings } from '../reducers/settingsReducer'
import Button from '../views/Button'

function ToolButton({ title, value, settings, setToolSettings }) {
    const isSelected = title === settings.tool
    const onClick = () => {
        setToolSettings(title, undefined)
    }
    return (
        <Button title={ title } value={ value.toString() } onClick={ onClick } isSelected={ isSelected } />
    )
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    }
}

const mapDispatchToProps = {
    setToolSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolButton)
