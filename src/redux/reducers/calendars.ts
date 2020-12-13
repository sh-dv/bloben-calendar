
const calendars = (state: any = [], action: any) => {
    switch (action.type) {
        case 'SET_CALENDARS':
            return action.payload;
        case 'ADD_CALENDAR':
            return [...state, action.payload];
        case 'UPDATE_CALENDAR':
            return state.map((item: any) => (
                item.id === action.payload.id ? action.payload : item
            ))
        default:
            return state;
    }
}

export default calendars;
