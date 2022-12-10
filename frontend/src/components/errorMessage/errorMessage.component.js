import React from 'react';

const ErrorMessage = (props) => {
  return (
    <div className="formHelp" style={props.style}>
      {props.message}
    </div>
  );
};

export default ErrorMessage;
