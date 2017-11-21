// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ClassNamesPropType } from 'aesthetic';
import { size } from 'lodash';
import update from 'immutability-helper';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { aesthetic } from '../../../../style/styler';
import { keyFormatter } from '../../../../util/ComponentHelpers';
import { historyPropTypes } from '../../../../util/TypeChecking';

type Props = {
  theme?: string,
};

@withRouter
export default class AppBarMenuPure extends Component<Props> {
  static displayName = 'AppBarRightAlignedMenuDropdown';
  static muiName = 'IconMenu';

  static propTypes = {
    classNames: ClassNamesPropType,
    history: historyPropTypes.isRequired,
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
    classNames: {},
    theme: 'admin',
  };

  constructor(props) {
    super(props);
    const { theme } = props;

    this.state = {
      currLink: null,
    };

    this.handleLinkChange = ::this.handleLinkChange;
    this.theme = aesthetic.themes[theme];
  }

  handleLinkChange(evt, value) {
    return this.setState(update(this.state, {
      currLink: { $set: value },
    }));
  }

  render() {
    const { history: { push }, menuProps } = this.props;
    const { currLink } = this.state;
    const { colors: themeColors } = this.theme;

    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon color={themeColors.white.pure} />
          </IconButton>
        }
        targetOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        <Menu
          autoWidth
          maxHeight={400}
          onChange={this.handleLinkChange}
          value={currLink}
        >
          {menuProps.map((menuSection, index, menuList) => [
            menuSection.map(({ icon: SvgIcon = null, isDisabled = false, label, link }) => (
              <MenuItem
                key={keyFormatter(label, 'appBarMenuItem')}
                disabled={!!isDisabled}
                leftIcon={!!SvgIcon && (<SvgIcon />)}
                onClick={() => push(link)}
                primaryText={label}
                value={link}
              />
            )),
            (index < (size(menuList) - 1)) && (
              <Divider inset />
            ),
          ])}
        </Menu>
      </IconMenu>
    );
  }
}
