import React, { useState } from 'react'

const Canvas = ({ id, ref, onClick, game, resizeCanvases }) => {
  const [canvasRef, setCanvasRef] = useState(React.createRef())

  const buildDataUrl = () => { return getCanvas().toDataURL('image/webp', 0.5) }
  const clear = () => {
    const node = canvasRef.current
    const w = node.width
    node.width = w
  }
  const gameState = () => { return game.state }
  const map = () => { return game.map }
  const height = () => { return getCanvas().height }
  const width = () => { return getCanvas().width }
  const getCanvas = () => { return canvasRef.current }
  const getContext = () => { return getCanvas().getContext('2d') }

  const drawImage = (url, which) => {
    /* Handle 'whiteboard' (no bg img) */
    if (!url || url.trim().length === 0) {
      if (resizeCanvases) {
        resizeCanvases()
      } /* Clear canvas */
      return Promise.resolve(map.w, map.h)
    }

    /* Handle ordinary image */
    return new Promise((resolve, reject) => {
      const ctx = getContext()
      const img = new Image()
      img.onload = () => {
        let w = map.w
        let h = map.h
        if (!w && !h) {
          w = img.width
          h = img.height
        } else if (!w)
          w = h * img.width / img.height
        else if (!h)
          h = w * img.height / img.width
        const promise = resizeCanvases ? resizeCanvases(w, h) : Promise.resolve()
        promise.then(() => {
          ctx.drawImage(img, map.x || 0, map.y || 0, w, h)
          resolve(w, h)
        })
      }
      img.onerror = (err) => {
        console.error(`Unable to draw image.`, img.src)
        if (which) {
          console.error(`Deleting ${which}Url...`)
          game.updateMap(map => delete map[`${which}Url`])
        }
        reject(`Unable to draw ${which}Url`)
      }
      img.src = url
    })
  }

  // This component does not export anything
  return (<div></div>)
}

export default Canvas
