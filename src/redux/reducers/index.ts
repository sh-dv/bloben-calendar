import { combineReducers } from 'redux';

import rangeFromReducer from './rangeFrom';
import rangeToReducer from './rangeTo';
import calendarDaysReducer from './calendarDays';
import eventsReducer from './events';
import cryptoPasswordReducer from './cryptoPassword';
import calendarViewReducer from './calendarView';
import selectedEventReducer from './selectedEvent';
import calendarsReducer from './calendars';
import isDarkReducer from './isDark';
import isMobile from './isMobile';
import isLogged from './isLogged';
import username from './username';
import isLoading from './isLoading';
import isAppStarting from './isAppStarting';
import passwords from './passwords';
import notifications from './notifications';
import selectedDate from './selectedDate';
import eventsAreFetching from './eventsAreFetching';
import calendarBodyWidth from './calendarBodyWidth';
import calendarBodyHeight from './calendarBodyHeight';
import calendarDaysCurrentIndex from './calendarDaysCurrentIndex';
import eventsLastSynced from './eventsLastSynced';
import allEvents from './allEvents';
import isFirstLogin from './isFirstLogin';
export const allReducers: any = combineReducers({
                                                    rangeFrom: rangeFromReducer,
                                                    rangeTo: rangeToReducer,
                                                    calendarDays: calendarDaysReducer,
                                                    cryptoPassword: cryptoPasswordReducer,
                                                    events: eventsReducer,
                                                    calendarView: calendarViewReducer,
                                                    selectedEvent: selectedEventReducer,
                                                    calendars: calendarsReducer,
                                                    isDark: isDarkReducer,
                                                    isMobile,
                                                    isLogged,
                                                    username,
                                                    isLoading,
                                                    isAppStarting,
                                                    passwords,
                                                    notifications,
                                                    selectedDate,
                                                    eventsAreFetching,
                                                    calendarBodyWidth,
                                                    calendarBodyHeight,
                                                    calendarDaysCurrentIndex,
                                                    eventsLastSynced,
                                                    allEvents,
                                                    isFirstLogin
});
const rootReducer = (state: any, action: any) => {
    if (action.type === 'USER_LOGOUT') {
        // tslint:disable-next-line:no-parameter-reassignment
        state = undefined
    }

    return allReducers(state, action)
}
export default rootReducer;
