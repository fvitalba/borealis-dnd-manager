import ToolButton from '../components/ToolButton'
import { MoveOutline } from '@styled-icons/evaicons-outline/MoveOutline'
import { PencilFill } from '@styled-icons/bootstrap/PencilFill'
import { Cloud } from '@styled-icons/fa-solid/Cloud'

const ToolSelectView = ({ fogEnabled }) => {
    return (
        <span id='tools' className='tool-group'>
            <ToolButton title='move' value={ <MoveOutline width='30' /> } />
            <ToolButton title='draw' value={ <PencilFill width='30' /> } />
            { fogEnabled ? <ToolButton title='fog'  value={ <Cloud width='30' /> } /> : null }
        </span>
    )
}

export default ToolSelectView
