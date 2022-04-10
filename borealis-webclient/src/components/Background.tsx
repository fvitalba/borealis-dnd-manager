import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { updateDeltaXY, updateScale } from '../reducers/settingsReducer'
import { drawImageObject } from '../utils/drawImage'
import Canvas from './Canvas'

const Background = ({ game, settings, updateDeltaXY, updateScale }) => {
    const [backgroundSettings, setBackgroundSettings] = useState({
        isDragging: false,
        imageObject: undefined,
    })
    const selectedMap = game.maps.filter((map) => map.id === game.mapId)
    const map = selectedMap.length > 0 ? selectedMap[0] : undefined

    const draw = useCallback((ctx) => {
        ctx.beginPath()
        ctx.clearRect(0, 0, game.width, game.height)
        if (!map || !backgroundSettings.imageObject) {
            return
        }
        drawImageObject(backgroundSettings.imageObject, map.x + settings.deltaX, map.y + settings.deltaY, map.width * settings.scale, map.height * settings.scale, ctx)
    }, [ settings.deltaX, settings.deltaY, settings.scale, map, backgroundSettings.imageObject ])

    useEffect(() => {
        const imgObject = new Image()
        imgObject.onload = () => {
            setBackgroundSettings({
                ...backgroundSettings,
                imageObject: imgObject,
            })
        }
        if (map)
            imgObject.src = map.imageUrl
    }, [ map ])

    const anyTokenSelected = () => {
        const selectedToken = game.tokens.filter((token) => token.selected)
        if (selectedToken[0])
            return true
        else
            return false
    }

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
        if (backgroundSettings.isDragging && (settings.tool === 'move') && (!anyTokenSelected()))
            updateDeltaXY(settings.deltaX + e.movementX, settings.deltaY + e.movementY)
    }

    const onWheel = (e) => {
        e.preventDefault()

        const scale = Math.min(Math.max(.125, (settings.scale + e.deltaY * -0.01)), 4)
        updateScale(scale)
    }

    return (
        <Canvas
            className='background'
            width={ game.width }
            height={ game.height }
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
        settings: state.settings,
    }
}

const mapDispatchToProps = {
    updateDeltaXY,
    updateScale,
}

export default connect(mapStateToProps, mapDispatchToProps)(Background)
