// @flow
import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Link }                 from 'react-router-dom';
import { ClassNamesPropType }   from 'aesthetic';
import AppBar                   from 'material-ui/AppBar';
import IconButton               from 'material-ui/IconButton';
import Toolbar                  from 'material-ui/Toolbar';
import Tooltip                  from 'material-ui/Tooltip';
import Typography               from 'material-ui/Typography';
import AppBarMenu               from './AppBarMenu';
import { aesthetic }            from '@styles/styler';
import RTLogoGlyph              from '@constants/svg/RTLogoGlyph';

// App bar menu icon imports:
import AboutGlyph               from 'material-ui-icons/InfoOutline';
import HelpGlyph                from 'material-ui-icons/HelpOutline';
import HomeGlyph                from 'material-ui-icons/Home';
import NavigationMenuIcon       from 'material-ui-icons/Menu';
import SettingsGlyph            from 'material-ui-icons/Settings';
import SignOutGlyph             from 'material-ui-icons/ExitToApp';

/* FLOW TYPINGS */
type Props = {
  hasMenuIcon?: boolean,
  theme?: string,
};

export default class AppBarPure extends PureComponent<Props> {
  static displayName = 'AppBarPure';

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
        icon: HomeGlyph,
        label: 'Home',
        link: '/',
      }, {
        icon: SettingsGlyph,
        label: 'Settings',
        link: '/settings',
      }, {
        icon: SignOutGlyph,
        label: 'Log Out',
        link: '/login',
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
    const { colors } = this.theme;

    const searchViewIconId = 'appbar-filter-view-icon';

    return (
      <AppBar
        className={classNames.appBarRootNode}
        color="primary"
        position="fixed"
      >
        <Toolbar>
          <Tooltip
            enterDelay={350}
            id={searchViewIconId}
            placement="bottom"
            title={<span className={classNames.appBarLeftIconTooltip}>Filter View</span>}
          >
            <IconButton
              aria-describedby={searchViewIconId}
              aria-label="Search"
              className={classNames.appBarLeftIcon}
            >
              <Link to="/search">
                <NavigationMenuIcon
                  fontSize
                  nativeColor={colors.white.pure}
                  titleAccess="Search Menu"
                />
              </Link>
            </IconButton>
          </Tooltip>

          <Typography
            noWrap
            align="center"
            className={classNames.appBarTypographyHeader}
            type="display3"
          >
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
                  withWhiteTheme
                  key="reactTimelineSvgLogo"
                  aria-label="React-Timeline Web Application"
                  height={48}
                  styles={{ margin: '0 1rem' }}
                />,
              ]}
            </header>
          </Typography>

          <AppBarMenu menuProps={this.menuProps} />
        </Toolbar>
      </AppBar>
    );
  }
}
