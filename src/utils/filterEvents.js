import {
  differenceInCalendarDays,
  areIntervalsOverlapping,
  getYear,
  getMonth,
  getDate,
  isFuture,
  format,
  isSameMonth,
  parseISO,
  isSameDay,
  addDays,
  isToday,
  isBefore,
} from 'date-fns';

const getMultiDaysForAgenda = async (events) => {
  const eventsWithMultiDays = [];
  // Handle multi day events
  for (const item of events) {
    const { startDate, endDate } = item;
    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);
    const isSingleDayEvent = isSameDay(parsedStartDate, parsedEndDate);

    if (!isSingleDayEvent) {
      // Get days count between
      const daysBetween = differenceInCalendarDays(
        parsedEndDate,
        parsedStartDate
      );
      // Create event clones for each day
      for (let i = 0; i <= daysBetween; i++) {
        const newItem = { ...item };
        const eventStart = addDays(parsedStartDate, i);
        newItem.startDate = eventStart.toISOString();
        eventsWithMultiDays.push(newItem);
      }
    } else {
      eventsWithMultiDays.push(item);
    }
  }

  return eventsWithMultiDays;
};

const filterAgendaEvents = (events) => {
  // let data = events.filter((item) => {
  //   return isFuture(parseISO(item.startDate));
  // });

  if (events.length === 0) {
    return [];
  }

  const eventsWithRepeats = [];
  // First calculate all repeat events
  for (const item of events) {
    if (!item.repeat) {
      eventsWithRepeats.push(item);
    } else {
      eventsWithRepeats.push(item);

      // Calculate every instance
      let count = 0;
      let nextDateStart = parseISO(item.startDate);
      let nextDateEnd = '';
      let oldItem = { ...item };

      while (isBefore(nextDateStart, parseISO(item.repeat.untilDate))) {
        count = count + 7;
        const newItem = { ...oldItem };
        nextDateStart = addDays(parseISO(item.startDate), count);
        nextDateEnd = addDays(parseISO(item.endDate), count);
        newItem.startDate = nextDateStart;
        newItem.endDate = nextDateEnd;
        eventsWithRepeats.push(newItem);
        oldItem = newItem;
      }
    }
  }

  const eventsWithMultiDays = [];
  // Handle multi day events
  for (const item of eventsWithRepeats) {
    const { startDate, endDate } = item;
    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);
    const isSingleDayEvent = isSameDay(parsedStartDate, parsedEndDate);

    if (!isSingleDayEvent) {
      // Get days count between
      const daysBetween = differenceInCalendarDays(
        parsedEndDate,
        parsedStartDate
      );
      // Create event clones for each day
      for (let i = 0; i <= daysBetween; i++) {
        const newItem = { ...item };
        const eventStart = addDays(parsedStartDate, i);
        newItem.startDate = eventStart.toISOString();
        eventsWithMultiDays.push(newItem);
      }
    } else {
      eventsWithMultiDays.push(item);
    }
  }

  const data = eventsWithMultiDays.sort((a, b) => {
    const aItem = new Date(a.startDate);
    const bItem = new Date(b.startDate);

    return aItem - bItem;
  });

  // Add new month component...
  const result = [];
  let currentMonth;

  // Store previous event date to check for
  let prevItemDate;
  let scrollToWasSet = false;

  for (const item of data) {
    const { id, startDate, endDate } = item;

    const parsedStartDate = parseISO(startDate);
    const isSingleDayEvent = isSameDay(parsedStartDate, parseISO(endDate));
    if (!currentMonth) {
      currentMonth = parsedStartDate;
      result.push({
        id: format(parsedStartDate, 'Pp'),
        isDateTitle: true,
        date: format(parsedStartDate, 'MMMM'),
      });
    } else {
      if (!isSameMonth(parsedStartDate, currentMonth)) {
        //Replace and flag last item as trigger to header change
        const lastDayOfMonthEvent = { ...result[result.length - 1] };
        lastDayOfMonthEvent.headerTitle = format(currentMonth, 'MMMM');
        result.pop();
        result.push(lastDayOfMonthEvent);

        currentMonth = parsedStartDate;
        item.firstEventInMonth = true;
        item.headerTitle = format(parsedStartDate, 'MMMM');
        result.push({
          id: format(parsedStartDate, 'Pp'),
          isDateTitle: true,
          date: format(parsedStartDate, 'MMMM'),
        });
      }
    }
    // Check if event is first for that day
    const isFirstForDay = prevItemDate
      ? !isSameDay(parseISO(prevItemDate), parsedStartDate)
      : true;
    // Replace value with this event startDate
    prevItemDate = startDate;

    item.isFirstForDay = isFirstForDay;

    if (!scrollToWasSet) {
      if (isToday(parsedStartDate)) {
        item.scrollToSet = true;
        scrollToWasSet = true;
      } else if (isFuture(parsedStartDate)) {
        item.scrollToSet = true;
        scrollToWasSet = true;
      }
    }

    result.push(item);
  }

  return result;
};

