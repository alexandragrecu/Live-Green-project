import React from 'react';

const SuccessMessage = (props) => {
  return (
    <div
      className="successMessage"
      // style={{ paddingTop: '30px', margin: 'auto', width: '80%' }}
    >
      {props.message}
    </div>
  );
};

export default SuccessMessage;
