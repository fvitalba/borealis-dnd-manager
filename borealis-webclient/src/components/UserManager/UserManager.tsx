import { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import User from '../../classes/User'
import UserType from '../../enums/UserType'
import { useLoading } from '../../hooks/useLoading'
import { useWebSocket } from '../../hooks/useSocket'
import StateInterface from '../../interfaces/StateInterface'
import { setUsersFromAPI } from '../../reducers/userReducer'
import { addUserToDatabase } from '../../utils/apiHandler'
import { loadUsersFromDatabase } from '../../utils/gameLoadHandler'
import { GAME_REQUEST_REFRESH } from '../../utils/loadingTasks'
import { UserManagerProps } from './types'

const UserManager = ({ metadataState, settingsState, characterState, setUsersFromAPI }: UserManagerProps) => {
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    const loadUsers = useCallback(() => {
        loadUsersFromDatabase(webSocketContext, loadingContext)
            .then((result) => {
                if (result) {
                    setUsersFromAPI(result.users)
                    const hostUser = result.users.filter((user) => user.type === UserType.host)
                    if (hostUser.length === 0) {
                        loadingContext.stopLoadingTask(GAME_REQUEST_REFRESH)
                    }
                }
            })
    }, [ webSocketContext.wsSettings ])

    useEffect(() => {
        const interval = setInterval(() => {
            if ((metadataState.userGuid !== '') && (metadataState.roomGuid !== '')) {
                const myUser = new User(metadataState.userGuid, settingsState.username, metadataState.userType)
                myUser.assignedCharacterGuid = characterState.currentCharacterGuid
                addUserToDatabase(webSocketContext.wsSettings, myUser)
                    .then(() => {
                        setTimeout(() => loadUsers(), 5000)
                    })
            }
        }, 30000)
        return () => {
            clearInterval(interval)
        }
    },[ loadUsers, webSocketContext.wsSettings, metadataState.userGuid, metadataState.roomGuid ])

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
