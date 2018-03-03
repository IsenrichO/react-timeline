// @flow
import React                 from 'react';
import PropTypes             from 'prop-types';
import { generateShareIcon } from 'react-share';
import { aesthetic }         from '~/style/styler';

type Props = {
  theme?: string,
};

const FacebookIcon = generateShareIcon('facebook');

const FacebookShareablePure = ({
  theme,
}: Props) => {
  const { colors } = aesthetic.themes[theme];

  return (
    <FacebookIcon
      round
      size={32}
      iconBgStyle={{
        fill: colors.red.primary,
      }}
      logoFillColor={colors.white.primary}
    />
  );
};

FacebookShareablePure.displayName = 'FacebookShareablePure';

FacebookShareablePure.propTypes = {
  theme: PropTypes.string,
};

FacebookShareablePure.defaultProps = {
  theme: 'base',
};

export default FacebookShareablePure;
