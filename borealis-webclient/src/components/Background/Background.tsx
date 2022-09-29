import React, { useCallback, useEffect, useState, MouseEvent, WheelEvent } from 'react'
import { connect } from 'react-redux'
import { Canvas } from '@/components/Canvas'
import ControlTool from '@/enums/Tool'
import StateInterface from '@/interfaces/StateInterface'
import { updateDeltaXY, updateScale } from '@/reducers/settingsReducer'
import { drawImageObject } from '@/utils/drawImage'
import { BackgroundProps } from './types'

const Background = ({ gameState, mapState, settingsState, updateDeltaXY, updateScale }: BackgroundProps) => {
    const [backgroundSettings, setBackgroundSettings] = useState({
        isDragging: false,
        imageObject: new Image(),
    })
    const currentMap = gameState.getCurrentMap(mapState.maps)

    const draw = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        ctx.clearRect(0, 0, gameState.width, gameState.height)
        if (currentMap.isEmpty() || !backgroundSettings.imageObject) {
            return
        }
        const imageSize = currentMap.getScaledAndOffsetSize(settingsState.deltaX, settingsState.deltaY, settingsState.scale)
        drawImageObject(backgroundSettings.imageObject, imageSize.x, imageSize.y, imageSize.width, imageSize.height, ctx)
    }, [ settingsState.deltaX, settingsState.deltaY, settingsState.scale, currentMap, backgroundSettings.imageObject ])

    useEffect(() => {
        const imgObject = new Image()
        imgObject.onload = () => {
            setBackgroundSettings({
                ...backgroundSettings,
                imageObject: imgObject,
            })
        }
        if (!currentMap.isEmpty())
            imgObject.src = currentMap.backgroundUrl

        // Scale Image to Window Size
        const scaleX = (gameState.width !== 0) && (imgObject.width !== 0) ? Math.floor(gameState.width / imgObject.width * 10) / 10 : 1
        const scaleY = (gameState.height !== 0) && (imgObject.height !== 0) ? Math.floor(gameState.height / imgObject.height * 10) / 10 : 1
        const scale = scaleX < scaleY ? scaleX : scaleY
        if (scale !== settingsState.scale)
            updateScale(scale)

        // Center Background on load
        const deltaX = (gameState.width - (imgObject.width * scale)) / 2
        const deltaY = (gameState.height - (imgObject.height * scale)) / 2
        if ((deltaX !== settingsState.deltaX) || (deltaY !== settingsState.deltaY))
            updateDeltaXY(deltaX, deltaY)
    }, [ currentMap, gameState.currentMapId, mapState.maps ])

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

    const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (backgroundSettings.isDragging && (settingsState.tool === ControlTool.Move) && (!gameState.tokenSelected))
            updateDeltaXY(settingsState.deltaX + e.movementX, settingsState.deltaY + e.movementY)
    }

    const onWheel = (e: WheelEvent<HTMLCanvasElement>) => {
        e.preventDefault()

        const scale = Math.min(Math.max(.125, (settingsState.scale + e.deltaY * -0.01)), 4)
        updateScale(scale)
    }

    return (
        <Canvas
            id='background'
            className='borealis-background'
            width={ gameState.width }
            height={ gameState.height }
            draw={ draw }
            onMouseUp={ onMouseUp }
            onMouseDown={ onMouseDown }
            onMouseMove={ onMouseMove }
            onWheel={ onWheel } />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        mapState: state.map,
        settingsState: state.settings,
    }
}

const mapDispatchToProps = {
    updateDeltaXY,
    updateScale,
}

export default connect(mapStateToProps, mapDispatchToProps)(Background)
