// @flow
import React                                from 'react';
import PropTypes                            from 'prop-types';
import { classes, ClassNamesPropType }      from 'aesthetic';
import update                               from 'immutability-helper';
import Icon                                 from 'material-ui/Icon';
import IconButton                           from 'material-ui/IconButton';
import Tooltip                              from 'material-ui/Tooltip';
import { Motion, spring, TransitionMotion } from 'react-motion';
import MotionComponent                      from '../MotionComponent';
import { aesthetic }                        from '~/style/styler';
import { keyFormatter }                      from '~/util/ComponentHelpers';

type Props = {
  theme?: string,
};

type State = {
  NUM_CHILDREN: number,
  OFFSET: number,
  isOpen: boolean,
};

export default class ButtonControlsPure extends MotionComponent<Props, State> {
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
    const { isOpen } = this.state;

    window.addEventListener('click', (evt) => {
      !$(evt.target).parents('[class^="buttonControlsContainer"]').length && !!isOpen
        ? this.toggleMenu(evt)
        : null;
    });
  }

  componentWillUnmount = () => window.removeEventListener('click', this.closeMenu);

  toggleMenu(evt) {
    evt.stopPropagation();
    return this.setState(update(this.state, { $toggle: ['isOpen'] }));
  }

  closeMenu() {
    return this.setState(update(this.state, {
      isOpen: { $set: false },
    }));
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
      style: !!isOpen
        ? this.finalChildBtnStylesInit(index)
        : this.initialChildBtnStylesInit(),
    }));
  }

  getTransStyles() {
    const { isOpen } = this.state;

    return this.childBtns().map((childBtn, index) => ({
      ...childBtn,
      style: !!isOpen
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
                key={keyFormatter(key, 'ChildBtn__')}
                className={classNames.childButtonControl}
                onClick={(evt) => this.execChildBtnAction(evt, index)}
                role="button"
                style={style}
                tabIndex={0}
              >
                <Tooltip
                  enterDelay={350}
                  placement="top-start"
                  title={(
                    <span className={classNames.childButtonControlTooltip}>
                      {this.getChildBtnGlyph(index).tooltipText()}
                    </span>
                  )}
                >
                  <IconButton
                    className={classes(
                      'material-icons',
                      classNames.childButtonControlIcon,
                    )}
                  >
                    {this.getChildBtnGlyph(index).glyphName()}
                  </IconButton>
                </Tooltip>
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

    return ({ rotate }) => (
      <button
        className={classNames.mainButtonControls} // "btn-controls"
        name="mainControlBtn"
        onClick={this.toggleMenu}
        style={{
          ...this.mainBtnStyles(),
          transform: `rotate(${rotate}deg)`,
        }}
        type="button"
      >
        <Icon
          className={classes(
            'material-icons',
            classNames.mainButtonIcon,
          )}
        >
          {!!isOpen ? 'apps' : 'edit'}
        </Icon>
      </button>
    );
  }

  render() {
    const { classNames } = this.props;
    const { isOpen } = this.state;

    const mainBtnRotation = {
      rotate: spring(
        !!isOpen ? -135 : 0,
        { damping: 32, stiffness: 175 },
      ),
    };

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
