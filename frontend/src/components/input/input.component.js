import React from 'react';

const Input = (props) => {
  return (
    <input
      className={props.className}
      type={props.type}
      name={props.email}
      placeholder={props.placeholder}
      value={props.value}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onChange={props.onChange}
    />
  );
};

export default Input;
