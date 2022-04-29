import React from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import Path from '../classes/Path'
import Canvas from './Canvas'
import UserType from '../enums/UserType'
import StateInterface from '../interfaces/StateInterface'
import { MapState } from '../reducers/mapReducer'
import { MetadataState } from '../reducers/metadataReducer'
import { SettingsState } from '../reducers/settingsReducer'
import { getMap } from '../utils/mapHandler'

interface FogProps {
    gameState: Game,
    mapState: MapState,
    metadataState: MetadataState,
    settingsState: SettingsState,
}

const Fog = ({ gameState, mapState, metadataState, settingsState }: FogProps) => {
    const fogOpacity = metadataState.userType === UserType.host ? settingsState.fogOpacity : 1
    const map = getMap(mapState, gameState.currentMapId)

    const renderFogLayer = (ctx: CanvasRenderingContext2D) => {
        if (!map)
            return
        if (!ctx)
            return

        ctx.beginPath()
        ctx.globalCompositeOperation = 'destination-over'
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, gameState.width, gameState.height)
        for(let pathId = 0; pathId < map.fogPaths.length; pathId++) {
            const currPath = map.fogPaths[pathId]
            ereaseFog(ctx, currPath)
            ctx.stroke()
        }
    }

    const ereaseFog = (ctx: CanvasRenderingContext2D, currPath: Path) => {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        for (let pointId = 0; pointId < currPath.points.length; pointId++) {
            ctx.lineCap = 'round'
            ctx.fillStyle = currPath.drawColor
            ctx.lineWidth = currPath.r * settingsState.scale
            ctx.strokeStyle = currPath.drawColor
            const translatedPoint = currPath.points[pointId].translatePoint(settingsState.deltaX, settingsState.deltaY, settingsState.scale)
            if (pointId === 0) {
                ctx.moveTo(translatedPoint.x, translatedPoint.y)
            } else {
                ctx.lineTo(translatedPoint.x, translatedPoint.y)
            }
        }
    }

    return (
        gameState.fogEnabled ?
            <Canvas
                id='fog'
                className='fog passthrough'
                style={{ opacity: fogOpacity }}
                width={ gameState.width }
                height={ gameState.height }
                draw={ renderFogLayer } />
            : null
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        mapState: state.map,
        settingsState: state.settings,
        metadataState: state.metadata,
    }
}

export default connect(mapStateToProps, {})(Fog)
