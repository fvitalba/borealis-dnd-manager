const initialControlPanelState = () => {
	return {
		hidden: false,
		toggleOnMaps: false,
		toggleOnUser: false,
		toggleOnTokens: false,
		fogDiameter: 33,
	}
}

const controlPanelReducer = (state = initialControlPanelState, action) => {
    switch (action.type) {
        //TODO: Implement control panel
        default:
            return state
    }
}

//#region Action Creators

//#endregion Action Creators

export default controlPanelReducer