export default (({ colors, fonts, helpers, keywords, transitions }) => ({
  ...helpers.styleInheritor('border-bottom-right-radius', 'border-top-right-radius'),
  WebkitBackgroundClip: 'padding-box',
  background: {
    color: colors.white.primary,
    image: keywords.none,
  },
  backgroundClip: 'padding-box',
  border: {
    color: colors.red.primary,
    style: 'solid',
    width: 1,
  },
  borderLeft: keywords.none,
  color: colors.grey.tuna,
  font: {
    family: fonts.face.neue,
    lineHeight: '1.75rem',
    size: '1.25rem',
    style: keywords.normal,
    weight: keywords.normal,
  },
  padding: ['0.5rem', '0.75rem'],
  transition: transitions.transitionAll({
    duration: 150,
  }),
  width: '100%',

  '&:focus': {
    font: {
      family: fonts.face.neue,
      lineHeight: '3rem',
      size: '2rem',
      style: keywords.normal,
      weight: keywords.normal,
    },
    outline: keywords.none,
  },
}));
