import ToolButton from '../components/ToolButton.js'

const ToolSelectView = ({ fogEnabled }) => {
    return (
        <span id='tools'>
            <ToolButton title='move' value='&#x1f9f3;' />
            <ToolButton title='draw' value='&#x1f58d;' />
            { fogEnabled ? <ToolButton title='fog'  value='&#x1f32c;' /> : null }
        </span>
    )
}

export default ToolSelectView
