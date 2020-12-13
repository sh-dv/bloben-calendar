import React, { useEffect } from 'react';
import './one-day.scss';
import dateFns, {
  getYear,
  getMonth,
  getDate,
  isSameDay,
  areIntervalsOverlapping,
  differenceInMinutes,
  differenceInCalendarDays,
  parseISO,
} from 'date-fns';
import {
  CALENDAR_OFFSET_LEFT,
  hoursArray,
  hoursArrayString,
  ONE_HOUR_HEIGHT,
} from '../calendar-view/calendar-common';
import { useCurrentWidth } from 'bloben-common/utils/layout';
import CalendarEvent from '../event/calendar-event/calendar-event';
import Modal from '../../bloben-package/components/modal';
import NewEvent from '../event/new-event/new-event';
import { useSelector } from 'react-redux';
import { parseCssDark } from '../../bloben-common/utils/common';
// import Event from 'components/Calendar/Event/Event';

const checkOverlappingEvents = (firstDate: any, secondDate: any) => {
  return areIntervalsOverlapping(
    {
      start: firstDate.startAt,
      end: firstDate.endAt,
    },
    {
      start: secondDate.startAt,
      end: secondDate.endAt,
    }
  );
};
const renderEvents = (
  props: any,
  dataset: any,
  baseWidth: number,
  isDark: any,
  calendars: any
) => {
  let offsetCount: any = []; //Store every event id of overlapping items
  let offsetCountFinal: any; //Sort events by id number
  let offsetCountHeader: any = []; //Store every event id of overlapping items
  let offsetCountFinalHeader: any; //Sort events by id number
  const tableWidth: number = baseWidth  / props.daysNum;
  if (dataset) {
    return dataset.map((event: any) => {
      let width = 1; //Full width
      let offsetLeft = 0;

      return calendars.map((calendar: any) => {
        if (calendar.id === event.calendarId) {
          if (calendar) {
            if (
              differenceInCalendarDays(
                  event.endAt,
                  event.startAt
              ) < 1 &&
              !event.allDay
            ) {
              dataset.map((item2: any) => {
                if (event.id !== item2.id) {
                  if (
                    checkOverlappingEvents(event, item2) &&
                    differenceInCalendarDays(
                        item2.endAt,
                        item2.startAt
                    ) === 0 &&
                    !event.allDay
                  ) {
                    width = width + 1; //add width for every overlapping item
                    offsetCount.push(item2.id);
                  } else if (
                    checkOverlappingEvents(event, item2) &&
                    differenceInCalendarDays(
                        item2.endAt,
                        item2.startAt
                    ) === 0 &&
                    !event.allDay
                  ) {
                    offsetCount.push(event.id);
                  } //BUG event width is shrinked because of multi day events
                }
              });

              if (offsetCount.length > 0) {
                offsetCountFinal = offsetCount.sort((a: any, b: any) => {
                  return a - b; //sort items for proper calculations of offset by id
                });
              }
              // Basic offset if no overlapping
              if (offsetCountFinal) {
                offsetLeft =
                  (tableWidth / offsetCountFinal.length) *
                  offsetCountFinal.indexOf(event.id); //count offset
              }

              const calendarColor: string = event.color;

              let offsetTop: any =
                differenceInMinutes(
                    event.startAt,
                  new Date(
                    getYear(event.startAt),
                    getMonth(event.startAt),
                    getDate(event.startAt),
                    0,
                    0,
                    0
                  )
                ) / 1.5;
              let eventHeight: any =
                differenceInMinutes(
                    event.endAt,
                    event.startAt
                ) / 1.5;
              let eventWidth: any = tableWidth / width - 1; ///event.width.toString() + "%"
              //event.left
              // BUG/TODO break event if continues next day
              // Current status: events is displayed in wrong place
              offsetCount = [];
              offsetCountFinal = '';

              return (
                <CalendarEvent
                  isDark={isDark}
                  key={event.id}
                  index={props.index}
                  eventHeight={eventHeight}
                  offsetTop={offsetTop}
                  eventWidth={eventWidth}
                  offsetLeft={offsetLeft}
                  calendars={calendars}
                  colorName={calendarColor}
                  event={event}
                  editEvent={props.editEvent}
                  selectItem={props.selectItem}
                  selectEditEvent={props.selectEditEvent}
                  width={props.width}
                  cryptoPassword={props.cryptoPassword}
                  selectEvent={props.selectEvent}
                />
              );
            }
          }
        }
      });
    });
  }
};

const TimeNowLine = (props: any) => {
  const { width, daysNum, nowPosition } = props;
  const lineStyle: any = {
    top: nowPosition,
    width: (width - 40) / daysNum,
  };

  return <div id={'time-now'} className={'one_day__time-now'} style={lineStyle} />;
};

const OneDay = (props: any) => {
  const { daysNum, day, index } = props;
  const isDark: boolean = useSelector((state: any) => state.isDark);

  const width: number = useCurrentWidth();
  const calendars: any = useSelector((state: any) => state.calendars);
  const calendarBodyWidth: number = useSelector((state: any) => state.calendarBodyWidth);

  const handleEventClick = (event: any) => {
    const rect: any = event.target.getBoundingClientRect();
    const y: any = event.clientY - rect.top;
    // Get hour from click event
    const hour: number = y / 40;
    props.showNewEvent({ day, hour, event });
  };

  const oneDay: any = {
    width: calendarBodyWidth / daysNum,
    height: 24 * 40,
    position: 'relative',
    flexDirection: 'column',
  };
  const isToday: any = isSameDay(day, new Date());
  const isFirstDay: any = index === 0;
  const dataForDay: any = props.data;

  const eventNodes: any = renderEvents(props, dataForDay, calendarBodyWidth, isDark, calendars);
  const dateNow: any = new Date();

  const nowPosition: number = differenceInMinutes(
      dateNow,
      new Date(getYear(dateNow), getMonth(dateNow), getDate(dateNow), 0, 0, 0)
  ) / 1.5;

  useEffect(() => {
    if (isToday) {
      const elements: any = document.querySelectorAll('.calendar-body__wrapper');

      for (const element of elements) {
        element.scrollTo({top: nowPosition, behavior: 'smooth'});
      }
    }
  },[])

  return (
    <div
      key={day.toString()}
      style={oneDay}
      className={!isFirstDay ? parseCssDark('one-day__border-left', isDark) : ''}
      onClick={(e: any) => handleEventClick(e)}
    >
      {/*{isFirstDay ? (*/}
      {/*  <div className={'one_day__hours_wrapper'}>*/}
      {/*    <HoursText handleEventClick={handleEventClick} isDark={isDark} width={width} />*/}
      {/*  </div>*/}
      {/*) : null}*/}
      {/*<Table*/}
      {/*  isDark={isDark}*/}
      {/*  daysNum={daysNum}*/}
      {/*  width={width}*/}
      {/*  day={day}*/}
      {/*  handleEventClick={handleEventClick}*/}
      {/*/>*/}
      {dataForDay && dataForDay.length > 0
        ? eventNodes
        : null}

      {isToday ? <TimeNowLine width={width} daysNum={daysNum} nowPosition={nowPosition} /> : null}
    </div>
  );
};

export default OneDay;
