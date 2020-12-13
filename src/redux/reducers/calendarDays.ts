const initState: any = [[new Date()], [new Date()], [new Date()]]
const calendarDays = (state: Date[][] = initState, action: any) => {
    switch (action.type) {
        case 'SET_CALENDAR_DAYS':
            return action.payload;
        default:
            return state;
    }
}

export default calendarDays;
