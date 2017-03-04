'use strict';
import React, { Component } from 'react';


export default class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderVals: (props.sliderVals || [33.3333333333, 66.6666666667]),
      lowerBound: (props.lowerBound || 33.3333333333),
      upperBound: (props.upperBound || 66.6666666667)
    };
  }

  boundaryValidator(boundary, boundaryVal) {
    const { lowerBound, upperBound } = this.state;
    const validation = {
      lower: (boundaryVal) => (boundaryVal >= 0) && (boundaryVal < upperBound),
      lowerVal: (boundaryVal) => (boundaryVal >= 0)
        ? Math.min(boundaryVal, upperBound) : boundaryVal < 0
        ? 0 : boundaryVal,
      upper: (boundaryVal) => (boundaryVal > lowerBound) && (boundaryVal <= 100),
      upperVal: (boundaryVal) => (boundaryVal > lowerBound)
        ? Math.min(boundaryVal, 100) : boundaryVal < lowerBound
        ? lowerBound : boundaryVal
    };
    return validation[`${boundary}Val`](boundaryVal);
  }

  handleDrag(boundary, evt) {
    evt.stopPropagation();
    evt.preventDefault();

    const $dragEl = $(evt.target),
          $container = $dragEl.parent('.slider.slider-horizontal'),
          containerOffset = $container.offset().left,
          containerWidth = +(/^[\d.]+/.exec($container.css('width'))[0]),
          newPos = (evt.clientX - containerOffset),
          newBound = (newPos / containerWidth) * 100,
          fittedBound = (newBound < 0 ? 0 : newBound > 100 ? 100 : newBound);
    
    const maxHandleCheck = ($dragEl.is($('[className$="max"]')) || $dragEl.is($('[class$="max"]'))),
          minHandleCheck = ($dragEl.is($('[className$="min"]')) || $dragEl.is($('[class$="min"]')));

    this.setState({ [`${minHandleCheck ? 'lower' : 'upper'}Bound`]: this.boundaryValidator(boundary, newBound) });
  }

  handleDragStart(evt) {
    let $dragEl = $(evt.target);
    console.log('dragged el:', $dragEl.get(0));
    console.log('offset:', $dragEl.offset());

    $dragEl.css({ left: $(evt).clientX });
  }

  handleDragEnd(evt) {
    let $dragEl = $(evt.target);
    let containerOffset = $dragEl.parent('.slider.slider-horizontal').offset().left;
    let newPos = evt.clientX - containerOffset;

    if ($dragEl.is($('[className$="max"]')) || $dragEl.is($('[class$="max"]'))) {
      this.setState({ upperBound: (newPos / 2) });
    } else if ($dragEl.is($('[className$="min"]')) || $dragEl.is($('[class$="max"]'))) {
      this.setState({ lowerBound: (newPos / 2) });
    } else {
      null;
    }
  }

  render() {
    return (
      <div className="slider slider-horizontal">
        <div className="slider-runnable-track">
          <div
            className="slider-track-lower"
            style={{
              width: `${this.state.lowerBound}%`,
              left: 0
            }} />
          <div
            className="slider-track-selection"
            style={{
              width: `${this.state.upperBound - this.state.lowerBound}%`,
              left: `${this.state.lowerBound}%`
            }} />
          <div
            className="slider-track-upper"
            style={{
              width: `${100 - this.state.upperBound}%`,
              left: `${this.state.upperBound}%`
            }} />
        </div>

        <div
          className="slider-handle handle-min"
          style={{ left: `${this.state.lowerBound}%` }}
          role="slider"
          // tabIndex={ 0 }
          // aria-valuemin={ 10 }
          // aria-valuemax={ 200 }
          
          // onDrag={ (evt) => ::this.handleDrag(evt) }
          // onDragStart={ this.handleDragStart }
          // onDragEnd={ (evt) => ::this.handleDragEnd(evt) }
          onClick={ () => console.log('HIIIIII') }
          onMouseMove={ (evt) => ::this.handleDrag('lower', evt) } />
        <div
          className="slider-handle handle-max"
          style={{ left: `${this.state.upperBound}%` }}
          role="slider"
          // tabIndex={ 0 }
          // aria-valuemin={ 10 }
          // aria-valuemax={ 200 }

          // onDrag={ (evt) => ::this.handleDrag(evt) }
          // onDragStart={ this.handleDragStart }
          // onDragEnd={ (evt) => ::this.handleDragEnd(evt) }
          onMouseMove={ (evt) => ::this.handleDrag('upper', evt) } />
      </div>
    );
  }
};
