import React from 'react'
import { connect } from 'react-redux'
import Canvas from './Canvas'

const Fog = ({ game, metadata, settings }) => {
    const fogOpacity = metadata.isHost ? settings.fogOpacity : 1

    const getMap = () => {
        if (game.maps.length === 0)
            return undefined
        const currMap = game.maps.filter((map) => parseInt(map.id) === parseInt(game.mapId))
        return currMap.length > 0 ? currMap[0] : game.maps[0]
    }
    const map = getMap()

    const renderFogLayer = (ctx) => {
        if (!map) {
            return
        }
        if (!ctx)
            return

        ctx.beginPath()
        ctx.globalCompositeOperation = 'destination-over'
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, game.width, game.height)
        for(let pathId = 0; pathId < map.fogPaths.length; pathId++) {
            const currPath = map.fogPaths[pathId]
            ereaseFog(ctx, currPath)
            ctx.stroke()
        }
    }

    const ereaseFog = (ctx, currPath) => {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        for (let pointId = 0; pointId < currPath.length; pointId++) {
            ctx.lineCap = 'round'
            ctx.fillStyle = currPath[pointId].drawColor
            ctx.lineWidth = currPath[pointId].r * settings.scale
            ctx.strokeStyle = currPath[pointId].drawColor
            if (pointId === 0) {
                ctx.moveTo(currPath[pointId].x * settings.scale + settings.deltaX, currPath[pointId].y * settings.scale + settings.deltaY)
            } else {
                ctx.lineTo(currPath[pointId].x * settings.scale + settings.deltaX, currPath[pointId].y * settings.scale + settings.deltaY)
            }
        }
    }

    return (
        game.fogEnabled ?
            <Canvas
                className='fog passthrough'
                style={{ opacity: fogOpacity }}
                width={ game.width }
                height={ game.height }
                draw={ renderFogLayer } />
            : null
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        settings: state.settings,
        metadata: state.metadata,
    }
}

export default connect(mapStateToProps, undefined)(Fog)
