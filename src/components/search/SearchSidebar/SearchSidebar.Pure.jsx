import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import update from 'immutability-helper';
import { capitalize, isBoolean } from 'lodash';
import { classes, ClassNamesPropType } from 'aesthetic';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ActiveFilterIcon from 'material-ui/svg-icons/image/lens';
import SearchBox from './SearchBox';
import SidebarSettingsBar from './SidebarSettingsBar';
import RangeSlider from '../../partials/RangeSlider';
import { aesthetic } from '../../../style/styler';

//
export default class SearchSidebarPure extends Component {
  static displayName = 'SearchSideBar';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const {
      history: { push },
      theme = 'base',
    } = props;

    this.state = {
      isSidebarExpanded: true,
    };

    this.SUB_ROUTES = [{
      category: 'all',
      childRoute: '',
      glyph: {
        altClass: 'null',
        htmlEntity: null,
        materialClass: 'all_inclusive',
      },
      isAccordion: false,
      name: 'All Events',
      path: '/search',
    }, {
      category: 'starred',
      childRoute: '/starred',
      glyph: {
        altClass: 'category-ic',
        htmlEntity: '&#x2606;',
        materialClass: 'star',
      },
      isAccordion: false,
      name: 'Starred Events',
      path: '/search/starred',
    }, {
      category: 'recently-modified',
      childRoute: '/recent',
      glyph: {
        altClass: null,
        htmlEntity: null,
        materialClass: 'history',
      },
      isAccordion: true,
      name: 'Recent',
      path: '/search/recent',
    }];
    this.theme = aesthetic.themes[theme];
    this.toggleSidebarState = ::this.toggleSidebarState;
  }

  toggleSidebarState(explicitOverride) {
    return this.setState(update(this.state, {
      isSidebarExpanded: {
        $apply: (currState) => explicitOverride && isBoolean(explicitOverride)
          ? !!explicitOverride
          : !currState,
      },
    }));
  }

  renderSidebarView({ clickHandler, glyph, isAccordion, name }, isActiveFilter = false) {
    const { classNames } = this.props;
    const { isSidebarExpanded } = this.state;
    const { colors: baseThemeColors } = this.theme;

    const searchFilterIcon = (
      <FontIcon
        key={`SearchSubRouteGlyphicon_${glyph.materialClass}`}
        className={classes(
          'material-icons',
          classNames.searchCategoryIcon,
          !isSidebarExpanded && classNames.searchCategoryIconCondensed,
        )}
      >
        {glyph.materialClass}
      </FontIcon>
    );
    const wrapInFilterHeader = (children) => (
      <h4
        className={classes(
          classNames.searchCategoryTitle,
          !!isAccordion && classNames.searchCategoryAccordion,
        )}
      >
        {children}
      </h4>
    );
    const activeFilterIndicator = !!isActiveFilter && (
      <ActiveFilterIcon
        className={classNames.activeFilterIndicator}
        color={baseThemeColors.white.pure}
      />
    );

    return !!isSidebarExpanded
      ? wrapInFilterHeader([searchFilterIcon, name, activeFilterIndicator])
      : searchFilterIcon;
  }

  renderSearchSubRoutes() {
    const { classNames, location: { pathname = '/search' } } = this.props;
    const { isSidebarExpanded } = this.state;

    return this.SUB_ROUTES.map(({ category, path, ...subRoute }, index) => {
      const isActiveFilter = (pathname.trim().toLowerCase() === path);

      return (
        <li
          key={`SubRouteCategory__${category}`}
          className={classes(
            classNames.searchCategory,
            classNames[`category${capitalize(category)}`],
            !isSidebarExpanded && classNames.searchCategoryCondensed,
            !!isActiveFilter && classNames.searchCategoryActive,
          )}
        >
          <Link to={path}>
            {this.renderSidebarView(subRoute, isActiveFilter)}
          </Link>
        </li>
      );
    });
  }

  render() {
    const { classNames, history: { push } } = this.props;
    const { isSidebarExpanded } = this.state;

    return (
      <div
        className={classes(
          classNames.searchSidebar,
          !isSidebarExpanded && classNames.searchSidebarCollapsed,
        )}
      >
        <div className={classNames.fixedPositioningContainer}>
          <IconButton
            className={classNames.homeSidebarButton}
            onClick={() => push('/')}
            tooltip={
              <span className={classNames.sidebarHomeIconTooltip}>
                Return To Home
              </span>
            }
            tooltipPosition="bottom-right"
          >
            <HomeIcon />
          </IconButton>
          <SearchBox />

          <nav>
            <ul>
              {this.renderSearchSubRoutes()}
              <li className={classNames.searchCategory}>
                <h4 className={classNames.searchCategoryTitle}>
                  {[
                    <FontIcon
                      key="SearchSubRouteGlyphicon_filter"
                      className={classes(
                        'material-icons',
                        classNames.searchCategoryIcon,
                      )}
                    >
                      filter_list
                    </FontIcon>,
                    'Filter By Range',
                  ]}
                </h4>
                <RangeSlider />
              </li>
            </ul>
          </nav>

          <SidebarSettingsBar
            clickHandler={this.toggleSidebarState}
            isSidebarExpanded={isSidebarExpanded}
          />
        </div>
      </div>
    );
  }
}
