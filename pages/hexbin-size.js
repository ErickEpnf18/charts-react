import React, {Component} from 'react';

import ShowcaseButton from 'components/showcase-button';

import {XYPlot, XAxis, YAxis, HexbinSeries, ChartLabel} from 'react-vis';

import DATA from '../datasets/car-data.json';

const DIMENSIONS = [
  'economy (mpg)',
  'cylinders',
  'displacement (cc)',
  'power (hp)',
  'weight (lb)',
  '0-60 mph (s)',
  'year'
];

export default class HexbinSizeExample extends Component {
  state = {
    xAxis: 0,
    yAxis: 3
  };

  updateX(increment) {
    this.setState({
      xAxis: (this.state.xAxis + (increment ? 1 : -1)) % DIMENSIONS.length
    });
  }

  updateY(increment) {
    this.setState({
      yAxis: (this.state.yAxis + (increment ? 1 : -1)) % DIMENSIONS.length
    });
  }

  render() {
    const {xAxis, yAxis} = this.state;
    const data = DATA.map(d => ({
      x: Number(d[DIMENSIONS[xAxis]]),
      y: Number(d[DIMENSIONS[yAxis]])
    }));

    return (
      <div className="centered-and-flexed">
        <div className="centered-and-flexed-controls">
          <ShowcaseButton
            onClick={() => this.updateX(false)}
            buttonContent={'PREV X'}
          />
          <div> {`X AXIS ${DIMENSIONS[xAxis]}`} </div>
          <ShowcaseButton
            onClick={() => this.updateX(true)}
            buttonContent={'NEXT X'}
          />
        </div>
        <div className="centered-and-flexed-controls">
          <ShowcaseButton
            onClick={() => this.updateY(false)}
            buttonContent={'PREV Y'}
          />
          <div> {`Y AXIS ${DIMENSIONS[yAxis]}`} </div>
          <ShowcaseButton
            onClick={() => this.updateY(true)}
            buttonContent={'NEXT Y'}
          />
        </div>
        <XYPlot
          width={500}
          onMouseLeave={() => this.setState({hoveredNode: null})}
          height={300}
          margin={50}
        >
          <HexbinSeries
            animation
            sizeHexagonsWithCount
            className="hexbin-size-example"
            radius={15}
            data={data}
          />
          <XAxis />
          <YAxis />
          <ChartLabel 
            text={DIMENSIONS[xAxis]}
            className="alt-x-label"
            xPercent={0.9}
            yPercent={0.65}
            style={{
              transform: 'rotate(90)',
              textAnchor: 'end'
            }}
            />

          <ChartLabel 
            text={DIMENSIONS[yAxis]}
            className="alt-y-label"
            xPercent={0.1}
            yPercent={0.0}
            style={{
              textAnchor: 'start'
            }}
            />
        </XYPlot>
      </div>
    );
  }
}