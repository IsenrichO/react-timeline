import dedent from 'dedent';
import colors from './colors';
import keywords from './keywords';

/* IMAGE ASSETS */
export const gradientParameters = dedent(`
  45deg,
  ${colors.grey.iron} 25%,
  ${keywords.transparent} 25%,
  ${keywords.transparent} 75%,
  ${colors.grey.iron} 75%,
  ${colors.grey.iron}
`);

export const checkeredTransparencyBckg = { /* eslint-disable no-dupe-keys,sort-keys */
  backgroundColor: colors.white.semiTransparent,
  backgroundImage: `-webkit-linear-gradient(${gradientParameters}), -webkit-linear-gradient(${gradientParameters})`,
  backgroundImage: `-moz-linear-gradient(${gradientParameters}), -moz-linear-gradient(${gradientParameters})`,
  backgroundImage: `-o-linear-gradient(${gradientParameters}), -o-linear-gradient(${gradientParameters})`,
  backgroundImage: `-ms-linear-gradient(${gradientParameters}), -ms-linear-gradient(${gradientParameters})`,
  backgroundImage: `linear-gradient(${gradientParameters}), linear-gradient(${gradientParameters})`,
  backgroundSize: ['20px', '20px'],
  backgroundPosition: '0 0, 10px 10px',
}; /* eslint-enable no-dupe-keys,sort-keys */

export const emptyContent = dedent(`
  data:image/svg+xml;utf8,\
  <svg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'>\
  <g fill='%23E8BAA5' fill-opacity='0.4' fill-rule='evenodd'><path d='M5 0h1L0 6V5zM6 5v1H5z'/>\
  </g></svg>\
`);

export const mainButtonPen = 'https://ssl.gstatic.com/s2/oz/images/quark/a7367650055ae3cf32ee3b7023c1ed88ic_create_wht_24dp.png';

export const searchIcon = 'http://petersenhotels.com/2015/wp-content/themes/petersen-hotels/images/search.svg';

/* COMPILED DEFAULT EXPORT */
export default {
  checkeredTransparencyBckg,
  emptyContent,
  mainButtonPen,
  modalGradient(direction = 'top') {
    return dedent(`
      linear-gradient(
        to ${direction.toLowerCase()},
        ${colors.white.primary} 20%,
        rgba(255, 255, 255, 0.8) 70%,
        rgba(255, 255, 255, 0.08) 99%
      )
    `);
  },
  searchIcon,
};
