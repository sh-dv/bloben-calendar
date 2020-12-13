const calendarDaysCurrentIndex = (state: number = 1, action: any) => {
    switch (action.type) {
        case 'SET_CALENDAR_DAYS_CURRENT_INDEX':
            return action.payload;
        default:
            return state;
    }
}

export default calendarDaysCurrentIndex;
