const Cursor = ({ cursor, size, name }) => {
    const divStyle = {
        top: cursor.y,
        left: cursor.x,
    }
    const imgStyle = {
        fontSize: size || undefined,
    }

    return (
        <div style={ divStyle } className='cursor' >
            <span role='img' aria-label='pointer' style={ imgStyle }>&#x1f5e1;</span>
            { cursor.u || name }
        </div>
    )
}

export default Cursor
