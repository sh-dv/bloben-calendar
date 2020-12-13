import React, {  useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import './header.scss';
import EvaIcons from '../../bloben-common/components/eva-icons';
import Dropdown from '../../bloben-package/components/dropdown/dropdown';
import { isCalendarApp } from '../../bloben-package/utils/common';
import { useSelector } from 'react-redux';
import Logo from '../../bloben-common/components/logo/logo';
import Landing from '../../bloben-common/components/Landing';
import HeaderCalendarButtons
  from '../HeaderCalendarButtons/header-calendar-buttons';
import HeaderCalendarTitle from '../HeaderCalendarTitle/HeaderCalendarTitle';

const ListHeaderIcons = (props: any) => {
  const { handleOpenSearch } = props;
  const isMobile: boolean = useSelector((state: any) => state.isMobile);
  const isDark: boolean = useSelector((state: any) => state.isDark);

  const [dropdown, setDropdown]: any = useState(false);

  const openDropdown = (e: any) => {
    setDropdown(true);
  };
  const closeDropdown = () => {
    setDropdown(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {isMobile ? (
        <IconButton onClick={handleOpenSearch}>
          <EvaIcons.Search className={`icon-svg ${isDark ? 'dark-svg' : ''}`} />
        </IconButton>
      ) : null}
      {isMobile ? null : (
        <IconButton onClick={openDropdown} style={{ position: 'relative' }}>
          <EvaIcons.Grid className={`icon-svg ${isDark ? 'dark-svg' : ''}`} />
          <Dropdown
            isOpen={dropdown}
            handleClose={closeDropdown}
            variant={'desktop'}
          />
        </IconButton>
      )}
    </div>
  );
};

const HeaderMobile = (props: any) => {
  const {
    animation,
    children,
    searchIsOpen,
    handleCloseSearch,
    handleOpenSearch,
    icons,
  } = props;
  const isDark: boolean = useSelector((state: any) => state.isDark);

  return (
    <div className={'header__row'}>
      {(props.routeBack && !searchIsOpen) || (props.close && !searchIsOpen) ? (
        props.routeBack ? (
          <Link to={`${props.routeBack}`}>
            <IconButton>
              <ArrowBackIcon style={{ color: props.colors.gray }} />
            </IconButton>
          </Link>
        ) : (
          <IconButton onClick={searchIsOpen ? handleCloseSearch : props.close}>
            <EvaIcons.ArrowBack className={'icon-svg'} />
          </IconButton>
        )
      ) : searchIsOpen ? (
        <IconButton onClick={searchIsOpen ? handleCloseSearch : props.close}>
          <EvaIcons.ArrowBack className={'icon-svg'} />
        </IconButton>
      ) : null}
      {searchIsOpen && children ? (
        children
      ) : (
        <div
          style={{
            display: 'flex',
            width: '100%',
            marginLeft: isCalendarApp() ? 12 : '',
          }}
        >
          <HeaderCalendarTitle title={props.title}/>
          <div className={'header__container--icons'}>
            {!icons ? (
              <ListHeaderIcons
                handleOpenSearch={handleOpenSearch}
              />
            ) : (
              icons
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const HeaderDesktop = (props: any) => {
  const { handleAddNew, addNewText, children } = props;

  return (
    <div className={'header__row'}>
      <Logo imageClassName={'logo__primary'} textClassName={'logo__text-primary'}/>
      <div className={'header__container--icons'}>
      <HeaderCalendarButtons/>
      </div>
      <div className={'header__container--icons'}>
        <ListHeaderIcons />
      </div>
    </div>
  );
};

const HeaderView = (props: any) => {
  const {
    hasHeaderShadow,
    icons,
    onClick,
    animation,
    handleAddNew,
    addNewText,
    children,
  } = props;
  const title = props.title;
  const isMobile: boolean = useSelector((state: any) => state.isMobile);
  const isDark: boolean = useSelector((state: any) => state.isDark);
  const searchIsOpen: boolean = useSelector((state: any) => state.searchIsOpen);

  const handleCloseSearch = () => {
    children.props.handleClearSearch();
    // setContext('searchIsOpen', false);
  };
  const handleOpenSearch = () => {
    // setContext('searchIsOpen', true);
  };

  return (
    // @ts-ignore
    <div
      className={`header__wrapper${isDark ? '-dark' : ''} ${
        (hasHeaderShadow && isDark) || (searchIsOpen && isDark)
          ? 'with-dark-shadow'
          : ''
      }${
        (hasHeaderShadow && isMobile && !isDark) || searchIsOpen
          ? 'with-shadow'
          : ''
      }`}
    >
      <div className={'header__row'}>
        {isMobile ? (
          <HeaderMobile
            title={title}
            routeBack={props.routeBack}
            icons={icons}
            onClick={onClick}
            hasHeaderShadow={hasHeaderShadow}
            animation={animation}
            children={children}
            handleCloseSearch={handleCloseSearch}
            handleOpenSearch={handleOpenSearch}
            searchIsOpen={searchIsOpen}
          />
        ) : (
          <HeaderDesktop icons={icons}  children={children} />
        )}
      </div>
    </div>
  );
};

const Header = (props: any) => {
  const { title, hasHeaderShadow, onClick, icons, children } = props;
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    if (hasHeaderShadow || isCalendarApp()) {
      setAnimation('header__text-visible');
    } else {
      setAnimation('header__text-hidden');
    }
  }, [hasHeaderShadow]);

  return (
    <HeaderView
      title={title}
      hasHeaderShadow={hasHeaderShadow}
      onClick={onClick}
      animation={animation}
      icons={icons}
      children={children}
    />
  );
};

export default Header;
