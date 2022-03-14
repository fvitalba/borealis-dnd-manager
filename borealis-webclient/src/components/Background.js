import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import drawImage from '../controllers/drawImage'
import Canvas from './Canvas'

const Background = ({ game }) => {
    const [backgroundSettings, setBackgroundSettings] = useState({
        deltaX: 0,
        deltaY: 0,
        scale: 1.0,
        isDragging: false,
    })
    const selectedMap = game.maps.filter((map) => map.id === game.mapId)
    const map = selectedMap.length > 0 ? selectedMap[0] : undefined

    const draw = useCallback((ctx) => {
        if (!map) {
            return
        }
        drawImage(map.imageUrl, map.name, map.x + backgroundSettings.deltaX, map.y + backgroundSettings.deltaY, map.width * backgroundSettings.scale, map.height * backgroundSettings.scale, ctx)
    }, [ backgroundSettings, map ])

    const onMouseDown = () => {
        setBackgroundSettings({
            ...backgroundSettings,
            isDragging: true,
        })
    }

    const onMouseUp = () => {
        setBackgroundSettings({
            ...backgroundSettings,
            isDragging: false,
        })
    }

    const onMouseMove = (e) => {
        if (backgroundSettings.isDragging)
            setBackgroundSettings({
                ...backgroundSettings,
                deltaX: backgroundSettings.deltaX + e.movementX,
                deltaY: backgroundSettings.deltaY + e.movementY,
            })
    }

    const onWheel = (e) => {
        e.preventDefault()
        console.log(e.deltaY * -0.01)

        const scale = Math.min(Math.max(.125, (backgroundSettings.scale + e.deltaY * -0.01)), 4)
        console.log(scale)
        setBackgroundSettings({
            ...backgroundSettings,
            scale: scale,
        })
    }

    return (
        <Canvas
            className='background'
            width={ map ? map.width : 0 }
            height={ map ? map.height : 0 }
            draw={ draw }
            onMouseUp={ onMouseUp }
            onMouseDown={ onMouseDown }
            onMouseMove={ onMouseMove }
            onWheel={ onWheel } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Background)
