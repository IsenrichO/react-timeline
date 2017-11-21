// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import update from 'immutability-helper';
import { capitalize } from 'lodash';
import { classes, ClassNamesPropType } from 'aesthetic';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ActiveFilterIcon from 'material-ui/svg-icons/image/lens';
import SearchBox from './SearchBox';
import SidebarSettingsBar from './SidebarSettingsBar';
// import RangeSlider from '../../partials/RangeSlider';
import { AppActionCreators, AppActionCreatorPropTypes, AppStateInitializer, AppStatePropTypes } from '../../../state/app';
import { keyFormatter } from '../../../util/ComponentHelpers';
import { aesthetic } from '../../../style/styler';

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
    appActions: AppActionCreators,
    appState: AppStateInitializer,
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const {
      history: { push },
      theme = 'base',
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

    const searchFilterIcon = (
      <IconButton
        key={keyFormatter(name, 'sidebarCategoryIconButton')}
        className={classNames.searchCategoryButton}
        style={{
          height: !isSidebarExpanded ? 64 : 54,
          padding: 0,
          top: !!isSidebarExpanded && 7,
          width: !isSidebarExpanded && 64,
        }}
        tooltip={!isSidebarExpanded && (
          <span className={classNames.searchCategoryButtonTooltip}>
            {`${name} Events`}
          </span>
        )}
        tooltipPosition="top-right"
        tooltipStyles={{
          left: '100%',
          transform: 'translateY(50%)',
          zIndex: 30,
        }}
      >
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
      </IconButton>
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
        color={baseThemeColors.white.pure}
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
            iconStyle={{
              height: 36,
              width: 36,
            }}
            onClick={() => push('/')}
            tooltip={
              <span className={classNames.sidebarHomeIconTooltip}>
                Return To Home
              </span>
            }
            tooltipPosition="top-right"
            tooltipStyles={{
              left: '100%',
              transform: 'translateY(50%)',
              zIndex: 30,
            }}
          >
            <HomeIcon color={baseThemeColors.white.pure} />
          </IconButton>
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
