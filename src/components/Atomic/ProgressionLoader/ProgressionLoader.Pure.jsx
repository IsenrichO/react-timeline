// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import CircularProgress from 'material-ui/CircularProgress';
import { stylePropTypes } from '../../../util/TypeChecking';
import { aesthetic } from '../../../style/styler';

type Props = {
  max?: number,
  min?: number,
  mode?: string,
  size?: number,
  theme?: string,
  thickness?: number,
  value?: number,
};

const ProgressionLoaderPure = ({
  classNames,
  innerStyle,
  max,
  min,
  mode,
  size,
  style,
  theme,
  thickness,
  value,
}: Props) => {
  const { colors: themeColors } = aesthetic.themes[theme];
  const deterministicProps = { max, min, value};

  return (
    <div className={classNames.progLoaderContainer}>
      <CircularProgress
        {...(mode === 'deterministic' ? deterministicProps : null)}
        color={themeColors.red.primary}
        innerStyle={innerStyle}
        mode={mode}
        size={size}
        style={style}
        thickness={thickness}
      />
    </div>
  );
};

ProgressionLoaderPure.displayName = 'ProgressionLoadingSpinner';

ProgressionLoaderPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  innerStyle: stylePropTypes,
  max: PropTypes.number,
  min: PropTypes.number,
  mode: PropTypes.oneOf([
    'determinate',
    'indeterminate',
  ]),
  size: PropTypes.number,
  style: stylePropTypes,
  theme: PropTypes.string,
  thickness: PropTypes.number,
  value: PropTypes.number,
};

ProgressionLoaderPure.defaultProps = {
  innerStyle: null,
  max: 100,
  min: 0,
  mode: 'indeterminate',
  size: 80,
  style: null,
  theme: 'base',
  thickness: 4,
  value: 0,
};

export default ProgressionLoaderPure;
