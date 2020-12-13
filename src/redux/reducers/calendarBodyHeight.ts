
const calendarBodyHeight = (state: number = 0, action: any) => {
    switch (action.type) {
        case 'SET_CALENDAR_BODY_HEIGHT':
            return action.payload;
        default:
            return state;
    }
}

export default calendarBodyHeight;
