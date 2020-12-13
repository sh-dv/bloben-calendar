import React from 'react';
import './calendar-drawer.scss';
import { ButtonBase, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import EvaIcons from 'bloben-common/components/eva-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { setCalendarView, setSelectedDate } from '../../redux/actions';
import { HEADER_HEIGHT_BASE, parseEventColor } from '../calendar-view/calendar-common';
import CalendarDrawerIcon from '../../assets/icons/CalendarDrawerIcon';
import DatePicker from '../../bloben-package/components/date-picker/date-picker';
import { useCurrentHeight } from '../../bloben-common/utils/layout';
import { parseCssDark } from '../../bloben-common/utils/common';

const DrawerItem = (props: any) => {
  const { icon, text, onClick, isSelected, isDark } = props;

  return (
    <ButtonBase
      className={parseCssDark(`calendar-drawer__button${isSelected ? '-selected' : ''}`, isDark)}
      onClick={onClick}
    >
      {icon ? icon : ''}
      <p className={parseCssDark('calendar-drawer__button-text', isDark)}>{text}</p>
    </ButtonBase>
  );
};

const ViewSwitcher = (props: any) => {
  const { changeCalendarView } = props;
  const calendarView: any = useSelector((state: any) => state.calendarView);
  const isDark: boolean = useSelector((state: any) => state.isDark);

  const iconClassName: string = parseCssDark('svg-icon drawer-icon', isDark);

  return (
    <div>
      <DrawerItem
        icon={<CalendarDrawerIcon text={'A'} textX={'7.8452177'}  className={iconClassName} />}
        onClick={() => changeCalendarView('agenda')}
        isSelected={calendarView === 'agenda'}
        text={'Agenda'}
        isDark={isDark}
      />
      <DrawerItem
        icon={<CalendarDrawerIcon text={'1'} textX={'10.0452177'} className={iconClassName} />}
        onClick={() => changeCalendarView('day')}
        isSelected={calendarView === 'day'}
        text={'Day'}
        isDark={isDark}
      />
      <DrawerItem
        icon={<CalendarDrawerIcon text={'3'} textX={'8.0452177'} className={iconClassName} />}
        onClick={() => changeCalendarView('3days')}
        isSelected={calendarView === '3days'}
        text={'3 days'}
        isDark={isDark}

      />
      <DrawerItem
        icon={<CalendarDrawerIcon text={'7'} textX={'8.6452177'} className={iconClassName} />}
        onClick={() => changeCalendarView('week')}
        isSelected={calendarView === 'week'}
        text={'Week'}
        isDark={isDark}

      />
      <DrawerItem
        icon={<CalendarDrawerIcon text={'31'} textX={'5.6452177'} className={iconClassName} />}
        onClick={() => changeCalendarView('month')}
        isSelected={calendarView === 'month'}
        text={'Month'}
        isDark={isDark}

      />
    </div>
  );
};

const CalendarItem = (props: any) => {
  const { calendar,  isDark, navToCalendarEdit } = props;

  const { id, isVisible, color, name } = calendar;
  const calendarColor: string = parseEventColor(color, isDark);

  const handleClick = (): void =>
      navToCalendarEdit(id)

  return (
    <ButtonBase className={'calendar-drawer__button'} onClick={handleClick}>
        <EvaIcons.CircleFill
          className={'svg-icon drawer-icon'}
          fill={calendarColor}
        />
      <p className={parseCssDark('calendar-drawer__button-text', isDark)}>{name}</p>
    </ButtonBase>
  );
};

const renderCalendar = (data: any, isDark: boolean, navToCalendarEdit: any) =>
  data.map((item: any) =>
    <CalendarItem key={item.id} calendar={item} isDark={isDark} navToCalendarEdit={navToCalendarEdit}/>);

const Calendars = (props: any) => {
    const {handleClose} = props;
    const calendars: any = useSelector((state: any) => state.calendars);
    const isDark: boolean = useSelector((state: any) => state.isDark);
    const history: any = useHistory();
    const navToCalendarEdit = (id: string): void => {
        handleClose()
        history.push(`/calendar/edit/${id}`)
    }

    const data: any = renderCalendar(calendars, isDark, navToCalendarEdit);

    return <div>{data}</div>;
};

const DrawerSeparator = () =>
  <div style={{ height: 8 }} />;

const DesktopNewCalendar = () => {
    const history: any = useHistory();
    const navigateToNewCalendar = () =>
        history.push('/calendar/new');

    return <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
        <IconButton size={'small'} onClick={navigateToNewCalendar}><EvaIcons.Plus className={'icon-svg-small'}/></IconButton>
    </div>
}

const DrawerSubtitle = (props: any) => {
    const isDark: boolean = useSelector((state: any) => state.isDark);
    const isMobile: boolean = useSelector((state: any) => state.isMobile);

    return  <div style={{ display: 'flex', flexDirection: 'row', height: 50, alignItems: 'center'}}>
        <h4 className={parseCssDark('drawer-subtitle', isDark)}>{props.subtitle}</h4>
        {!isMobile ? <DesktopNewCalendar/>
            : null}
    </div>;
}

const CalendarDrawer = (props: any) => {
  const { handleClose, initCalendar } = props;
  const dispatch: Dispatch = useDispatch();
  const isMobile: boolean = useSelector((state: any) => state.isMobile);
  const selectedDate: Date = useSelector((state: any) => state.selectedDate);

  const drawerHeight: number = useCurrentHeight() - HEADER_HEIGHT_BASE;

  const changeCalendarView = (view: string) => {
      dispatch(setCalendarView(view));
      if (isMobile) { handleClose() }
  };

  const selectDate = (date: Date): void => {
      initCalendar(date)
      dispatch(setSelectedDate(date));
  }

  const calendarsStyle: any = {
      height: isMobile ? '100%' : drawerHeight / 3 * 2
  }

  const pickerStyle: any = {
      height: drawerHeight / 3
  }

  return (
    <div className={'calendar-drawer__wrapper'}>
        {isMobile ? <ViewSwitcher
        changeCalendarView={changeCalendarView}
      />
      : null}
        {isMobile ? <DrawerSeparator /> : null}
        <div style={calendarsStyle}>
            <DrawerSubtitle subtitle={'Calendars'} />
      <Calendars handleClose={handleClose}/>
            </div>
        {!isMobile ?       <DrawerSeparator />
        : null}
        {!isMobile ? <DatePicker selectDate={selectDate} selectedDate={selectedDate} width={214} sideMargin={14}/> : null}
    </div>
  );
};

export default CalendarDrawer;
