import React from 'react'
import { connect } from 'react-redux'
import drawImage from '../controllers/drawImage'
import Canvas from './Canvas.js'


const Background = ({ game }) => {
    const selectedMap = game.maps.filter((map) => map.id === game.mapId)
    const map = selectedMap.length > 0 ? selectedMap[0] : undefined

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
