
const calendarBodyWidth = (state: number = 0, action: any) => {
    switch (action.type) {
        case 'SET_CALENDAR_BODY_WIDTH':
            return action.payload;
        default:
            return state;
    }
}

export default calendarBodyWidth;
