import React from 'react';
import './my_menu.scss';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Menu from '@material-ui/core/Menu';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import ModalSmall from '../../bloben-package/components/modal-small/modal-small';
import EvaIcons from '../../bloben-common/components/eva-icons';
import { calendarColors } from '../calendar-view/calendar-common';
import { useSelector } from 'react-redux';

const MenuContentCheck = (props: any) => {
  const { darkTheme, selected, select, data, handleClose } = props;

  return data.map((item: any) => {
    const isChecked: boolean = selected.includes(item);

    const handleClick = () => {
      select(item);
      handleClose();
    };

    return (
      <div
        key={item.toString()}
        className={`my_menu__hovering${darkTheme ? '--dark' : ''}`}
      >
        <div className={'my_menu__row'} onClick={() => handleClick()}>
          <div
            className={`my_menu__container--icon${
              isChecked ? '--selected' : ''
            }${darkTheme ? '--dark' : ''}`}
          >
            <Checkbox
              checked={isChecked}
              onChange={() => handleClick()}
              value='checked'
            />
          </div>
          <div className={'my_menu__container--label'}>
            <p className={`my_menu__label${darkTheme ? '--dark' : ''}`}>
              {item}
            </p>
          </div>
        </div>
      </div>
    );
  });
};

const MenuContentRadio = (props: any) => {
  const { darkTheme, selected, select, data, handleClose } = props;

  return data.map((item: any) => {
    const handleClick = () => {
      select(item);
      handleClose();
    };
    const isSelected: boolean = selected && item.value === selected.value ? true : false;

    return (
      <div
        key={item.label}
        className={`my_menu__hovering${darkTheme ? '--dark' : ''}`}
      >
        <div className={'my_menu__row'} onClick={() => handleClick()}>
          <div
            className={`my_menu__container--icon${
              isSelected ? '--selected' : ''
            }${darkTheme ? '--dark' : ''}`}
          >
            {isSelected ? (
              <RadioButtonCheckedIcon className={'my_menu__icon'} />
            ) : (
              <RadioButtonUncheckedIcon className={'my_menu__icon'} />
            )}
          </div>
          <div className={'my_menu__container--label'}>
            <p className={`my_menu__label${darkTheme ? '--dark' : ''}`}>
              {item.label}
            </p>
          </div>
        </div>
      </div>
    );
  });
};

const MenuContentSimple = (props: any) => {
  const { darkTheme, data, handleClose } = props;

  return data.map((item: any) => {
    const handleClick = () => {
      item.func();
      handleClose();
    };

    return item.path ? (
      <Link className={'my_menu__row'} to={item.path}>
        <div className={'my_menu__container--label'}>
          <p className={`my_menu__label${darkTheme ? '--dark' : ''}`}>
            {item.label}
          </p>
        </div>
      </Link>
    ) : (
      <div className={'my_menu__row'} onClick={handleClick}>
        <div className={'my_menu__container--label'}>
          <p className={`my_menu__label${darkTheme ? '--dark' : ''}`}>
            {item.label}
          </p>
        </div>
      </div>
    );
  });
};
const MenuContentCalendar = (props: any) => {
  const { isDark, select, data, handleClose } = props;

  const preventDefault = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return data.map((item: any) => {
    const handleClick = () => {
      select(item);
      handleClose();
    };

    const calendarColor = calendarColors[item.color];

    return (
      <div
        key={item.toString()}
        onClick={preventDefault}
        className={`my_menu__hovering${isDark ? '--dark' : ''}`}
      >
        <div className={'my_menu__row'} onClick={() => handleClick()}>
          <div
            className={`my_menu__container--icon${isDark ? '--dark' : ''}`}
          >
            <EvaIcons.CircleFill
              className={'svg-icon calendar-content-svg'}
              fill={isDark ? calendarColor.dark : calendarColor.light}
            />
          </div>
          <div className={'my_menu__container--label'}>
            <p className={`my_menu__label${isDark ? '--dark' : ''}`}>
              {item.name}
            </p>
          </div>
        </div>
      </div>
    );
  });
};
const MyMenu = (props: any) => {
  const isMobile: boolean = useSelector((state: any) => state.isMobile);
  const isDark: boolean = useSelector((state: any) => state.isDark);

  const {
    data,
    variant,
    select,
    selected,
    handleClose,
    isOpen,
    anchorEl,
  } = props;

  const preventDefault = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return  <div
        className={`my_menu__container${isDark ? '--dark' : ''}`}
        onClick={preventDefault}
      >
        {variant === 'simple' ? (
          <MenuContentSimple
            data={data}
            handleClose={handleClose}
          />
        ) : null}
        {variant === 'radio' ? (
          <MenuContentRadio
            data={data}
            select={select}
            selected={selected}
            handleClose={handleClose}
          />
        ) : null}
        {variant === 'calendar' ? (
          <MenuContentCalendar
            data={data}
            select={select}
            selected={selected}
            handleClose={handleClose}
          />
        ) : null}
        {variant === 'check' ? (
          <MenuContentCheck
            data={data}
            selected={selected}
            select={select}
            handleClose={handleClose}
          />
        ) : null}
      </div>
};

export default MyMenu;
