//TODO: Handle loading from Database, even for players
/*
const onSubmitSetup = () => {
    if (gameSetupState.userType !== undefined)
        return
    setGameSettings(gameSetupState.userType, guid(), gameSetupState.roomName)
    setUsername(gameSetupState.userName)
    saveSettingsToLocalStorage()
    if (gameSetupState.userType === UserType.host) {
        setIsLoading(true)
        const tempWsSettings = {
            guid: '',
            username: gameSetupState.userName,
            room: gameSetupState.roomName,
        }
        getRoomFromDatabase(tempWsSettings)
            .then((result) => {
                if (result.data) {
                    const loadedGame = {
                        ...result.data.game,
                        gen: result.data.game.gen + 1,
                    }
                    overwriteGame(loadedGame)
                }
                getCharactersFromDatabase(tempWsSettings)
                    .then((result) => {
                        setCharacters(result)
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        setIsLoading(false)
                        console.error(error)
                    })
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)
            })
    }
}
*/
