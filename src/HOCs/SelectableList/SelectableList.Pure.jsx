// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import update from 'immutability-helper';
import { isEmpty, size } from 'lodash';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { aesthetic } from '../../style/styler';
import { tlEventPropTypes } from '../../util/TypeChecking';

type Props = {
  defaultValue: string,
  theme?: string,
};

const withListSelection = (ComposedComponent) =>
  class SelectableList extends Component<Props> {
    static displayName = 'SelectableListEnhancedComponent';

    static propTypes = {
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.instanceOf(ListItem)),
        PropTypes.instanceOf(ListItem),
        PropTypes.node,
      ]).isRequired,
      classNames: ClassNamesPropType,
      defaultValue: PropTypes.string.isRequired,
      eventData: PropTypes.objectOf(tlEventPropTypes),
      selectedEventData: tlEventPropTypes.isRequired,
      theme: PropTypes.string,
    };

    static defaultProps = {
      classNames: {},
      eventData: null,
      theme: 'base',
    };

    constructor(props) {
      super(props);
      const { theme } = props;

      this.state = {
        selectedEvent: null,
      };

      this.handleNewListItemSelection = ::this.handleNewListItemSelection;
      this.theme = aesthetic.themes[theme];
    }

    componentWillMount() {
      const { defaultValue } = this.props;

      return this.setState(update(this.state, {
        selectedEvent: { $set: defaultValue },
      }));
    }

    handleNewListItemSelection(evt, uuid) {
      return this.setState(update(this.state, {
        selectedEvent: { $set: uuid },
      }));
    }

    renderEventsList() {
      const {
        classNames,
        eventData,
      } = this.props;

      return Object
        .values(eventData)
        .map(({ description = '', name = '', uuid }, index) => ([
          <ListItem
            key={`drawerEvent__${uuid}`}
            insetChildren
            containerElement="LI"
            innerDivStyle={{
              padding: '20px 16px 20px 72px',
              position: 'relative',
            }}
            primaryText={
              <h4
                aria-label={name}
                className={classNames.eventsDrawerMenuItem}
                title={name}
              >
                {isEmpty(name) ? `Event Nº ${index}` : name}
              </h4>
            }
            secondaryText={this.renderSummarySnippet(description)}
            secondaryTextLines={2}
            value={uuid}
          />,
          <Divider inset />,
        ]));
    }

    renderSummarySnippet(description = '') {
      const { classNames } = this.props;

      const fusedDescription = description
        .join(' ')
        .trim();
      const isSummaryMissing = isEmpty(fusedDescription);

      return (
        <span
          aria-label={fusedDescription || 'Event summary'}
          className={classes(
            classNames.drawerItemSummarySnippet,
            !!isSummaryMissing && classNames.drawerItemEmptySummarySnippet,
          )}
        >
          {!isSummaryMissing
            ? fusedDescription.slice(0, Math.min(150, size(fusedDescription)))
            : 'No event summary provided'
          }
        </span>
      );
    }

    render() {
      const { children, classNames, eventData, selectedEventData, ...rest } = this.props;
      const { selectedEvent } = this.state;

      return (
        <ComposedComponent
          {...rest}
          className={classNames.selectableListComposedComponent}
          onChange={this.handleNewListItemSelection}
          value={selectedEvent}
        >
          <Subheader>By Chronology</Subheader>
          {this.renderEventsList(eventData)}
        </ComposedComponent>
      );
    }
  };

export default withListSelection(makeSelectable(List));
