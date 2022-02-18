const drawImage = (url, which, map, context) => {
    // Handle 'whiteboard' (no bg img)
    if ((!url) || (url.trim().length === 0)) {
        context.clearRect(map.x, map.y, map.width, map.height)
        return Promise.resolve(map.width, map.height)
    }

    //Handle ordinary image
    return new Promise((resolve, reject) => {
        const img = new Image(map.width, map.height)
        img.onload = () => {
            context.clearRect(map.x, map.y, map.width, map.height)
            context.drawImage(img, map.x, map.y, map.width, map.height)
            resolve(map.width, map.height)
        }
        img.onerror = (err) => {
            console.error('Unable to draw image.', img.src, err)
            reject(`Unable to draw ${which}'s Image Url.`)
        }
        img.src = url
    })
}

export default drawImage
