'use strict';
import React, { Component } from 'react';
import { Motion, StaggeredMotion, TransitionMotion, spring, presets } from 'react-motion';
import MotionComponent from './MotionComponent';


export default class ButtonControls extends MotionComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      NUM_CHILDREN: 4,
      OFFSET: 0.05
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

  getDefaultStyles() {
    const { isOpen } = this.state;
    return super.childBtns().map((childBtn, index) => ({
      ...childBtn,
      style: isOpen
        ? super.finalChildBtnStylesInit(index)
        : super.initialChildBtnStylesInit()
    }));
  }

  getTransStyles() {
    const { isOpen } = this.state;
    return super.childBtns().map((childBtn, index) => ({
      ...childBtn,
      style: isOpen
        ? super.finalChildBtnStyles(index)
        : super.initialChildBtnStyles()
    }));
  }

  renderChildBtns() {
    return (
      <TransitionMotion
        defaultStyles={ ::this.getDefaultStyles() }
        styles={ ::this.getTransStyles() }>
        { (interpolatedStyles) => (
          <div>{
            interpolatedStyles.map(({ key, style }, index) => (
              <button
                key={ `ChildBtn_${key}` }
                className="btn-controls-child"
                style={ style }
                onClick={ (evt) => ::this.execChildBtnAction(evt, index) }>
                <i className={ super.getChildBtnGlyph(index).glyphName() } />
                <div className="tooltip">
                  <span>{ super.getChildBtnGlyph(index).tooltipText() }</span>
                </div>
              </button>
            ))
          }</div>
        )}
      </TransitionMotion>
    );
  }

  renderMainBtn() {
    const { isOpen } = this.state;
    return ({ rotate }) => (
      <button
        className="btn-controls"
        type="button"
        name="mainControlBtn"
        style={{ ...super.mainBtnStyles(), transform: `rotate(${rotate}deg)` }}
        onClick={ ::this.toggleMenu }>
        <i className={ `glyphicon glyphicon-${isOpen ? 'th' : 'pencil'}` } />
      </button>
    );    
  }

  render() {
    const { isOpen } = this.state;
    let mainBtnRotation = isOpen
      ? { rotate: spring(-135, { stiffness: 175, damping: 32 }) }
      : { rotate: spring(0, { stiffness: 175, damping: 32 }) };

    return (
      <div className="btn-cont">
        { ::this.renderChildBtns() }
        <Motion style={ mainBtnRotation }>
          { ::this.renderMainBtn() }
        </Motion>
        <div className="btn-shadow" />
      </div>
    );
  }
};
