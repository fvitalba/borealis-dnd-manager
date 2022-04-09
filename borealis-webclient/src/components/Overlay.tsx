import React from 'react'
import { connect } from 'react-redux'

const Overlay = ({ game, overlayRef }) => {
    const canvasRef = overlayRef

    return (
        <canvas
            className='overlay'
            ref={ canvasRef }
            width={ game.width }
            height={ game.height } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

export default connect(mapStateToProps, undefined)(Overlay)
