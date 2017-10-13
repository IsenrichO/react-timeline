import React from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import FontIcon from 'material-ui/FontIcon';

const SearchBoxPure = ({ classNames, ...props }) => (
  <div className={classNames.searchBox}>
    <FontIcon
      className={classes(
        'material-icons',
        classNames.searchMagnifyingGlassGlyph,
      )}
    >
      search
    </FontIcon>
    <div className={classNames.searchInputField} />
  </div>
);

SearchBoxPure.displayName = 'SearchSidebarSearchBox';

SearchBoxPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
};

SearchBoxPure.defaultProps = {};

export default SearchBoxPure;
