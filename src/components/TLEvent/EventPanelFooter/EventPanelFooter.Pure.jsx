import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { classes, ClassNamesPropType } from 'aesthetic';
import { aesthetic } from '../../../style/styler';
import { THEME_RED } from '../../../style/theming/base';

const EventPanelFooterPure = ({
  addEventToFavorites,
  classNames,
  evt,
  evtType,
  getStarGlyphClass,
  hasMultipleTags,
  theme,
}) => {
  const { fonts } = aesthetic.themes[theme];

  const getIconStyles = (withRightMargin = false) => ({
    fontSize: fonts.size.large,
    marginRight: !!withRightMargin && '1rem',
    position: 'relative',
    top: !!withRightMargin && 2,
  });

  return (
    <footer className={classNames.panelFooter}>
      <div className={classNames.evtTags}>
        {[
          <FontIcon
            key={`TagsGlyph`}
            className={classes(
              'material-icons',
              classNames.eventLabelIcon,
            )}
            color={THEME_RED}
            style={getIconStyles(true)}
          >
            label
          </FontIcon>,
          evtType,
        ]}
      </div>
      <FontIcon
        className={classes(
          'material-icons',
          classNames.favoriteEventStar,
        )}
        color={THEME_RED}
        style={getIconStyles()}
        onClick={() => addEventToFavorites(evt)}
      >
        {`star${!!getStarGlyphClass ? '' : '_border'}`}
      </FontIcon>
    </footer>
  );
};

EventPanelFooterPure.displayName = 'EventPanelFooterPure';

EventPanelFooterPure.propTypes = {
  addEventToFavorites: PropTypes.func.isRequired,
  classNames: ClassNamesPropType.isRequired,
  evt: PropTypes.object,
  evtType: PropTypes.string,
  getStarGlyphClass: PropTypes.func.isRequired,
  hasMultipleTags: PropTypes.bool,
  theme: PropTypes.string,
};

EventPanelFooterPure.defaultProps = {
  evt: {},
  evtType: 'Personal',
  hasMultipleTags: false,
  theme: 'base',
};

export default EventPanelFooterPure;
