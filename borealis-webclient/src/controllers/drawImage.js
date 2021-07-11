const drawImage = (url, which, map, context, resizeCanvases, updateMap) => {
	// Handle 'whiteboard' (no bg img)
	if (!url || url.trim().length === 0) {
		if (resizeCanvases) {
			resizeCanvases()
		} // Clear canvas
		return Promise.resolve(map.w, map.h)
	}

	//Handle ordinary image
	return new Promise((resolve, reject) => {
		const ctx = context
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
				updateMap(map => delete map[`${which}Url`])
			}
			reject(`Unable to draw ${which}Url`)
		}
		img.src = url
	})
}

const drawImageNew = (url, which, context, gameState, setGameState, updateMap) => {
	/*
	// Handle 'whiteboard' (no bg img)
	const map = gameState.state.maps ? gameState.state.maps[gameState.state.mapId] : null
	if (!url || url.trim().length === 0) {
		return Promise.resolve(map.w, map.h)
	}

	//Handle ordinary image
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
		promise.then(() => {
			ctx.drawImage(img, map.x || 0, map.y || 0, w, h)
			resolve(w, h)
		})
	}
	img.onerror = (err) => {
		console.error(`Unable to draw image.`, img.src)
		if (which) {
			console.error(`Deleting ${which}Url...`)
			updateMap(map => delete map[`${which}Url`])
		}
		reject(`Unable to draw ${which}Url`)
	}
	img.src = url
	*/
}

export default drawImage
