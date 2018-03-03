import EventDetailPagePure from './EventDetailPage.Pure';
import styler              from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  pageLayoutContainer: {
    overflow: '-webkit-paged-y',
    position: 'relative',
  },
}), {
  styleName: 'EventDetailPageStyles',
})(EventDetailPagePure);
