import * as React from 'react';
import { DechartType } from 'dechart';
import PropTypes from 'prop-types';

import sampleData from './sampleData';
import DechartContainer from './DechartContainer';

class LineChart extends React.Component {
  render() {
    return (
      <DechartContainer
        chartType={DechartType.LINE}
        componentId="sample1"
        data={sampleData}
        chartOptions={{
          width: 600,
        }}
      />
    );
  }
}

export default LineChart;
