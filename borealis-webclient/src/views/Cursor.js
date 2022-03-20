import { CursorAltOutlineIcon } from './Icons'

const Cursor = ({ cursor }) => {
    const divStyle = {
        top: cursor.y,
        left: cursor.x,
    }

    return (
        <div style={ divStyle } className='cursor' >
            <CursorAltOutlineIcon />
            { cursor.username }
        </div>
    )
}

export default Cursor
