'use strict';
import React, { Component } from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import MotionComponent from './MotionComponent';


// True constants:
const MAIN_BTN_DIAM = 70,
      CHILD_BTN_DIAM = 35,
      NUM_CHILDREN = 4,
      // [MAIN_BTN_X, MAIN_BTN_Y] = [980, 1942],
      // [MAIN_BTN_X, MAIN_BTN_Y] = [1005, 1977],
      // [MAIN_BTN_X, MAIN_BTN_Y] = [980, 42],
      [MAIN_BTN_X, MAIN_BTN_Y] = [995, 77],
      SPRING_CONFIG = {
        stiffness: 400,
        damping: 28
      },
      FLY_OUT_R = 125,
      SEPARATION_ANGLE = 30,
      FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE,
      BASE_ANGLE = 90;

// Should be between 0 and 0.5 (its maximum value is difference between `scale` in
//  `finalChildBtnStyles` and `initialChildBtnStyles`)
const OFFSET = 0.05;

// const ButtonControls = ({ toggleModal }) => (
export default class ButtonControls extends MotionComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    // window.addEventListener('click', (evt) => { });

    // $(document).on('click', '[class^="btn-controls"]', (evt) => {
    //   this.closeMenu();
    // });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu);
  }

  toggleMenu(evt) {
    evt.stopPropagation();
    let { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  closeMenu() {
    this.setState({ isOpen: false });
  }

  renderChildBtns() {
    const { isOpen } = this.state;

    const initBtnStylesObj = super
      .getRange(NUM_CHILDREN)
      .map((child, index) => isOpen ? super.finalChildBtnStylesInit(index) : super.initialChildBtnStylesInit());
    const targetBtnStylesInit = Object
      .keys(initBtnStylesObj)
      .map(key => initBtnStylesObj[key]);

    const targetBtnStylesObj = super
      .getRange(NUM_CHILDREN)
      .map((child, index) => isOpen ? super.finalChildBtnStyles(index) : super.initialChildBtnStyles());

    const scaleMin = super.initialChildBtnStyles().scale.val;
    const scaleMax = super.finalChildBtnStyles(0).scale.val;

    let calculateStylesForNextFrame = (prevFrameStyles) => {
      prevFrameStyles = (isOpen ? prevFrameStyles : prevFrameStyles.reverse());
      let nextFrameTargetStyles = prevFrameStyles.map((prevFrameBtnStyle, i) => {
        if (i === 0) { return targetBtnStylesObj[i]; }

        const prevBtnScale = prevFrameStyles[i - 1].scale;
        const shouldApplyTargetStyle = () => isOpen
          ? (prevBtnScale >= scaleMin + OFFSET)
          : (prevBtnScale <= scaleMax - OFFSET);

        return (shouldApplyTargetStyle() ? targetBtnStylesObj[i] : prevFrameBtnStyle);
      });

      return (isOpen ? nextFrameTargetStyles : nextFrameTargetStyles.reverse());
    };

    return (
      <StaggeredMotion
        defaultStyles={ targetBtnStylesInit }
        styles={ calculateStylesForNextFrame }>
        {
          (interpolatedStyles) => (
            <div>
              {interpolatedStyles.map(({ width, height, left, bottom, rotate, scale }, index) =>
                <button
                  key={ `ChildBtn_${index}` }
                  className="btn-controls-child"
                  style={{
                    width,
                    height,
                    left,
                    bottom,
                    transform: `rotate(${rotate}deg) scale(${scale})`,
                    transition: `all 0.25s ${index * 55}ms`
                  }}>
                  <i className={ super.getChildBtnGlyph(index) } />
                </button>
              )}
            </div>
          )
        }
      </StaggeredMotion>
    );
  }

  renderMainBtn() {
    let { isOpen } = this.state;
    let mainBtnRotation = isOpen
      ? { rotate: spring(-135, { stiffness: 500, damping: 30 }) }
      : { rotate: spring(0, { stiffness: 500, damping: 30 }) }

    return ({ rotate }) => (
      <button
        className="btn-controls"
        type="button"
        name="mainControlBtn"
        style={{ ...super.mainBtnStyles(), transform: `rotate(${rotate}deg)` }}
        onClick={ ::this.toggleMenu }>
        { super.BASE_ANGLE2 }
      </button>
    );    
  }

  render() {
    let { isOpen } = this.state;
    let mainBtnRotation = isOpen
      ? { rotate: spring(-135, { stiffness: 500, damping: 30 }) }
      : { rotate: spring(0, { stiffness: 500, damping: 30 }) };

    return (
      <div className="btn-cont">
        { this.renderChildBtns() }
        <Motion
          style={ mainBtnRotation }>
          { ::this.renderMainBtn() }
        </Motion>
        <div className="btn-shadow" />
      </div>
    );
  }
};

// export default ButtonControls;

// onClick={ this.props.toggleModal }

// <div>
//   <div className="btn-controls-child">
//     <i className="glyphicon glyphicon-pencil" />
//   </div>
//   <div className="btn-controls-child">
//     <i className="glyphicon glyphicon-plus" />
//   </div>
//   <div className="btn-controls-child">
//     <i className="glyphicon glyphicon-minus" />
//   </div>
// </div>

//   <div
//     className="child-button"
//     key={index}
//     style={{
//       left,
//       height,
//       top,
//       transform: `rotate(${rotate}deg) scale(${scale})`,
//       width
//     }}
//   >
//     <i className={"fa fa-" + childButtonIcons[index] + " fa-lg"}></i>
//   </div>
// )}
