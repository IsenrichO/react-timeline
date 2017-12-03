// @flow
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isString, size, throttle } from 'lodash';
import update from 'immutability-helper';
import FontIcon from 'material-ui/FontIcon';
import { getOtherItem } from '../../../util/functional';
import { aesthetic } from '../../../style/styler';

type Props = {
  iconLeftName?: string,
  theme?: string,
  withAccordion?: boolean,
  withContent?: boolean,
};

export default class ContentRevealAccordionPure extends Component<Props> {
  static displayName = 'ContentRevealAccordion';

  static propTypes = {
    children: PropTypes.node,
    classNames: ClassNamesPropType,
    iconLeftName: PropTypes.string,
    label: PropTypes.node,
    theme: PropTypes.string,
    withAccordion: PropTypes.bool,
    withContent: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    classNames: {},
    iconLeftName: 'collections',
    label: '',
    theme: 'base',
    withAccordion: true,
    withContent: true,
  };

  constructor(props) {
    super(props);
    const { theme } = props;

    this.state = {
      isCollapsed: true,
    };

    this.theme = aesthetic.themes[theme];
    this.toggleAccordion = ::this.toggleAccordion;
    this.throttleAccordionToggle = Function.prototype;
  }

  /**
   * Inside the `constructor` function above, the `throttleAccordionToggle` class method is initialized to the Function
   * prototype (as opposed to `null`), because it is delegated to an event prop (namely, `onClick`). While this alone
   * does nothing, it is inside this here lifecycle event where the substantive assignment is made. One must reassign
   * the `throttleAccordionToggle` method only after the component has mounted because it depends on the existence of a
   * DOM node reference (a.k.a., a `ref`).
   * @return {[type]} [description]
   */
  componentDidMount() {
    const THROTTLE_OPTS = [875, { leading: true, trailing: false }];
    const toggleIconHandle = (this.accordionHandle || this);

    this.throttleAccordionToggle = throttle(this.toggleAccordion(toggleIconHandle), ...THROTTLE_OPTS);
  }

  /**
   * A pseudo-private class method whose purpose is simply to toggle between a binary (i.e., `true` or `false` Boolean)
   * state inside this class component's local state. It is currently not being used but is let to remain should it be
   * required going forward.
   * @return {undefined}  Implicit return value
   */
  _toggleInternalDisplayState() {
    return this.setState(update(this.state, {
      $toggle: ['isCollapsed'],
    }));
  }

  /**
   * This class method abstracts out the primary component logic for handling smooth toggling of the accordion's
   * display state. Note that it accepts a single parameter — a DOM node reference — from which is returned a new
   * function that accepts an event parameter. Thus, by invoking it with a valid `ref`, one then acquires a function
   * that may reliably serve as an event handler.
   * @param  {Node}     ref   A valid reference to an existing (i.e., mounted) DOM node
   * @return {Fucntion}       A function whose purpose is to handle the toggle/collapse accordion functionality
   */
  toggleAccordion = (ref) => (evt) => {
    const { classNames } = this.props;

    evt.persist();
    const evtTarget = evt.target;
    const accordionContainer = evt.currentTarget.parentNode.parentNode;
    const toggleIcon = findDOMNode(ref);

    if (!!evtTarget
      && !!evtTarget.parentNode
      && !evtTarget.classList.contains(classNames.accordionContainer)
      && !evtTarget.parentNode.classList.contains(classNames.accordionContainer)
    ) return evt.stopPropagation();

    const openAndClosedHeights = [accordionContainer.scrollHeight, 37];
    const currHeight = Math.round(Number.parseInt(window.getComputedStyle(accordionContainer).height, 10));

    accordionContainer.style.height = `${getOtherItem(openAndClosedHeights, currHeight)}px`;
    toggleIcon.style.transform = `rotateZ(${currHeight === 37 ? 90 : 0}deg)`;
  };

  render() {
    const { children, classNames, iconLeftName, label, withAccordion, withContent } = this.props;
    const {
      black: { primary: themeBlack },
      red: { primary: themeRed },
    } = this.theme.colors;

    // Controller for animation behavior of an content-wrapped accordion:
    return (
      <section className={classNames.eventPanelBodyAccordionSection}>
        <div
          className={classes(
            classNames.accordionContainer,
            classNames.accordionToggleBtn,
          )}
        >
          <div
            className={classes(
              classNames.accordionContainer,
              classNames.tlRowSummary,
            )}
            onClick={!!withContent
              ? this.throttleAccordionToggle
              : Function.prototype
            }
            role="button"
            tabIndex={0}
          >
            <FontIcon
              className={classes(
                'material-icons',
                classNames.bodyFieldIcon,
              )}
              color={themeRed}
            >
              {isString(iconLeftName)
                ? iconLeftName
                : 'collections'
              }
            </FontIcon>

            <em
              {...(size(label) >= 300 ? { title: label } : null)} // Conditionally, include `title` for long labels
              className={classNames.contentSectionLabel}
            >
              {label}
            </em>

            {!!withAccordion && (
              <FontIcon
                ref={(accordionHandle) => { this.accordionHandle = accordionHandle; }}
                className={classes(
                  'material-icons',
                  classNames.toggleGlyph,
                )}
                color={themeBlack}
              >
                keyboard_arrow_right
              </FontIcon>
            )}
          </div>

          {!!withContent && children}
        </div>
      </section>
    );
  }
}
