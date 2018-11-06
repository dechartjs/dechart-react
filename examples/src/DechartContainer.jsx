import * as React from 'react';
import PropTypes from 'prop-types';
import { TOOLTIP_ROOT } from 'dechart';

import Dechart from '../../src/Dechart';
import Tooltip from './Tooltip';

class DechartContainer extends React.Component {
  constructor() {
    super();
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      bulxX: 0,
      bulbY: 0,
      data: {},
      showTooltip: false,
    };
  }

  handleMouseMove(syntheticData) {
    this.setState(() => ({
      bulbX: syntheticData.bulbX
          && syntheticData.bulbX.length > 0
          && syntheticData.bulbX[0],
      bulbY: syntheticData.bulbY
          && syntheticData.bulbY.length > 0
          && syntheticData.bulbY[0],
      data: syntheticData.selectedData,
      showTooltip: true,
    }));
  }

  handleMouseOut() {
    this.setState(() => ({
      showTooltip: false,
    }));
  }

  render() {
    const {
      chartOptions,
      chartType,
      componentId,
      data,
    } = this.props;

    return (
      <Dechart
        chartOptions={chartOptions}
        chartType={chartType}
        componentId={componentId}
        data={data}
        handleMouseMove={this.handleMouseMove}
        handleMouseOut={this.handleMouseOut}
      >
        <Tooltip
          bulbX={this.state.bulbX}
          bulbY={this.state.bulbY}
          className={TOOLTIP_ROOT}
          selectedData={this.state.data}
          show={this.state.showTooltip}
        />
      </Dechart>
    );
  }
}

DechartContainer.defaultProps = {
  chartOptions: {},
};

DechartContainer.propTypes = {
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
  className: PropTypes.string,
  componentId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default DechartContainer;
