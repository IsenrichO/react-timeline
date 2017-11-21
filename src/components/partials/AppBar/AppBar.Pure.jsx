// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ClassNamesPropType } from 'aesthetic';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import AppBarMenu from './AppBarMenu';
import { aesthetic } from '../../../style/styler';
import RTLogoGlyph from '../../../constants/svg/RTLogoGlyph';

// App bar menu icon imports:
import AboutGlyph from 'material-ui/svg-icons/action/info-outline';
import HelpGlyph from 'material-ui/svg-icons/action/help-outline';
import SettingsGlyph from 'material-ui/svg-icons/action/settings';
import SignOutGlyph from 'material-ui/svg-icons/action/exit-to-app';

type Props = {
  hasMenuIcon?: boolean,
  theme?: string,
};

export default class AppBarPure extends PureComponent<Props> {
  static displayName = 'RTAppBar';

  static muiName = 'AppBar';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    hasMenuIcon: PropTypes.bool,
    theme: PropTypes.string,
  };

  static defaultProps = {
    hasMenuIcon: true,
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const { theme } = props;

    this.menuProps = [[
      {
        icon: SignOutGlyph,
        label: 'Log Out',
        link: '/login',
      }, {
        icon: SettingsGlyph,
        label: 'Settings',
        link: '/settings',
      },
    ], [
      {
        icon: AboutGlyph,
        label: 'About',
        link: '/about',
      }, {
        icon: HelpGlyph,
        label: 'Help',
        link: '/help',
      },
    ]];
    this.theme = aesthetic.themes[theme];
  }

  render() {
    const { classNames, hasMenuIcon } = this.props;
    const { colors: themeColors } = this.theme;

    return (
      <AppBar
        className={classNames.appBarRootNode}
        iconElementLeft={
          <IconButton
            className={classNames.appBarLeftIcon}
            tooltip={<span className={classNames.appBarLeftIconTooltip}>Filter View</span>}
            tooltipPosition="bottom-center"
          >
            <Link to="/search">
              <NavigationMenuIcon color={themeColors.white.pure} />
            </Link>
          </IconButton>
        }
        iconElementRight={
          <AppBarMenu
            menuProps={this.menuProps}
          />
        }
        showMenuIconButton={hasMenuIcon}
        title={
          <header className={classNames.appBarHeader}>
            {[
              <h1
                key="appBarTitleText"
                className={classNames.appBarTitle}
              >
                React-Timeline
              </h1>,
              `\t|\t`,
              <RTLogoGlyph
                key="reactTimelineSvgLogo"
                withWhiteTheme
                aria-label="React-Timeline Web Application"
                height={48}
                styles={{
                  margin: '0 1rem',
                }}
              />,
            ]}
          </header>
        }
        zDepth={2}
      />
    );
  }
}
