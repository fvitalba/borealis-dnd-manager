import ToolButton from '../components/ToolButton'
import { LocationSolidIcon, EditSolidIcon, CloudOffSolidIcon } from './Icons'

const ToolSelectView = ({ isHost, fogEnabled }) => {
    return (
        <div className='tool-select-view'>
            <ToolButton title='move' value={ <LocationSolidIcon /> } />
            <ToolButton title='draw' value={ <EditSolidIcon /> } />
            { (fogEnabled && isHost) ? <ToolButton title='fog'  value={ <CloudOffSolidIcon /> } /> : null }
        </div>
    )
}

export default ToolSelectView