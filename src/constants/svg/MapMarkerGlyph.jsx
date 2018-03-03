// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { aesthetic } from '~/style/styler';
import { stylePropTypes } from '../../util/TypeChecking';

type Props = {
  theme?: string,
};

const MapMarkerGlyph = ({
  styles,
  theme,
}: Props) => {
  const { colors, keywords } = aesthetic.themes[theme];

  return (
    <svg
      height={186}
      width={125}
      version={1.1}
      viewBox="0 0 125 186"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Page-1"
        stroke={keywords.none}
        strokeWidth={1}
        fill={keywords.none}
        fillRule="evenodd"
      >
        <g
          id="map-marker-group"
          fill={colors.black.pure}
          fillRule="nonzero"
        >
          <path
            d="M63.0034041,0 C92.5034041,0 125.282054,13.79237 125.003404,62 C124.818334,94.017665 88.4723791,185.43129 63.0034041,185.5 C37.5344291,185.56871 0.33288045,102.30594 0.00340409,62 C-0.39066371,13.79237 33.5034041,0 63.0034041,0 Z M63.0034041,96 C81.7810851,96 97.0034041,80.777681 97.0034041,62 C97.0034041,43.222318 81.7810851,28 63.0034041,28 C44.2257221,28 29.0034041,43.222318 29.0034041,62 C29.0034041,80.777681 44.2257221,96 63.0034041,96 Z"
            id="Combined-Shape"
          />
        </g>
      </g>
    </svg>
  );
};

MapMarkerGlyph.displayName = 'GoogleMapsMapMarkerSVGIcon';

MapMarkerGlyph.propTypes = {
  styles: stylePropTypes,
  theme: PropTypes.string,
};

MapMarkerGlyph.defaultProps = {
  styles: null,
  theme: 'base',
};

export default MapMarkerGlyph;
