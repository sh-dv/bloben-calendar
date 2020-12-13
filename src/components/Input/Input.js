import React from 'react';
import './input.scss';
import InputBase from '@material-ui/core/InputBase';
import {useSelector} from "react-redux";

export const Input = (props) => {
  const { size } = props;
  const isDark = useSelector((state) => state.isDark);

  return (
    <div className={'input__wrapper'}>
      <InputBase
        className={
          props.className
            ? props.className
            : `input__text${size ? size : ''}${isDark ? '--dark' : ''}`
        }
        name={props.name}
        type={props.textType}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        value={props.value}
        error={props.error}
        rows={props.rows}
        maxLength={props.maxLength}
        multiline={props.multiline}
        autoComplete={props.autoComplete}
        onBlur={props.handleBlur}
        onKeyPress={(ev) => {
          if (props.submitEnter) {
            if (ev.key === 'Enter') {
              // Do code here
              props.submitEnter();
              ev.preventDefault();
            }
          }
        }}
      />
    </div>
  );
};
