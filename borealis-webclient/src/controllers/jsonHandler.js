export const toJson = (game, metadata, additionalAttrs) => {
    const data = {
        game: game,
        metadata: metadata,
        ...additionalAttrs,
    }
    return JSON.stringify(data)
}

export const fromJson = (json, game, metadata, overwriteGame) => {
    const data = JSON.parse(json)
    if (data) {
        const updatedTokens = data.game.tokens.map((token) => {
            return {
                ...token,
                $selected: false,
                $x0: 0,
                $y0: 0,
            }
        })
        const updatedData = {
            ...data,
            game: {
                ...data.game,
                tokens: updatedTokens,
                mapId: undefined,
            }
        }
        return new Promise((resolve) => {
            if ((updatedData.game.gen > game.gen) && (metadata.room === updatedData.metadata.room))
                overwriteGame(updatedData.game)
            resolve()
        })
    }
}
