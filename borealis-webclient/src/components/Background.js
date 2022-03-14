import React, { useState } from 'react'
import { connect } from 'react-redux'
import drawImage from '../controllers/drawImage'
//import { updateMaps } from '../reducers/gameReducer'
import Canvas from './Canvas'

const Background = ({ game /*, updateMaps*/ }) => {
    const [backgroundSettings, setBackgroundSettings] = useState({
        deltaX: 0,
        deltaY: 0,
        scale: 1.0,
    })
    const selectedMap = game.maps.filter((map) => map.id === game.mapId)
    const map = selectedMap.length > 0 ? selectedMap[0] : undefined

    const draw = (ctx) => {
        if (!map) {
            return
        }
        drawImage(map.imageUrl, map.name, map.x + backgroundSettings.deltaX, map.y + backgroundSettings.deltaY, map.width * backgroundSettings.scale, map.height * backgroundSettings.scale, ctx)
    }

    const onMouseDown = (e) => {
        console.log('clicked on background')
    }

    const onMouseUp = (e) => {
        console.log('released mouse on background')
    }

    const onMouseMove = (e) => {
        console.log('moving mouse', e)
    }

    return (
        <Canvas
            className='background'
            width={ map ? map.width : 0 }
            height={ map ? map.height : 0 }
            draw={ draw }
            onMouseUp={ onMouseUp }
            onMouseDown={ onMouseDown }
            onMouseMove={ onMouseMove } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
    //updateMaps,
}

export default connect(mapStateToProps, mapDispatchToProps)(Background)
