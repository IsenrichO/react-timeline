// @flow
import React                           from 'react';
import PropTypes                       from 'prop-types';
import Icon                            from 'material-ui/Icon';
import { classes, ClassNamesPropType } from 'aesthetic';
import { aesthetic }                   from '~/style/styler';
import constants                       from '~/style/theming/base/constants';
import { tlEventPropTypes }            from '~/util/TypeChecking';

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
          <Icon
            key={`TagsGlyph`}
            className={classes(
              'material-icons',
              classNames.eventLabelIcon,
            )}
            color="primary"
            style={getIconStyles(true)}
          >
            label
          </Icon>,
          evtType,
        ]}
      </div>
      <Icon
        className={classes(
          'material-icons',
          classNames.favoriteEventStar,
        )}
        color="primary"
        onClick={() => addEventToFavorites(evt)}
        style={getIconStyles()}
      >
        {`star${!!isStarred ? '' : '_border'}`}
      </Icon>
    </footer>
  );
};

EventPanelFooterPure.displayName = 'EventPanelFooter';

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
