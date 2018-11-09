import * as React from 'react';
import { default as Chart, HTML_ROOT } from 'dechart';

class Dechart extends React.PureComponent<DechartProps> {
  dechartInstance = undefined;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { data } = this.props;
    if (data && data['values']) {
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
      captureDispatch,
      chartOptions,
    } = this.props;

    this.dechartInstance = new Chart({
      chartType: chartType,
      componentId: componentId,
      data: data['cloneData'] ? data['cloneData']() : { ...data },
      options: chartOptions,
    })
      .on('mousemove', (syntheticData) => {
        handleMouseMove && handleMouseMove(syntheticData);
      })
      .on('mouseout', () => {
        handleMouseOut && handleMouseOut();
      });

    captureDispatch && captureDispatch(this.dechartInstance.beta__dispatch);
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

export interface DechartOptions {
  backgroundColor?: string;
  height?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  minYScale?: boolean;
  selectedSeries?: string;
  showBulb?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  width?: number;
  xAxisFontSize?: number | string;
  xAxisTicks?: number;
  yAxisFontSize?: number | string;
  yAxisTicks?: number;
}

interface DechartProps {
  captureDispatch?: (dispatch: Function) => void;
  chartOptions?: DechartOptions;
  chartType: string;
  className?: string;
  componentId: string;
  data: object;
  handleMouseMove?: (e: any) => void;
  handleMouseOut?: () => void;
}

export default Dechart;
