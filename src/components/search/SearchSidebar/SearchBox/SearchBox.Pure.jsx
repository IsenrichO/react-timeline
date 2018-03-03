import React                           from 'react';
import { classes, ClassNamesPropType } from 'aesthetic';
import Icon                            from 'material-ui/Icon';

const SearchBoxPure = ({ classNames, ...props }) => (
  <div className={classNames.searchBox}>
    <Icon
      className={classes(
        'material-icons',
        classNames.searchMagnifyingGlassGlyph,
      )}
    >
      search
    </Icon>
    <div className={classNames.searchInputField} />
  </div>
);

SearchBoxPure.displayName = 'SearchSidebarSearchBox';

SearchBoxPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
};

SearchBoxPure.defaultProps = {};

export default SearchBoxPure;
