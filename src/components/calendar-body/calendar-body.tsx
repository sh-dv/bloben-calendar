import React from 'react';
import './calendar-body.scss';
import OneDay from '../one-day/one-day';
import {
  CALENDAR_OFFSET_LEFT,
  formatTimestampToDate,
  HEADER_HEIGHT_BASE, hoursArrayString,
} from '../calendar-view/calendar-common';
import {
  useCurrentWidth,
} from 'bloben-common/utils/layout';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { parseCssDark } from '../../bloben-common/utils/common';


const renderOneDay = (
  calendarDays: Date[],
  props: any,
  showNewEvent: any,
  selectEvent: any,
  events: any
) => {
  return calendarDays.map((day: Date, index: number) => {
    const formattedDayString: string = formatTimestampToDate(day);

    return (
      <OneDay
        key={day}
        darkTheme={props.darkTheme}
        calendars={props.calendars}
        day={day}
        index={index}
        data={events ? events[formattedDayString] : []}
        selectedDay={props.selectedDay}
        showNewEvent={showNewEvent}
        editItem={props.editItem}
        selectEvent={selectEvent}
        selectEditEvent={props.selectEditEvent}
        colors={props.colors}
        width={props.width}
        borders={props.borders}
        daysNum={props.daysNum}
      />
    );
  });
};
const HoursText = (props: any) => {
  const {  width,  } = props;
  const isDark: boolean = useSelector((state: any) => state.isDark);

  const renderHours = () => {
    return hoursArrayString.map((hour: any) => {
      return (
            hour === '00' || hour === '24' ? null : (
                <div key={hour} className={'one_day__hours_container'} >
                  <p className={parseCssDark('one_day__hours_text', isDark)}>
                    {hour}
                  </p>
                  <div
                      className={parseCssDark('one_day__hours-line', isDark)}
                      style={{ width: width - 15 }}
                  />
                </div>
            )
      )
    })
  };

  const hours: any = renderHours();

  return hours;
};
const CalendarBodyView = (props: any) => {
  const {  hasHeaderEvents, openNewEvent, index } = props;
  const calendarDays: Date[][] = useSelector((state: any) => state.calendarDays);
  const events: any = useSelector((state: any) => state.events);
  const calendarBodyWidth: number = useSelector((state: any) => state.calendarBodyWidth);
  const calendarBodyHeight: number = useSelector((state: any) => state.calendarBodyHeight);
  const isMobile: boolean = useSelector((state: any) => state.isMobile);
  const calendarDaysCurrentIndex: number   = useSelector((state: any) => state.calendarDaysCurrentIndex);

  const width: number = useCurrentWidth();
  const days: any = renderOneDay(calendarDays[index], props, openNewEvent, [], events);

  const HEADER_EVENTS_HEIGHT: number = hasHeaderEvents ? 28 : 0;

  const style: any = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    width: calendarBodyWidth,
    height: calendarBodyHeight - HEADER_EVENTS_HEIGHT,
  };

  /**
   * Adjust scroll position for all screens
   * @param currentIndex
   */
  const setCurrentOffset = (currentIndex: number): void => {
    // Skip screens outside view
    if (currentIndex !== calendarDaysCurrentIndex) {
      return;
    }

    const currentElement: any = document.getElementById(`timetable_${currentIndex}`)

    let currentOffset: number;

    // Have to set middle clone for last screen manually to get correct current offset
    if (currentIndex === 2) {
      const currentElements: any = document.querySelectorAll(`#timetable_${currentIndex}`)
      currentOffset = currentElements[1].scrollTop;
    } else {
      currentOffset = currentElement.scrollTop;
    }

    // Need to select with query selector as byId doesn't select clones
    const elements: any = document.querySelectorAll('.calendar-body__wrapper');

    for (const element of elements) {
      element.scrollTop = currentOffset;
    }
  }

  // Debounce scroll function
  // Turn off for desktop layout as there is just one active screen
  const handleScroll = _.debounce(() => {
    if (!isMobile) {
      return;
    }
    setCurrentOffset(index);
  }, 50);

  return (
    <div style={style} className={'calendar-body__wrapper'} id={`timetable_${index}`} onScroll={handleScroll}>
        <div className={'one_day__hours_wrapper'} style={{height: calendarBodyHeight - HEADER_EVENTS_HEIGHT}}>
          <HoursText  width={width} />
        </div>
      {days}
    </div>
  );
};

const CalendarBody = (props: any) => {

  return <CalendarBodyView {...props} />;
};

export default CalendarBody;
