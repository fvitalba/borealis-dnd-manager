import ToolButton from '../components/ToolButton'
import { Cloud } from '@styled-icons/fa-solid/Cloud'
import { LocationSolidIcon, EditSolidIcon } from './Icons'

const ToolSelectView = ({ fogEnabled }) => {
    return (
        <div className='tool-select-view'>
            <ToolButton title='move' value={ <LocationSolidIcon /> } />
            <ToolButton title='draw' value={ <EditSolidIcon /> } />
            { fogEnabled ? <ToolButton title='fog'  value={ <Cloud width='30' /> } /> : null }
        </div>
    )
}

export default ToolSelectView
