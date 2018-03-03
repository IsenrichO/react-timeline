// @flow
import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import {
  history as HistoryPropTypes,
  location as LocationPropTypes,
  match as MatchPropTypes,
}                           from 'react-router-prop-types';
import { withRouter }       from 'react-router';
import { Link }             from 'react-router-dom';
import {
  classes,
  ClassNamesPropType,
}                           from 'aesthetic';
import update               from 'immutability-helper';
import {
  eq,
  get,
  isEmpty,
  isEqual,
  size,
}                           from 'lodash';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
}                           from 'material-ui/List';
import EventIcon            from 'material-ui-icons/Event';
import Entry1Icon           from 'material-ui-icons/LooksOne';
import Entry2Icon           from 'material-ui-icons/LooksTwo';
import Entry3Icon           from 'material-ui-icons/Looks3';
import Entry4Icon           from 'material-ui-icons/Looks4';
import Entry5Icon           from 'material-ui-icons/Looks5';
import Entry6Icon           from 'material-ui-icons/Looks6';
import { aesthetic }        from '~/style/styler';
import { keyFormatter }     from '~/util/ComponentHelpers';
import { tlEventPropTypes } from '~/util/TypeChecking';

/* FLOW TYPES */
type Props = {
  theme?: string,
  withCondensedView?: boolean,
};

type State = {
  selectedEventId?: string,
};

// TODO: This could be an awesome way of programmatically generating a Map
// const iconMap = new Map();
// for (let i = 0; i < 6; i++) {
//   iconMap.set(`Entry${i + 1}Icon`, require('material-ui-icons/'))
// }

@withRouter
export default class SelectableListPure extends Component<Props, State> {
  static displayName = 'SelectableListEnhancedComponent';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.instanceOf(ListItem)),
      PropTypes.instanceOf(ListItem),
      PropTypes.node,
    ]),
    classNames: ClassNamesPropType,
    data: PropTypes.objectOf(tlEventPropTypes),
    history: HistoryPropTypes.isRequired,
    location: LocationPropTypes.isRequired,
    match: MatchPropTypes.isRequired,
    selectedEventId: tlEventPropTypes,
    subheader: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    theme: PropTypes.string,
    withCondensedView: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    classNames: {},
    data: null,
    selectedEventId: null,
    subheader: 'By Chronology',
    theme: 'base',
    withCondensedView: false,
  };

  constructor(props) {
    super(props);

    const { theme } = props;
    this.theme = aesthetic.themes[theme];

    this.handleNewListItemSelection = ::this.handleNewListItemSelection;
    this.updateSelectedEvent = ::this.updateSelectedEvent;
  }

  state = {
    selectedEventId: null,
  };

  componentWillMount() {
    const { uuid } = get(this.props, 'match.params', null);
    return this.updateSelectedEvent(uuid);
  }

  componentWillReceiveProps({
    match: { params: { uuid: nextUuid } },
  }) {
    const { selectedEventId } = this.state;
    const { uuid } = get(this.props, 'match.params', selectedEventId);

    return !isEqual(uuid, nextUuid)
      ? this.updateSelectedEvent(nextUuid)
      : null;
  }

  getEventItemIcon(index = 0, isSelected = false) {
    const { classNames } = this.props;
    const { colors, helpers } = this.theme;

    const lookupKey = `entry${index + 1}Icon`;
    const iconProps = {
      ...(isSelected ? { nativeColor: colors.blue.accent } : null),
      className: classNames.eventListItemIcon,
      classes: { root: classNames.eventListItemIcon },
      fontSize: true,
      style: {
        ...helpers.multiPropertyStyle(36, ['height', 'width']),
        color: isSelected
          ? colors.blue.accent
          : null,
      },
      titleAccess: `Entry Nº ${index + 1}`,
    };

    const iconMap = new Map([
      ['entry1Icon', Entry1Icon],
      ['entry2Icon', Entry2Icon],
      ['entry3Icon', Entry3Icon],
      ['entry4Icon', Entry4Icon],
      ['entry5Icon', Entry5Icon],
      ['entry6Icon', Entry6Icon],
    ]);

    const IconComponent = iconMap.has(lookupKey)
      ? iconMap.get(lookupKey)
      : EventIcon;
    return (<IconComponent {...iconProps} />);
  }

  updateSelectedEvent(uuid) {
    return this.setState(update(this.state, {
      selectedEventId: { $set: uuid },
    }));
  }

  handleNewListItemSelection(evt, uuid) {
    return this.setState(update(this.state, {
      selectedEventId: { $set: uuid },
    }));
  }

  renderEventsList() {
    const { classNames, data, withCondensedView } = this.props;
    const { selectedEventId } = this.state;
    const { colors } = this.theme;

    return Object
      .values(data)
      .map(({ description = '', name = '', uuid, ...rest }, index) => {
        const isSelected = eq(uuid, selectedEventId);

        return (
          <ListItem
            button
            divider
            key={keyFormatter(uuid, 'drawerEvent__')}
            component={(props) => (
              <Link
                replace // Replace current entry in history stack for quick back navigation
                to={`/events/edit/${uuid}`}
                {...props}
              />
            )}
            dense={!!withCondensedView}
            style={{
              alignItems: 'end',
              backgroundColor: isSelected
                ? colors.status.selected
                : null,
            }}
          >
            <ListItemIcon>{this.getEventItemIcon(index, isSelected)}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <h4
                  aria-label={name}
                  className={classNames.eventsDrawerMenuItemHeader}
                  title={name}
                >
                  {isEmpty(name) ? `Event Nº ${index}` : name}
                </h4>
              }
              secondary={this.renderSummarySnippet(description)}
              value={uuid}
            />
          </ListItem>
        );
      });
  }

  renderSummarySnippet(description = []) {
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
    const { classNames, subheader, ...rest } = this.props;

    return (
      <List
        className={classNames.selectableList}
        component="nav"
        subheader={<ListSubheader component="h5">{subheader}</ListSubheader>}
      >
        {this.renderEventsList()}
      </List>
    );
  }
}
