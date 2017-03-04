'use strict';
import React, { Component } from 'react';


export default class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialVals: props.initialVals || [33.3333333333, 66.6666666667]
    };
  }

  handleDrag(evt) {
    let $dragEl = $(evt.target);
    console.log('dragged el:', $dragEl.get(0));

    $dragEl.css({ left: $(evt).clientX });
  }

  handleDragEnd(evt) { }

  render() {
    return (
      <div className="slider slider-horizontal">
        <div className="slider-runnable-track">
          <div className="slider-track-lower" />
          <div className="slider-track-selection" />
          <div className="slider-track-upper" />
        </div>

        <div
          className="slider-handle handle-min"
          style={{ left: `${this.state.initialVals[0]}%` }}
          role="slider"
          tabIndex={ 0 }
          aria-valuemin={ 10 }
          aria-valuemax={ 200 }
          onDrag={ ::this.handleDrag } />
        <div
          className="slider-handle handle-max"
          style={{ left: `${this.state.initialVals[1]}%` }}
          role="slider"
          tabIndex={ 0 }
          aria-valuemin={ 10 }
          aria-valuemax={ 200 }
          onDrag={ ::this.handleDrag } />
      </div>
    );
  }
};
