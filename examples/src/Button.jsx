import * as React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  handleClick,
}) => {
  return (
    <button
      onClick={() => handleClick()}
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      button outside dechart (svg)
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func,
};

export default Button;
