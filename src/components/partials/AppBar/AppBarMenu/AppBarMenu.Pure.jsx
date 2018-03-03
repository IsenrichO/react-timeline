// @flow
import React, { Component, Fragment } from 'react';
import PropTypes                      from 'prop-types';
import { withRouter }                 from 'react-router';
import { ClassNamesPropType }         from 'aesthetic';
import {
  eq,
  size,
}                                     from 'lodash';
import update                         from 'immutability-helper';
import Divider                        from 'material-ui/Divider';
import Menu, { MenuItem }             from 'material-ui/Menu';
import IconButton                     from 'material-ui/IconButton';
import {
  ListItemIcon,
  ListItemText,
}                                     from 'material-ui/List';
import Tooltip                        from 'material-ui/Tooltip';
import MoreVertIcon                   from 'material-ui-icons/MoreVert';
import Fade                           from 'material-ui/transitions/Fade';
import Grow                           from 'material-ui/transitions/Grow';
import {
  history as HistoryPropTypes,
  location as LocationPropTypes,
  match as MatchPropTypes,
}                                     from 'react-router-prop-types';
import { aesthetic }                  from '~/style/styler';
import { keyFormatter }               from '~/util/ComponentHelpers';

/* FLOW TYPES */
type Props = {
  theme?: string,
};

type State = {
  currLink?: string,
};

@withRouter
export default class AppBarMenuPure extends Component<Props, State> {
  static displayName = 'AppBarRightAlignedMenuDropdown';

  static muiName = 'IconMenu';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    history: HistoryPropTypes.isRequired,
    location: LocationPropTypes.isRequired,
    match: MatchPropTypes.isRequired,
    menuProps: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.func,
          label: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    ).isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'admin',
  };

  constructor(props) {
    super(props);
    const { theme } = props;

    this.handleLinkChange = ::this.handleLinkChange;
    this.handleMenuClick = ::this.handleMenuClick;
    this.handleMenuClose = ::this.handleMenuClose;
    this.theme = aesthetic.themes[theme];
  }

  state = {
    anchorEl: null,
    currLink: null,
  };

  handleLinkChange(evt, value) {
    return this.setState(update(this.state, {
      currLink: { $set: value },
    }));
  }

  handleMenuClick = (evt) => this.setState(update(this.state, {
    anchorEl: { $set: evt.currentTarget },
  }));

  handleMenuClose = (evt) => this.setState(update(this.state, {
    anchorEl: { $set: null },
  }));

  render() {
    const {
      classNames,
      history: { push },
      location: { pathname },
      menuProps,
    } = this.props;
    const { anchorEl, currLink } = this.state;
    const { colors } = this.theme;

    const moreOptionsMenuIconId = 'more-options-menu-icon';
    const menuAnchorSetting = {
      horizontal: 'right',
      vertical: 'top',
    };

    return (
      <Fragment>
        <Tooltip
          enterDelay={350}
          id={moreOptionsMenuIconId}
          placement="bottom"
          title={<span className={classNames.moreOptionsIcon}>More</span>}
        >
          <IconButton
            aria-haspopup
            aria-describedby={moreOptionsMenuIconId}
            aria-label="More"
            aria-owns={!!anchorEl ? 'more-opts-menu' : null}
            id="app-bar-options-icon-button"
            onClick={this.handleMenuClick}
          >
            <MoreVertIcon
              fontSize
              nativeColor={colors.white.pure}
              titleAccess="Vertical Ellipsis"
            />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={menuAnchorSetting}
          anchorReference="anchorEl"
          id="more-opts-menu"
          marginThreshold={16}
          onChange={this.handleLinkChange}
          onClose={this.handleMenuClose}
          open={Boolean(anchorEl)}
          transformOrigin={menuAnchorSetting}
          transition={Fade || Grow}
          value={currLink}
        >
          {menuProps.map((menuSection, index, menuList) => [
            menuSection.map(({ icon: SvgIcon = null, isDisabled = false, label, link }) => (
              <MenuItem
                key={keyFormatter(label, 'appBarMenuItem')}
                disabled={!!isDisabled}
                onClick={() => push(link)}
                selected={eq(pathname.toLowerCase(), link)}
                value={link}
              >
                <ListItemIcon>
                  {!!SvgIcon && (<SvgIcon />)}
                </ListItemIcon>
                <ListItemText
                  inset
                  primary={label}
                />
              </MenuItem>
            )),
            (index < (size(menuList) - 1)) && (<Divider inset />),
          ])}
        </Menu>
      </Fragment>
    );
  }
}
