import React from 'react'
import { connect } from 'react-redux'
import drawImage from '../controllers/drawImage'
import Canvas from './Canvas.js'


const Background = ({ game }) => {
    const map = game.maps ? game.maps[game.mapId] : undefined

    const draw = (ctx) => {
        if (!map) {
            return
        }
        drawImage(map.imageUrl, map.name, map, ctx, null)
    }

    return (
        <Canvas
            id='background'
            width={ map ? map.width : 0 }
            height={ map ? map.height : 0 }
            draw={ draw } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

export default connect(mapStateToProps, undefined)(Background)
