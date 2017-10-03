import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import { red900 } from 'material-ui/styles/colors';

export default class AppBarPure extends PureComponent {
  static displayName = 'RTAppBar';

  static muiName = 'AppBar';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'base',
  };

  render() {
    const { classNames } = this.props;

    return (
      <AppBar
        className={classNames.appBarRootNode}
        iconElementLeft={
          <IconButton>
            <NavigationMenuIcon />
          </IconButton>
        }
        iconElementRight={<AppBarMenuPure />}
        // showMenuIconButton
        // style={{
        //   backgroundColor: red900,
        // }}
        title="React-Timeline"
        zDepth={2}
      />
    );
  }
}

const AppBarMenuPure = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
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
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="About" />
    <MenuItem primaryText="Log out" />
  </IconMenu>
);

AppBarMenuPure.muiName = 'IconMenu';
