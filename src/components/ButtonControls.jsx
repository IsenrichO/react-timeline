'use strict';
import React, { Component } from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import MotionComponent from './MotionComponent';
import DelayMotion from './DelayMotionComponent';


// True constants:
const MAIN_BTN_DIAM = 70,
      CHILD_BTN_DIAM = 35,
      NUM_CHILDREN = 4,
      [MAIN_BTN_X, MAIN_BTN_Y] = [995, 77],
      SPRING_CONFIG = {
        stiffness: 109,
        damping: 36
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
    window.addEventListener('click', (evt) => {
      !$(evt.target).parents('.btn-cont').length && this.state.isOpen
        ? this.toggleMenu(evt)
        : null;
    });    
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

  execChildBtnAction(evt, index) {
    super.getChildObj(index, evt, this.props.toggleModal, this.props.toggleBatchSelection).func();
    ::this.toggleMenu(evt);
  }

  // toggleAllLocationAccordions(evt) {
  //   console.log('collapseAll function hit');
  //   $('.tl-location').trigger('click');
  // }

  // toggleAllEventCards(evt) {
  //   console.log('toggleAllEventCards function hit');
  //   $('.panel-header .collapse-up').trigger('click');
  // }

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
      let nextFrameTargetStyles = prevFrameStyles.map((prevFrameBtnStyle, index) => {
        if (index === 0) { return targetBtnStylesObj[index]; }

        const prevBtnScale = prevFrameStyles[index - 1].scale;
        const shouldApplyTargetStyle = () => isOpen
          ? (prevBtnScale >= scaleMin + OFFSET)
          : (prevBtnScale <= scaleMax - OFFSET);

        return (shouldApplyTargetStyle() ? targetBtnStylesObj[index] : prevFrameBtnStyle);
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
                    transform: `rotate(${rotate}deg) scale(${scale})`
                  }}
                  onClick={ (evt) => ::this.execChildBtnAction(evt, index) }>
                  <i className={ super.getChildBtnGlyph(index) } />
                </button>
              )}
            </div>
          )
        }
      </StaggeredMotion>
    );
  }

  // {boxes.map((box, index) =>
  //   <Delay key={box} initial={0} value={1} period={index * 80}>{ delayed =>
  //     <Motion defaultStyle={{scale: 0}} style={{ scale: spring(delayed) }}>{ val =>
  //       <div style={{ ...styles.box, transform: `scale(${val.scale})` }}>
  //         {box}
  //       </div>
  //     }</Motion>
  //   }</Delay>)
  // }

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
        <i className={ `glyphicon glyphicon-${isOpen ? 'th' : 'pencil'}` } />
        { super.BASE_ANGLE2 }
      </button>
    );    
  }

  render() {
    let { isOpen } = this.state;
    let mainBtnRotation = isOpen
      ? { rotate: spring(-135, SPRING_CONFIG) }
      : { rotate: spring(0, SPRING_CONFIG) };

    return (
      <div className="btn-cont">
        { this.renderChildBtns() }
        <Motion style={ mainBtnRotation }>
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
