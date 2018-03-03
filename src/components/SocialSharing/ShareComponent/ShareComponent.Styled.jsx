import SocialShareComponentPure from './ShareComponent.Pure';
import { order as socialShareRenderOrder } from '../../../constants/json/SocialMedia.json';
import styler from '~/style/styler';

const socialShareIconClassNames = socialShareRenderOrder
  .reduce((acc, curr) => ({
    ...acc,
    [`socialShare${curr}`]: {},
  }), {});

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  ...socialShareIconClassNames,
  socialShareCount: {},
  socialShareCountWrapper: {},

  socialShareButton: {
    // Target the generated social media icon tag and center horizontally:
    '& > div': {
      margin: keywords.auto,
    },

    // Smoothly transition the social media icon's fill color:
    '& svg circle': {
      transition: transitions.transitionAll({ property: 'fill' }),
    },
  },
  socialShareItem: {
    ...helpers.flexify('column', 'flex-start'),
    height: 80, // Combined height of SocialIcon + ShareCount => `64px` + `16px`
    margin: [keywords.auto, 'calc(12.5% - 32px)'],
    textAlign: 'center',
  },
}), {
  styleName: 'SocialShareComponentStyles',
})(SocialShareComponentPure);
