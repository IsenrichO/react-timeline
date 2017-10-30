import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import update from 'immutability-helper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Motion, StaggeredMotion, TransitionMotion, spring, presets } from 'react-motion';
import MotionComponent from '../MotionComponent';
import { aesthetic } from '../../../style/styler';

export default class ButtonControlsPure extends MotionComponent {
  static displayName = 'ButtonControls';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const { theme = 'base' } = props;

    this.state = {
      NUM_CHILDREN: 4,
      OFFSET: 0.05,
      isOpen: false,
    };
    this.theme = aesthetic.themes[theme];

    this.execChildBtnAction = ::this.execChildBtnAction;
    this.getDefaultStyles = ::this.getDefaultStyles;
    this.getTransStyles = ::this.getTransStyles;
    this.renderChildBtns = ::this.renderChildBtns;
    this.renderMainBtn = ::this.renderMainBtn;
    this.toggleMenu = ::this.toggleMenu;
  }

  componentDidMount() {
    window.addEventListener('click', (evt) => {
      !$(evt.target).parents('[class^="buttonControlsContainer"]').length && this.state.isOpen
        ? this.toggleMenu(evt)
        : null;
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu);
  }

  toggleMenu(evt) {
    evt.stopPropagation();

    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  closeMenu() {
    this.setState({ isOpen: false });
  }

  execChildBtnAction(evt, index) {
    const { toggleBatchSelection, toggleModal } = this.props;
    this.getChildObj(index, evt, toggleModal, toggleBatchSelection).func();
    this.toggleMenu(evt);
  }

  getDefaultStyles() {
    const { isOpen } = this.state;

    return this.childBtns().map((childBtn, index) => ({
      ...childBtn,
      style: isOpen
        ? this.finalChildBtnStylesInit(index)
        : this.initialChildBtnStylesInit(),
    }));
  }

  getTransStyles() {
    const { isOpen } = this.state;

    return this.childBtns().map((childBtn, index) => ({
      ...childBtn,
      style: isOpen
        ? this.finalChildBtnStyles(index)
        : this.initialChildBtnStyles(),
    }));
  }

  renderChildBtns() {
    const { classNames } = this.props;

    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getTransStyles()}
      >
        {(interpolatedStyles) => (
          <div>
            {interpolatedStyles.map(({ key, style }, index) => (
              <div
                key={`ChildBtn_${key}`}
                className={classNames.childButtonControl}
                onClick={(evt) => this.execChildBtnAction(evt, index)}
                role="button"
                style={style}
                tabIndex={0}
              >
                <IconButton
                  className={classes(
                    'material-icons',
                    classNames.childButtonControlIcon,
                  )}
                  tooltip={(
                    <span className={classNames.childButtonControlTooltip}>
                      {this.getChildBtnGlyph(index).tooltipText()}
                    </span>
                  )}
                  tooltipPosition="top-left"
                >
                  {this.getChildBtnGlyph(index).glyphName()}
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    );
  }

  renderMainBtn() {
    const { classNames } = this.props;
    const { isOpen } = this.state;
    const { colors: themeColors } = this.theme;

    return ({ rotate }) => (
      <button
        className={classNames.mainButtonControls} // "btn-controls"
        type="button"
        name="mainControlBtn"
        style={{
          ...this.mainBtnStyles(),
          transform: `rotate(${rotate}deg)`,
        }}
        onClick={this.toggleMenu}
      >
        <FontIcon
          className={classes(
            'material-icons',
            classNames.mainButtonIcon,
          )}
          color={themeColors.white.primary}
        >
          {isOpen ? 'apps' : 'edit'}
        </FontIcon>
      </button>
    );
  }

  render() {
    const { classNames } = this.props;
    const { isOpen } = this.state;
    const mainBtnRotation = isOpen
      ? { rotate: spring(-135, { damping: 32, stiffness: 175 }) }
      : { rotate: spring(0, { damping: 32, stiffness: 175 }) };

    return (
      <div className={classNames.buttonControlsContainer}>
        {this.renderChildBtns()}
        <Motion style={mainBtnRotation}>
          {this.renderMainBtn()}
        </Motion>
        <div className={classNames.mainButtonShadow} />
      </div>
    );
  }
}
