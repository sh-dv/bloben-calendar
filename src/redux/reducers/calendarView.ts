
const calendarView = (state: any = 'week', action: any) => {
    switch (action.type) {
        case 'SET_CALENDAR_VIEW':
            return action.payload;
        default:
            return state;
    }
}

export default calendarView;
