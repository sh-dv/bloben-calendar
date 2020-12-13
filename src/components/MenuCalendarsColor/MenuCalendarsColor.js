import React from 'react';
import './menu_calendars_color.scss';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { dark } from '@material-ui/core/styles/createPalette';
import Menu from '@material-ui/core/Menu';
import { calendarColors } from '../calendar-view/calendar-common';
import {useSelector} from "react-redux";

const MenuContentRadio = (props) => {
  const { darkTheme, isDark, selected, select, data } = props;
  return data.map((item) => {
    const isSelected = item.calendar === selected.calendar;
    const calendarColor = {
      color:
        calendarColors[item.color ? item.color : 'indigo'][
          isDark ? 'dark' : 'light'
        ],
    };
    return (
      <div className={`menu_calendars__row`} onClick={() => select(item)}>
        <div
          className={`menu_calendars__container--icon`}
          style={calendarColor}
        >
          {isSelected ? (
            <Brightness1Icon className={`menu_calendars__icon`} />
          ) : (
            <RadioButtonUncheckedIcon className={`menu_calendars__icon`} />
          )}
        </div>
        <div className={`menu_calendars__container--label`}>
          <p className={`menu_calendars__label${darkTheme ? '--dark' : ''}`}>
            {item.calendar}
          </p>
        </div>
      </div>
    );
  });
};

const MenuCalendarsColor = (props) => {
  const { data, select, selected, handleClose, isOpen, anchorEl } = props;
  const isDark= useSelector((state) => state.isDark);

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={isOpen}
      onClose={handleClose}
      className={'my_menu__wrapper'}
    >
      <div className={`my_menu__container${isDark ? '--dark' : ''}`}>
        <MenuContentRadio
          data={data}
          select={select}
          darkTheme={isDark}
          selected={selected}
          className={'my_menu__wrapper'}
        />
      </div>
    </Menu>
  );
};

export default MenuCalendarsColor;
