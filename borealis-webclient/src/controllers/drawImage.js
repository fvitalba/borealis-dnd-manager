const drawImage = (url, which, map, context, resizeCanvases) => {
    // Handle 'whiteboard' (no bg img)
    if (!url || url.trim().length === 0) {
        if (resizeCanvases) {
            resizeCanvases()
        } // Clear canvas
        return Promise.resolve(map.width, map.height)
    }

    //Handle ordinary image
    return new Promise((resolve, reject) => {
        const ctx = context
        const img = new Image()
        img.onload = () => {
            let w = map.width
            let h = map.height
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
            console.error('Unable to draw image.', img.src, err)
            reject(`Unable to draw ${which}Url`)
        }
        img.src = url
    })
}

export default drawImage
