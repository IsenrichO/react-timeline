// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { aesthetic } from '../../style/styler';
import { DEFAULT_LOGO_HEIGHT, DEFAULT_LOGO_WIDTH } from '../../style/theming/base/constants';
import { reciprocal } from '../../util/Math';
import { stylePropTypes } from '../../util/TypeChecking';

type Props = {
  height?: number,
  theme?: string,
  width?: number,
  withWhiteTheme?: boolean,
};

const RTLogoGlyphV2 = ({
  height,
  styles,
  theme,
  width,
  withWhiteTheme,
}: Props) => {
  const ASPECT_RATIO = (726 / 893);
  const {
    colors: {
      grey: {
        veryLight: veryLightGray = '#CDCDCD',
      },
      red: {
        auburn = '#995858',
        primary: themeRed = '#B15B5B',
        oldRose: themeMediumRed = '#BE7A7A',
        quinary: themeRedDark = '#854545',
        senary: themePink = '#8A4747',
        tertiary: themeLightRed = '#D1B3B3',
      },
      white: { primary: themeWhite = '#FFFFFF' },
    },
    keywords,
  } = aesthetic.themes[theme];

  const getAdjustedLength = (suppliedLength, isHeight = true) =>
    suppliedLength * (!!isHeight ? ASPECT_RATIO : reciprocal(ASPECT_RATIO));

  return (
    <svg
      height={height !== DEFAULT_LOGO_HEIGHT
        ? height
        : getAdjustedLength(width, false)
      }
      style={styles}
      version={1.1}
      viewBox={`0 0 ${DEFAULT_LOGO_WIDTH} ${DEFAULT_LOGO_HEIGHT}`}
      width={width !== DEFAULT_LOGO_WIDTH
        ? width
        : getAdjustedLength(height)
      }
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Sketch.</desc>

      <defs>
        <linearGradient
          id="rtLogo-linearGradient-1"
          x1="13.9105375%"
          x2="83.0185148%"
          y1="40.813412%"
          y2="66.4848851%"
        >
          <stop
            offset="0%"
            stopColor={!!withWhiteTheme ? veryLightGray : themeRedDark}
          />
          <stop
            offset="100%"
            stopColor={!!withWhiteTheme ? themeWhite : themeRed}
          />
        </linearGradient>
        <linearGradient
          id="rtLogo-linearGradient-2"
          x1="64.9001343%"
          x2="100%"
          y1="61.4467117%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={!!withWhiteTheme ? veryLightGray : themeRedDark}
          />
          <stop
            offset="100%"
            stopColor={!!withWhiteTheme ? themeWhite : themeRed}
          />
        </linearGradient>
        <linearGradient
          id="rtLogo-linearGradient-3"
          x1="58.6986196%"
          x2="74.0448851%"
          y1="38.2859226%"
          y2="9.06164623%"
        >
          <stop
            offset="0%"
            stopColor={!!withWhiteTheme ? themeWhite : themeRed}
          />
          <stop
            offset="100%"
            stopColor={!!withWhiteTheme ? veryLightGray : themePink}
          />
        </linearGradient>
        <linearGradient
          id="rtLogo-linearGradient-4"
          x1="5.83474089%"
          x2="50%"
          y1="74.8826349%"
          y2="20.7363834%"
        >
          <stop
            offset="0%"
            stopColor={!!withWhiteTheme ? themeWhite : auburn}
          />
          <stop
            offset="100%"
            stopColor={themeLightRed}
          />
        </linearGradient>
      </defs>

      <g
        fillRule="evenodd"
        fill={keywords.none}
        id="rtLogo-svgGroup"
        stroke={keywords.none}
        strokeWidth={1}
      >
        <g id="rtLogoPolygonGroup">
          <polygon
            fill="url(#rtLogo-linearGradient-1)"
            id="rtLogo-anterior-letterT-stem-dorsalHalf"
            points="119 95 178.817044 111.5 178.817044 239.5 119 223"
          />
          <polygon
            fill="url(#rtLogo-linearGradient-2)"
            id="rtLogo-anterior-letterT-stem-caudalHalf"
            points="119 223 178.817044 239.5 178.817044 334.5 119 318"
          />
          <polygon
            fill={themeMediumRed}
            id="rtLogo-dorsal-letterT-stem"
            points="178 111.81063 237.817044 93 237.817044 315.530691 178 334.341321"
          />
          <polygon
            fill="url(#rtLogo-linearGradient-3)"
            id="rtLogo-anterior-letterR-tail"
            points="59.5 236 118.75 252 59.25 362 0 346"
          />
          <path
            d="M237,0 C237,0 256.333333,5.83333333 295,17.5 L114,66.5 C98.9470878,72.2621026 86.1137545,79.7621026 75.5,89 C64.4206318,98.6431538 59,117.849987 59,131.5 C59,164 59,169 59,203.5 C59,216.5 66,234 68,236 C75.7901813,243.790181 92.1235146,249.956848 117,254.5 C84.1347799,247.618487 52.3014465,238.45182 21.5,227 C9.20216979,222.42773 1,210.401159 1,199 C1,143.5 1,153.5 1,104 C1,84.6928893 7.07773845,71.978725 25.5,62 C33.5,57.6666667 47.1666667,52.5 66.5,46.5 C180.166667,15.5 237,0 237,0 Z"
            fill="url(#rtLogo-linearGradient-4)"
            id="rtLogo-anterior-letterR-bowl"
          />
          <path
            d="M179.182034,237.70441 L195.34219,234 L138.84219,342.5 L59.3421898,362 L118.224096,252.937154 C99.8763978,249.879009 83.0367453,245.714843 72.8421898,240.5 C66,237 59,223 59,207.981664 C59,176.830368 59,143.459066 59,129.5 C59,121.5 63.5188907,103.785352 67.3421898,98 C76.0945721,84.756042 92.8421898,72.5 116.84219,65.5 C148.767406,56.1884787 208.21402,40.021812 295.182034,17 L295.182034,77.5 C237.728909,94.1666667 184.782294,110.333333 136.34219,126 C121.291468,130.867757 119.84219,144.5 119.495017,155.5 C119.147845,166.5 119.34219,176 119.495017,187.737832 C119.574857,193.869921 122.34219,207.481664 130.34219,209.5 C138.966129,211.675751 157.84219,211 179.182034,207.5 C179.182034,217.470388 179.182034,228.644686 179.182034,239.005507 Z"
            fill={themeMediumRed}
            id="rtLogo-aerial-letterUnion-arm"
          />
        </g>
      </g>
    </svg>
  );
};

RTLogoGlyphV2.displayName = 'ReactTimelineSVGLogoV3';

RTLogoGlyphV2.propTypes = {
  height: PropTypes.number,
  styles: stylePropTypes,
  theme: PropTypes.string,
  width: PropTypes.number,
  withWhiteTheme: PropTypes.bool,
};

RTLogoGlyphV2.defaultProps = {
  height: DEFAULT_LOGO_HEIGHT,
  styles: null,
  theme: 'base',
  width: DEFAULT_LOGO_WIDTH,
  withWhiteTheme: false,
};

export default RTLogoGlyphV2;
