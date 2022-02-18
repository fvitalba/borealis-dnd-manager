import React from 'react'
import { connect } from 'react-redux'

const Overlay = ({ game, overlayRef }) => {
    const maps = game.maps
    const map = maps[game.mapId] || undefined
    const width = map ? map.width : game.width
    const height = map ? map.height : game.height
    const canvasRef = overlayRef

    return (
        <canvas
            id='overlay'
            ref={ canvasRef }
            width={ width }
            height={ height } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

export default connect(mapStateToProps, undefined)(Overlay)
