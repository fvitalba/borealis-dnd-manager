import React, { useCallback, useEffect, useState, MouseEvent, WheelEvent } from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import Canvas from './Canvas'
import ControlTool from '../enums/Tool'
import StateInterface from '../interfaces/StateInterface'
import { SettingsState, updateDeltaXY, updateScale } from '../reducers/settingsReducer'
import { MapState } from '../reducers/mapReducer'
import { drawImageObject } from '../utils/drawImage'

interface BackgroundProps {
    gameState: Game,
    mapState: MapState,
    settingsState: SettingsState,
    updateDeltaXY: (arg0: number, arg1: number) => void,
    updateScale: (arg0: number) => void,
}

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
