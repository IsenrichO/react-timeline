import EventPanelFooterPure from './EventPanelFooter.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):
  eventLabelIcon: {},
  evtTags: {},
  favoriteEventStar: {},

  panelFooter: {
    ...helpers.flexify('row', 'space-between'),
    backgroundColor: colors.white.eggShell,
    border: keywords.none,
    padding: '1.25rem',
    position: 'relative',
    width: '100%',

    // &-footer {
    //   .glyphicon-star,
    //   .glyphicon-star-empty { cursor: pointer; }
    //   .glyphicon-star {
    //     color: #F6DB3D;
    //     text-shadow: 0 0 1px $theme-primary;
    //   }
    // }

    '& $favoriteEventStar': {
      cursor: 'pointer',
    },

    // '& $eventLabelIcon': {
    //   fontSize: `${fonts.size.large}px ${keywords.important}`,
    //   marginRight: '1rem',
    //   position: 'relative',
    //   top: 2,
    // },
  },
}), {
  styleName: 'EventPanelFooterStyles',
})(EventPanelFooterPure);
