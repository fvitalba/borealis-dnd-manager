import { connect } from 'react-redux'
import { setToolSettings } from '../reducers/settingsReducer'
import Button from '../views/Button'

const ToolButton = ({ title, value, settings, setToolSettings }) => {
    const isSelected = title === settings.tool
    const onClick = () => {
        if (title === 'draw')
            setToolSettings(title, 'pencil')
        else
            setToolSettings(title, undefined)
    }

    return (
        <Button title={ title } value={ value } onClick={ onClick } isSelected={ isSelected } />
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
