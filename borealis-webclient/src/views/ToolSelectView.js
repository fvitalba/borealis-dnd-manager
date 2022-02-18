import ToolButton from '../components/ToolButton'
import { MoveOutline } from '@styled-icons/evaicons-outline/MoveOutline'
import { PencilFill } from '@styled-icons/bootstrap/PencilFill'
import { Cloud } from '@styled-icons/fa-solid/Cloud'

const ToolSelectView = ({ fogEnabled }) => {
    return (
        <span id='tools'>
            <ToolButton title='move' value={ <MoveOutline width='24' /> } />
            <ToolButton title='draw' value={ <PencilFill width='24' /> } />
            { fogEnabled ? <ToolButton title='fog'  value={ <Cloud width='24' /> } /> : null }
        </span>
    )
}

export default ToolSelectView
