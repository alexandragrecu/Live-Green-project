/*

 React Spinners: https://github.com/davidhu2000/react-spinners
 These react Spinners are using emotion library: https://github.com/emotion-js/emotion

 */

import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

// color for Spinner
const color = '#6CC57C';

const Spinner = (props) => {
  return (
    <div className={props.className}>
      <CircleLoader
        color={color}
        loading={props.loading}
        size={100}
        css={props.css}
      />
    </div>
  );
};

export default Spinner;
