import React from 'react';
import './header-calendar-buttons.scss';
import { ButtonBase } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { setCalendarView } from '../../redux/actions';
import { parseCssDark } from '../../bloben-common/utils/common';

const HeaderCalendarButton = (props: any) => {
  const {text} = props;

  const dispatch: any = useDispatch();

  const calendarView: string = useSelector((state: any) => state.calendarView);
  const isDark: boolean = useSelector((state: any) => state.isDark);

  const textFormatted: string = text.replace(' ', '').toLowerCase();
  const isSelected: boolean = textFormatted === calendarView;
  const buttonClassName: string = `header_calendar_button${isSelected ? '-selected' : ''}`;
  const textClassName: string = `header_calendar_button-text${isSelected ? '-selected' : ''}`;

  const navigateFunction = (): void => {
    dispatch(setCalendarView(textFormatted));
  }

  return <ButtonBase className={parseCssDark(buttonClassName, isDark)} onClick={navigateFunction}>
    <p className={parseCssDark(textClassName, isDark)}>{text}</p>
  </ButtonBase>
}

/**
 * Buttons for switching calendar view in desktop layout
 * @constructor
 */
const HeaderCalendarButtons = () =>
  (
    <div
      className={`header_calendar_buttons__container`}
    >
      <HeaderCalendarButton text={'Agenda'} />
      <HeaderCalendarButton text={'Day'} />
      <HeaderCalendarButton text={'3 Days'} />
      <HeaderCalendarButton text={'Week'} />
      <HeaderCalendarButton text={'Month'} />
    </div>
  );

export default HeaderCalendarButtons;
