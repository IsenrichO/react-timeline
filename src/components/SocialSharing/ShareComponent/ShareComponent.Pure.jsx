// @flow
import React                           from 'react';
import PropTypes                       from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import isNil                           from 'lodash/isNil';
import SocialShareMap                  from './socialShareData';
import { aesthetic }                   from '~/style/styler';

type Props = {
  socialMedium: string,
  theme?: string,
  url?: string,
};

const SocialShareComponentPure = ({
  classNames,
  socialMedium,
  theme,
  url,
}: Props) => {
  const { colors } = aesthetic.themes[theme];
  const {
    button: ShareButton,
    count: ShareCount = null,
    icon: SocialIcon,
    label: { formatted: formattedLabel },
    props: socialProps,
  } = SocialShareMap.get(socialMedium);

  return (
    <div
      className={classNames.socialShareItem}
      title={`Share to ${formattedLabel}`}
    >
      <ShareButton
        {...socialProps}
        className={classes(
          'social-share', // Globally-targetable className
          classNames.socialShareButton,
          classNames[`socialShare${socialMedium}`],
        )}
        url={url}
      >
        <SocialIcon
          round
          size={64}
          iconBgStyle={{
            fill: colors.red.primary,
          }}
          logoFillColor={colors.white.primary}
        />
      </ShareButton>

      {!isNil(ShareCount) && (
        <ShareCount
          className={classNames.socialShareCountWrapper}
          url={url}
        >
          {(shareCount) => (
            <span className={classNames.socialShareCount}>{shareCount}</span>
          )}
        </ShareCount>
      )}
    </div>
  );
};

SocialShareComponentPure.displayName = 'SocialShareComponentPure';

SocialShareComponentPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  socialMedium: PropTypes.string.isRequired,
  theme: PropTypes.string,
  url: PropTypes.string,
};

SocialShareComponentPure.defaultProps = {
  theme: 'base',
  url: 'https://www.google.com',
};

export default SocialShareComponentPure;
