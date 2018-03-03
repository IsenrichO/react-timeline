import GeoSuggestInputPure from './GeoSuggestInput.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords, shared, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  geoSuggestEmptyResponseContainer: {},
  geoSuggestEmptyResponseIcon: {},
  geoSuggestEmptyResponseLabel: {},
  geoSuggestInputContainerWithFocus: {},
  geoSuggestItemContainer: {},
  geoSuggestItemLabel: {},
  geoSuggestItemMapMarkerIcon: {},

  geoSuggestInput: {
    ...shared.inputGroup,
  },
  geoSuggestInputContainer: {
    ...helpers.styleInheritor('width'),
    borderRadius: [0, '3.5px', '3.5px', 0],
    font: {
      family: fonts.face.neue,
      lineHeight: '1.75rem',
      size: '1.25rem',
      style: keywords.normal,
      weight: keywords.normal,
    },
    position: 'relative',

    '&$geoSuggestInputContainerWithFocus': {
      borderBottomRightRadius: 0,
    },
  },
  geoSuggestItem: {
    '& + &': {
      borderTop: {
        color: colors.grey.granite,
        style: 'solid',
        width: 1,
      },
    },

    '& $geoSuggestEmptyResponseContainer': {
      ...helpers.flexify('row', 'flex-start', ['center', 'center']),
      padding: ['0.25rem', '0.75rem', '0.25rem', '0.25rem'],

      '& $geoSuggestEmptyResponseIcon': {
        color: `${colors.red.semiTransparent} ${keywords.important}`,
        height: `22px ${keywords.important}`,
        minWidth: 24,
      },

      '& $geoSuggestEmptyResponseLabel': {
        ...helpers.hideOverflow,
        marginLeft: '0.5rem',
      },
    },

    '& $geoSuggestItemContainer': {
      ...helpers.flexify('row', 'flex-start', ['center', 'center']),
      padding: ['0.25rem', '0.75rem', '0.25rem', '0.25rem'],

      '& $geoSuggestItemMapMarkerIcon': {
        color: `${colors.red.semiTransparent} ${keywords.important}`,
        height: `22px ${keywords.important}`,
        minWidth: 24,
      },

      '& $geoSuggestItemLabel': {
        ...helpers.hideOverflow,
        marginLeft: '0.5rem',
      },
    },
  },
  geoSuggestItemActive: {
    backgroundColor: colors.red.semiTransparent,
    color: colors.red.primary,

    '& $geoSuggestItemContainer': {
      '& $geoSuggestItemMapMarkerIcon': {
        color: `${colors.red.primary} ${keywords.important}`,
      },
    },
  },
  geoSuggestItemHidden: {
    ...helpers.setElementVisibility(),
  },
  geoSuggests: {
    ...helpers.styleInheritor('width'),
    backgroundColor: colors.white.eggShell,
    border: {
      color: colors.red.primary,
      radius: [0, 0, '3.5px', '3.5px'],
      style: 'solid',
      width: 1,
    },
    borderTop: keywords.none,
    boxShadow: {
      blur: 15,
      color: colors.black.boxShadowStrong,
      inset: null,
      spread: 1,
      x: 0,
      y: 5,
    },
    overflow: 'visible',
    position: 'absolute',
    zIndex: 100,
  },
}), {
  styleName: 'GeoSuggestInputStyles',
})(GeoSuggestInputPure);
