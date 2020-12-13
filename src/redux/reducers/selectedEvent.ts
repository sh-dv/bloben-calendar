
const selectedEvent = (state: any = '', action: any) => {
    switch (action.type) {
        case 'SELECT_EVENT':
            return action.payload;
        case 'CLEAR_SELECTED_EVENT':
            return null;
        default:
            return state;
    }
}

export default selectedEvent;
