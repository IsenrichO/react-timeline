// @flow
import React, { Component }             from 'react';
import PropTypes                        from 'prop-types';
import {
  history as HistoryPropTypes,
  location as LocationPropTypes,
}                                       from 'react-router-prop-types';
import { Link }                         from 'react-router-dom';
import { connect }                      from 'react-redux';
import { bindActionCreators }           from 'redux';
import { classes, ClassNamesPropType, } from 'aesthetic';
import { capitalize }                   from 'lodash';
import Icon                             from 'material-ui/Icon';
import IconButton                       from 'material-ui/IconButton';
import Tooltip                          from 'material-ui/Tooltip';
import HomeIcon                         from 'material-ui-icons/Home';
import ActiveFilterIcon                 from 'material-ui-icons/Lens';
import SearchBox                        from './SearchBox';
import SidebarSettingsBar               from './SidebarSettingsBar';
// import RangeSlider from '../../partials/RangeSlider';
import {
  AppActionCreatorPropTypes,
  AppActionCreators,
  AppStateInitializer,
  AppStatePropTypes,
}                                       from '~/state/app';
import { keyFormatter }                 from '~/util/ComponentHelpers';
import { aesthetic }                    from '~/style/styler';

type Props = {
  theme?: string,
};

@connect(
  ({ appState }) => ({ appState }),
  (dispatch) => ({
    appActions: bindActionCreators(AppActionCreators, dispatch),
  }),
)
export default class SearchSidebarPure extends Component<Props> {
  static displayName = 'SearchSideBar';

  static propTypes = {
    appActions: AppActionCreatorPropTypes,
    appState: AppStatePropTypes,
    classNames: ClassNamesPropType.isRequired,
    history: HistoryPropTypes.isRequired,
    location: LocationPropTypes.isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    appActions: AppActionCreators,
    appState: AppStateInitializer,
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const {
      history: { push },
      theme,
    } = props;

    this.SUB_ROUTES = [{
      category: 'all',
      childRoute: '',
      glyph: {
        altClass: 'null',
        htmlEntity: null,
        materialClass: 'all_inclusive',
      },
      isAccordion: false,
      name: 'All',
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
      name: 'Starred',
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
    }, {
      category: 'filter',
      childRoute: '/filter',
      glyph: {
        altClass: null,
        htmlEntity: null,
        materialClass: 'filter_list',
      },
      isAccordion: true,
      name: 'Filter', // 'Filter By Range',
      path: '/search/filter',
    }, {
      category: 'map',
      childRoute: '/map',
      glyph: {
        altClass: 'null',
        htmlEntity: null,
        materialClass: 'map',
      },
      isAccordion: false,
      name: 'Map',
      path: '/search/map',
    }];

    this.theme = aesthetic.themes[theme];
    this.toggleSidebarState = ::this.toggleSidebarState;
  }

  toggleSidebarState(evt, explicitOverride) {
    const { collapseSearchSidebar } = this.props.appActions;
    return collapseSearchSidebar(explicitOverride);
  }

  renderSidebarView({ clickHandler, glyph, isAccordion, name }, isActiveFilter = false) {
    const {
      appState: { isSearchSidebarOpen: isSidebarExpanded },
      classNames,
    } = this.props;
    const { colors: baseThemeColors } = this.theme;
    const filterId = `search-page-${name.toLowerCase()}-filter`;

    const searchFilterIcon = (
      <Tooltip
        key={keyFormatter(name, 'sidebarCategoryIconButton')}
        classes={{
          tooltip: classNames.searchCategoryButtonTooltip,
        }}
        enterDelay={350}
        id={filterId}
        placement="right-start"
        title={!isSidebarExpanded && (<span>{`${name} Events`}</span>)}
      >
        <IconButton
          aria-describedby={filterId}
          aria-label={name}
          className={classNames.searchCategoryButton}
          style={{
            height: !isSidebarExpanded ? 64 : 54,
            width: !isSidebarExpanded && 64,
          }}
        >
          <Icon
            key={`SearchSubRouteGlyphicon_${glyph.materialClass}`}
            className={classes(
              'material-icons',
              classNames.searchCategoryIcon,
              !isSidebarExpanded && classNames.searchCategoryIconCondensed,
            )}
          >
            {glyph.materialClass}
          </Icon>
        </IconButton>
      </Tooltip>
    );
    const wrapInFilterHeader = (children) => (
      <header
        className={classes(
          classNames.searchCategoryHeader,
          !!isAccordion && classNames.searchCategoryAccordion,
        )}
      >
        {children}
      </header>
    );
    const categoryTitle = (
      <h4
        key={keyFormatter(name, 'sidebarCategoryTitle')}
        className={classes(
          classNames.searchCategoryTitle,
          !isSidebarExpanded && classNames.searchCategoryTitleHidden,
        )}
      >
        {name}
      </h4>
    );
    const activeFilterIndicator = !!isActiveFilter && (
      <ActiveFilterIcon
        key={keyFormatter(name, 'sidebarActiveCategoryIndicator')}
        className={classNames.activeFilterIndicator}
        nativeColor={baseThemeColors.white.pure}
        titleAccess="Active Filter"
      />
    );

    return wrapInFilterHeader([
      searchFilterIcon,
      categoryTitle,
      !!isSidebarExpanded && activeFilterIndicator,
    ]);
  }

  renderSearchSubRoutes() {
    const {
      appState: { isSearchSidebarOpen: isSidebarExpanded },
      classNames,
      location: { pathname = '/search' },
    } = this.props;

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
    const {
      appState: { isSearchSidebarOpen: isSidebarExpanded },
      classNames,
      history: { push },
    } = this.props;
    const { colors: baseThemeColors } = this.theme;
    const homeIconId = 'search-page-home-icon';

    return (
      <div
        className={classes(
          classNames.searchSidebar,
          !isSidebarExpanded && classNames.searchSidebarCollapsed,
        )}
      >
        <div className={classNames.fixedPositioningContainer}>
          <Tooltip
            enterDelay={350}
            id={homeIconId}
            placement="right-start"
            title={<span className={classNames.sidebarHomeIconTooltip}>Return Home</span>}
          >
            <IconButton
              aria-describedby={homeIconId}
              aria-label="Home"
              className={classNames.homeSidebarButton}
              onClick={() => push('/')}
            >
              <HomeIcon
                fontSize
                className={classNames.homeIcon}
                nativeColor={baseThemeColors.white.pure}
                titleAccess="Home"
              />
            </IconButton>
          </Tooltip>
          <SearchBox />

          <nav>
            <ul>{this.renderSearchSubRoutes()}</ul>
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

// <li className={classNames.searchCategory}>
//   <h4 className={classNames.searchCategoryHeader}>
//     {[
//       <FontIcon
//         key="SearchSubRouteGlyphicon_filter"
//         className={classes(
//           'material-icons',
//           classNames.searchCategoryIcon,
//         )}
//       >
//         filter_list
//       </FontIcon>,
//       'Filter By Range',
//     ]}
//     <RangeSlider />
//   </h4>
// </li>
