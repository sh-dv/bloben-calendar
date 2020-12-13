import React from 'react';
import "./header_modal.scss";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const HeaderModal = (props) => {
  const {options, close, back, colors} = props

  const renderRightContent = () => {
    return options.map(item => {
      return item
    })
  }
    return (
  
  <div className={`header_modal__wrapper`}>
        <div className={"header_modal__container--left"}>
        {close ? <IconButton onClick={close}><ArrowBackIcon style={{color: colors.gray}} /></IconButton>
        : null
        }
        {back ? <IconButton onClick={back}><ArrowBackIcon style={{color: colors.gray}} /></IconButton>
        : null
        }
        </div>
        <div className={"header__container--title"}>
          <h2 className={`header__title${props.darkTheme ? "--dark" : ""}`}>{props.title}</h2>
        </div>
        <div className={"header_modal__container--middle"}>
        </div>
        <div className={"header_modal__container--right"}>
      {options
      ? renderRightContent()     
      : null
      } </div>
      </div>
)
  }

export default HeaderModal;