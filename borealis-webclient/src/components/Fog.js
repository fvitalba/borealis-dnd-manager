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
        ctx.beginPath()
        ctx.globalCompositeOperation = 'destination-out'
        let gradient
        for (let pointId = 0; pointId < currPath.length; pointId++) {
            const scaledPath = {
                ...currPath[pointId],
                x: currPath[pointId].x * settings.scale + settings.deltaX,
                y: currPath[pointId].y * settings.scale + settings.deltaY,
                r: currPath[pointId].r * settings.scale,
                r2: currPath[pointId].r2 ? currPath[pointId].r2 * settings.scale : 1 * settings.scale,
            }
            gradient = ctx.createRadialGradient(scaledPath.x, scaledPath.y, scaledPath.r2, scaledPath.x, scaledPath.y, scaledPath.r*0.75)
            gradient.addColorStop(0, 'rgba(0,0,0,255)')
            gradient.addColorStop(1, 'rgba(0,0,0,0)')
            ctx.fillStyle = gradient
            ctx.fillRect(scaledPath.x - scaledPath.r, scaledPath.y - scaledPath.r, scaledPath.x + scaledPath.r, scaledPath.y + currPath[pointId].r)
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
