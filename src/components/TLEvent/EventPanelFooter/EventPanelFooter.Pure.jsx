// @flow
import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { classes, ClassNamesPropType } from 'aesthetic';
import { aesthetic } from '../../../style/styler';
import constants from '../../../style/theming/base/constants';
import { tlEventPropTypes } from '../../../util/TypeChecking';

type Props = {
  evtType: string,
  hasMultipleTags?: boolean,
  theme?: string,
};

const EventPanelFooterPure = ({
  addEventToFavorites,
  classNames,
  evt,
  evtType,
  hasMultipleTags,
  isStarred,
  theme,
}: Props) => {
  const { fonts } = aesthetic.themes[theme];
  const { THEME_RED: ThemeRed = '#B15B5B' } = constants;

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
            color={ThemeRed}
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
        color={ThemeRed}
        style={getIconStyles()}
        onClick={() => addEventToFavorites(evt)}
      >
        {`star${!!isStarred ? '' : '_border'}`}
      </FontIcon>
    </footer>
  );
};

EventPanelFooterPure.displayName = 'EventPanelFooterPure';

EventPanelFooterPure.propTypes = {
  addEventToFavorites: PropTypes.func.isRequired,
  classNames: ClassNamesPropType.isRequired,
  evt: tlEventPropTypes.isRequired,
  evtType: PropTypes.string,
  hasMultipleTags: PropTypes.bool,
  isStarred: PropTypes.bool.isRequired,
  theme: PropTypes.string,
};

EventPanelFooterPure.defaultProps = {
  evtType: 'Personal',
  hasMultipleTags: false,
  theme: 'base',
};

export default EventPanelFooterPure;