const findEvents = (baseDate, eventDate) => {
  return areIntervalsOverlapping(
    {
      start: new Date(
        getYear(parseISO(baseDate)),
        getMonth(parseISO(baseDate)),
        getDate(parseISO(baseDate)),
        0,
        0
      ),
      end: new Date(
        getYear(parseISO(baseDate)),
        getMonth(parseISO(baseDate)),
        getDate(parseISO(baseDate)),
        23,
        59
      ),
    },
    { start: parseISO(eventDate.startDate), end: parseISO(eventDate.endDate) }
  );
};
const findMonthEvents = (days, events) => {
  let data = [];
  for (let i = 0; i < days.length; i++) {
    data.push([]);
  }
  events.map((event) => {
    for (let i = 0; i < days.length; i++) {
      if (findEvents(days[i], event)) {
        data[i].push(event);
      }
    }
  });
  return {
    events: data,
    eventsHeader: [],
    hasHeaderEvents: false,
  };
};
const filterWithHeaderEvents = (days, daysNum, events, calendarView) => {
  //Filter all events before further selection
  let weekEvents = []; //Array of events for each day
  let weekEventsHeader = []; //Array of events for each day
  let hasHeaderEvents = [];
  for (let i = 0; i < days.length; i++) {
    weekEvents.push([]);
    weekEventsHeader.push([]);
  }
  let eventsHeader = [];

  // TODO preselect only relevant events
  const eventsWithRepeats = [];
  // First calculate all repeat events
  for (const item of events) {
    if (!item.repeat) {
      eventsWithRepeats.push(item);
    } else {
      eventsWithRepeats.push(item);

      // Calculate every instance
      let count = 0;
      let nextDateStart = parseISO(item.startDate);
      let nextDateEnd = '';
      let oldItem = { ...item };

      while (isBefore(nextDateStart, parseISO(item.repeat.untilDate))) {
        count = count + 7;
        const newItem = { ...oldItem };
        nextDateStart = addDays(parseISO(item.startDate), count);
        nextDateEnd = addDays(parseISO(item.endDate), count);
        newItem.startDate = nextDateStart;
        newItem.endDate = nextDateEnd;
        eventsWithRepeats.push(newItem);
        oldItem = newItem;
      }
    }
  }

  let filteredEvents = eventsWithRepeats.map((event) => {
    //Loop over all events
    for (let i = 0; i < days.length; i++) {
      //Loop over all days in week to filter only relevant events for that week
      if (findEvents(days[i], event)) {
        //Here we find event for each day. So it is better for performance to prepare theme for further rendering here
        if (
          differenceInCalendarDays(
            parseISO(event.endDate),
            parseISO(event.startDate)
          ) === 0 &&
          !event.allDay
        ) {
          weekEvents[i].push(event);
        } else if (
          differenceInCalendarDays(
            parseISO(event.endDate),
            parseISO(event.startDate)
          ) > 0 ||
          event.allDay
        ) {
          weekEventsHeader[i].push(event);
          if (hasHeaderEvents.length === 0) {
            hasHeaderEvents.push('hasEvent');
          }
        }
      }
    }
  });

  let data = {
    events: weekEvents,
    eventsHeader: weekEventsHeader,
    hasHeaderEvents: hasHeaderEvents.length > 0 ? true : false,
  };
  return data;
};

export const filterEvents = (days, daysNum, events, calendarView) => {
  let filteredEvents;
  if (calendarView === 'agenda') {
    filteredEvents = filterAgendaEvents(events);
  } else if (calendarView === 'month') {
    filteredEvents = findMonthEvents(days, events);
  } else if (calendarView === 'week') {
    filteredEvents = filterWithHeaderEvents(days, 7, events);
  } else if (calendarView === 'day') {
    filteredEvents = filterWithHeaderEvents(days, 1, events);
  } else {
    filteredEvents = filterWithHeaderEvents(days, parseInt(daysNum), events);
  }
  return filteredEvents;
};
