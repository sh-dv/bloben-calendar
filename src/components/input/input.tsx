import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import './input.scss';

const Input = (props: any) => {
  const {
    id,
    name,
    placeholder,
    onChange,
    value,
    autoFocus,
    autoComplete,
    multiline,
    onBlur,
    submitOnEnter,
    borderBottom,
    className,
    onFocus,
  } = props;

  const [isFocused, setFocus] = useState(false);

  const handleKeyPress = (ev: any) => {
    if (submitOnEnter) {
      if (ev.key === 'Enter') {
        submitOnEnter();
        ev.preventDefault();
      }
    }
  };

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <InputBase
      id={id}
      className={`input__inputbase ${className ? className : ''}`}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete={autoComplete ? autoComplete : 'off'}
      autoFocus={autoFocus ? autoFocus : false}
      value={value}
      onFocus={handleFocus}
      multiline={multiline ? multiline : false}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      // @ts-ignore
      // borderBottom={borderBottom ? borderBottom : false}
      // @ts-ignore
    />
  );
};

export default Input;
