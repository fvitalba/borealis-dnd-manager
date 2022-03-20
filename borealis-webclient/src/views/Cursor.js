const Cursor = ({ cursor, size }) => {
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
            { cursor.username }
        </div>
    )
}

export default Cursor
