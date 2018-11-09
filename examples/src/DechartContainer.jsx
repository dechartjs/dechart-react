import { DechartType } from 'dechart';
import * as React from 'react';
import PropTypes from 'prop-types';
import { TOOLTIP_ROOT } from 'dechart';

import Button from './Button';
import Dechart from '../../src/Dechart';
import sampleData from './sampleData';
import Tooltip from './Tooltip';

const chartOptions = {
  width: 600,
};

class DechartContainer extends React.Component {
  constructor() {
    super();
    this.dechartDispatch = undefined;

    this.captureDispatch = this.captureDispatch.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.state = {
      bulxX: 0,
      bulbY: 0,
      data: {},
      showTooltip: false,
    };
  }

  captureDispatch(dispatch) {
    dispatch && (this.dechartDispatch = dispatch);
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

  handleClickButton(e) {
    this.dechartDispatch && this.dechartDispatch();
  }

  render() {
    return (
      <div>
        <Dechart
          captureDispatch={this.captureDispatch}
          chartOptions={this.props.chartOptions || chartOptions}
          chartType={DechartType.LINE}
          componentId={'sample-dechart'}
          data={sampleData}
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
        <Button handleClick={this.handleClickButton} />  
      </div>
    );
  }
}

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
  className: PropTypes.string,
};

export default DechartContainer;
