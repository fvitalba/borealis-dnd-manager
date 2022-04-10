const drawImage = (url, which, xPos, yPos, imageWidth, imageHeight, context) => {
    // Handle 'whiteboard' (no bg img)
    if ((!url) || (url.trim().length === 0)) {
        return Promise.resolve(imageWidth, imageHeight)
    }

    //Handle ordinary image
    return new Promise((resolve, reject) => {
        const img = new Image(imageWidth, imageHeight)
        img.onload = () => {
            context.drawImage(img, xPos, yPos, imageWidth, imageHeight)
            resolve(imageWidth, imageHeight)
        }
        img.onerror = (err) => {
            console.error('Unable to draw image.', img.src, err)
            reject(`Unable to draw ${which}'s Image Url.`)
        }
        img.src = url
    })
}

export const drawImageObject = (imgObject, xPos, yPos, imageWidth, imageHeight, context) => {
    if (!imgObject) {
        return Promise.resolve(imageWidth, imageHeight)
    }

    context.drawImage(imgObject, xPos, yPos, imageWidth, imageHeight)
    Promise.resolve(imageWidth, imageHeight)
}

export default drawImage
