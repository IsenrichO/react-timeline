// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { aesthetic } from '../../style/styler';
import { reciprocal } from '../../util/Math';
import { stylePropTypes } from '../../util/TypeChecking';

type Props = {
  height?: number,
  theme?: string,
  width?: number,
  withWhiteTheme?: boolean,
};

const RTLogoGlyph = ({
  height,
  styles,
  theme,
  width,
  withWhiteTheme,
}: Props) => {
  const ASPECT_RATIO = (284 / 344);
  const {
    colors: {
      red: {
        primary: themeRed = '#B15B5B',
        quaternary: themeMediumRed = '#BE7A7A',
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
      height={height !== 344
        ? height
        : getAdjustedLength(width, false)
      }
      style={styles}
      version={1.1}
      viewBox="0 0 284 344"
      width={width !== 284
        ? width
        : getAdjustedLength(height)
      }
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="rtLogoDorsalFaceGradient-letterR-bowl"
          x1="30.3663911%"
          x2="75.6176189%"
          y1="73.7628923%"
          y2="34.4150369%"
        >
          <stop
            offset="0%"
            stopColor={!!withWhiteTheme ? themeWhite : themeRed}
          />
          <stop
            offset="100%"
            stopColor={themeLightRed}
          />
        </linearGradient>
      </defs>
      <g
        fill={keywords.none}
        fillRule="evenodd"
        id="rtLogoSvgGroup"
        stroke={keywords.none}
        strokeWidth={1}
      >
        <g
          id="rtLogoTransformGroup"
          transform="translate(-402.000000, -276.000000)"
        >
          <g
            id="rtLogoPathGroup"
            transform="translate(402.000000, 276.000000)"
          >
            <path
              d="M77.7862665,221.5 C20.7150668,198.807464 -4.95159983,161.640797 0.786266511,110 C5.11959984,71 36.4529332,42.6666667 94.7862665,25 L141.286267,40.5 C69.2862665,61.5 32.4529332,92.1666667 30.7862665,132.5 C28.613719,185.075651 54.113719,218.075651 107.286267,231.5 L77.7862665,221.5 Z"
              fill="url(#rtLogoDorsalFaceGradient-letterR-bowl)"
              id="rtLogoDorsalFace-letterR-bowl"
            />
            <polygon
              fill={!!withWhiteTheme ? themeWhite : themeRed}
              id="rtLogoDorsalFace-letterT-stem"
              points="110 93.5000153 141.5 75 141.5 294.000015 110.185348 317.200012"
              transform="translate(125.750000, 196.100006) scale(-1, 1) translate(-125.750000, -196.100006)"
            />
            <polygon
              fill={!!withWhiteTheme ? themeWhite : themeRed}
              id="rtLogoDorsalFace-letterR-tail"
              points="35.37518 216 114.5 326.417672 91 343.417672 3 224.417672"
              transform="translate(58.750000, 279.708836) scale(-1, 1) translate(-58.750000, -279.708836)"
            />
            <polygon
              fill={themeMediumRed}
              id="rtLogoAnteriorFace-letterR-tail"
              points="26 184 143 343 78.5 328 26 256"
              transform="translate(84.500000, 263.500000) scale(-1, 1) translate(-84.500000, -263.500000)"
            />
            <path
              d="M283.351321,100.2517 L283.370696,100.255405 L283.370696,41 L141,16 L141,73.0303994 L229.710007,89.9940761 L229.710007,305.255405 L283.185348,317.200012 L283.351321,100.2517 Z"
              fill={themeMediumRed}
              id="rtLogoAnteriorFace-letterT"
              transform="translate(212.185348, 166.600006) scale(-1, 1) translate(-212.185348, -166.600006)"
            />
            <path
              d="M30,41 C106.333333,61.191497 143.5,95.3676767 141.5,143.528539 C139.137208,200.425597 101.970541,232.076946 30,238.482587 L30,186.946514 L30,99.9896432 L30,41 Z M30,99.5789227 L30,187.478155 C67.1921986,181.826052 85.7882979,167.833333 85.7882979,145.5 C85.7882979,123.166667 67.1921986,107.859641 30,99.5789227 Z"
              fill={themeMediumRed}
              id="rtLogoAnteriorFace-letterR-bowl"
              transform="translate(85.788298, 139.741293) scale(-1, 1) translate(-85.788298, -139.741293)"
            />
            <polygon
              fill={themeLightRed}
              id="rtLogoAerialFace-letterT-arm"
              points="95 25.5 237.5 0 283.5 16 140.5 41"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

RTLogoGlyph.displayName = 'ReactTimelineSVGLogo';

RTLogoGlyph.propTypes = {
  height: PropTypes.number,
  styles: stylePropTypes,
  theme: PropTypes.string,
  width: PropTypes.number,
  withWhiteTheme: PropTypes.bool,
};

RTLogoGlyph.defaultProps = {
  height: 344,
  styles: null,
  theme: 'base',
  width: 284,
  withWhiteTheme: false,
};

export default RTLogoGlyph;
