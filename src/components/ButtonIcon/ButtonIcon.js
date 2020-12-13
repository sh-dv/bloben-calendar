import React from 'react';
import './button_icon.scss';

export const ButtonIcon = (props) => {
  const { size, darkTheme, disabled, onClick, children, label } = props;
  return (
    <div
      className={`button_icon__wrapper${size ? size : ''}${
        disabled ? '--disabled' : ''
      }${darkTheme ? '--dark' : ''}`}
      onClick={onClick}
    >
      <div className={`button_icon__container`}>
        {React.cloneElement(children, {
          className: `button_icon__icon${size ? `--${size}` : ''}${
            darkTheme ? '--dark' : ''
          }`,
        })}
      </div>
      {label ? (
        <div className={`button_icon__container--label`}>
          <p className={`button_icon__label`}>{label}</p>
        </div>
      ) : null}
    </div>
  );
};
