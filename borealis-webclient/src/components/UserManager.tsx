import { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import User from '../classes/User'
import UserType from '../enums/UserType'
import { useLoading } from '../hooks/useLoading'
import { requestAuthentication, useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { CharacterState } from '../reducers/characterReducer'
import { MetadataState } from '../reducers/metadataReducer'
import { SettingsState } from '../reducers/settingsReducer'
import { setUsersFromAPI } from '../reducers/userReducer'
import { addUserToDatabase, setAllRoomUsersInactive } from '../utils/apiHandler'
import { loadUsersFromDatabase } from '../utils/gameLoadHandler'

interface UserManagerProps {
    metadataState: MetadataState,
    settingsState: SettingsState,
    characterState: CharacterState,
    setUsersFromAPI: (arg0: Array<User>) => void,
}

const UserManager = ({ metadataState, settingsState, characterState, setUsersFromAPI }: UserManagerProps) => {
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    const loadUsers = useCallback(() => {
        loadUsersFromDatabase(webSocketContext, loadingContext)
            .then((result) => {
                if (result)
                    setUsersFromAPI(result.users)
            })
    }, [ webSocketContext.wsSettings ])

    useEffect(() => {
        const interval = setInterval(() => {
            if (webSocketContext.ws && (metadataState.roomGuid !== '')) {
                if (metadataState.userType === UserType.host) {
                    setAllRoomUsersInactive(webSocketContext.wsSettings)
                        .then(() => {
                            if (webSocketContext.ws) {
                                requestAuthentication(webSocketContext.ws, webSocketContext.wsSettings)
                                const myUser = new User(metadataState.userGuid, settingsState.username, metadataState.userType)
                                myUser.assignedCharacterGuid = characterState.currentCharacterGuid
                                addUserToDatabase(webSocketContext.wsSettings, myUser)
                                    .then(() => {
                                        setTimeout(() => loadUsers(), 10000)
                                    })
                            }
                        })
                } else {
                    setTimeout(() => loadUsers(), 10000)
                }
            }
        }, 30000)
        return () => {
            clearInterval(interval)
        }
    },[ loadUsers, webSocketContext.ws, webSocketContext.wsSettings, metadataState.roomGuid ])

    return null
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
        settingsState: state.settings,
        characterState: state.character,
    }
}

const mapDispatchToProps = {
    setUsersFromAPI,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)
