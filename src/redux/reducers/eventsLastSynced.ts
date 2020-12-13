const eventsLastSynced = (state: Date | null = null, action: any) => {
    switch (action.type) {
        case 'SET_EVENTS_LAST_SYNC':
            return action.payload;
        default:
            return state;
    }
}

export default eventsLastSynced;
