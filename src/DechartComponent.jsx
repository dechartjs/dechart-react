import PropTypes from 'prop-types';
import React from 'react';

import { default as Chart, HTML_ROOT } from 'dechart';

class DechartComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dechartInstance = undefined;
  }

  componentDidMount() {
    const { data } = this.props;
    if (data && data.values) {
      this.drawNewChart();
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data && data) {
      this.drawNewChart();
    }
  }

  drawNewChart() {
    const {
      chartType,
      componentId,
      data,
      handleMouseMove,
      handleMouseOut,
      chartOptions,
    } = this.props;

    this.dechartInstance = new Chart({
      chartType: chartType,
      componentId: componentId,
      data: data.cloneData ? data.cloneData() : { ...data },
      options: chartOptions,
    })
      .on('mousemove', (syntheticData) => {
        handleMouseMove && handleMouseMove(syntheticData);
      })
      .on('mouseout', () => {
        handleMouseOut && handleMouseOut();
      });
  }

  render() {
    const {
      chartOptions,
      children,
      className,
      componentId,
    } = this.props;

    return (
      <div
        id={componentId}
        className={className}
        style={{
          borderRadius: '2px',
          position: 'relative',
          ...chartOptions.width && { width: chartOptions.width },
        }}
      >
        <div className={HTML_ROOT}>
          {children}
        </div>
      </div>
    );
  }
}

DechartComponent.defaultProps = {
  chartOptions: {},
  children: undefined,
  handleMouseMove: () => {},
  handleMouseOut: () => {},
};

DechartComponent.propTypes = {
  chartOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    height: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    marginTop: PropTypes.number,
    minYScale: PropTypes.bool,
    selectedSeries: PropTypes.string,
    showBulb: PropTypes.bool,
    showGrid: PropTypes.bool,
    showLegend: PropTypes.bool,
    showXAxis: PropTypes.bool,
    showYAxis: PropTypes.bool,
    width: PropTypes.number,
    xAxisFontSize: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    xAxisTicks: PropTypes.number,
    yAxisFontSize: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    yAxisTicks: PropTypes.number,
  }),
  chartType: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  componentId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  handleMouseMove: PropTypes.func,
  handleMouseOut: PropTypes.func,
};

export default DechartComponent;
