import * as React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Content = ({
  data,
}) => {
  const date = data.date && moment(data.date).format('YYYY-MM-DD');
  const entryList = Object.keys(data)
    .filter((key) => key !== 'date')
    .map((key, idx) => (
      <p
        key={idx}
        style={{
          marginBottom: '3px',
          whiteSpace: 'pre',
        }}
      >
        {`${key}: ${data[key]}`}
      </p>
    ));

  return (
    <div>
      <div
        style={{
          color: '#888888',
          fontSize: '11px',
          marginBottom: '6px',
        }}
      >
        {date}
      </div>
      {entryList}
    </div>
  );
};

Content.defaultProps = {
  data: {},
};

Content.propTypes = {
  data: PropTypes.object,
};

const Tooltip = ({
  bulbX,
  bulbY,
  className,
  selectedData = {},
  show,
}) => {
  return !!show && (
    <div
      className={className}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #373737',
        borderRadius: '3px',
        boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        fontSize: '12px',
        left: bulbX + 34,
        padding: '10px',
        position: 'absolute',
        top: bulbY,
        zIndex: 100,
      }}
    >
      <Content
        data={selectedData}
        key={bulbX}
      />
    </div>
  );
};

Tooltip.propTypes = {
  bulbX: PropTypes.number,
  bulbY: PropTypes.number,
  className: PropTypes.string,
  selectedData: PropTypes.object,
  show: PropTypes.bool.isRequired,
};

export default Tooltip;
