import * as React from 'react';
import { DechartType } from 'dechart';
import PropTypes from 'prop-types';

import sampleData from './sampleData';
import DechartContainer from './DechartContainer';

class Main extends React.Component {
  render() {
    return (
      <div>
        Dechart-react example. Check out at https://github.com/dechartjs
        <DechartContainer />
      </div>
    );
  }
}

export default Main;
