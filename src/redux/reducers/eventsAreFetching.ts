const eventsAreFetching = (state: boolean = false, action: any) => {
    switch (action.type) {
        case 'SET_EVENTS_ARE_FETCHING':
            return action.payload;
        default:
            return state;
    }
}

export default eventsAreFetching;
