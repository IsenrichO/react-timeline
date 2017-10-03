import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';

const ShowMorePure = ({
  classNames,
  linkText,
  toggleContent,
  txtLen,
}) => (txtLen >= 300) && (
  <div className={classNames.showMoreWrapper}>
    <hr className={classNames.separatorFade} />
    <div className={classNames.showMore}>
      <span className={classNames.bgLine} />
      <input
        className={classNames.contentExpansionLink}
        onClick={toggleContent}
        type="button"
        value={linkText.toLowerCase()}
      />
      <span className={classNames.bgLine} />
    </div>
  </div>
);

ShowMorePure.displayName = 'ShowMorePure';

ShowMorePure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  isExpanded: PropTypes.bool,
  linkText: PropTypes.oneOf([
    'SHOW LESS',
    'SHOW MORE',
  ]).isRequired,
  toggleContent: PropTypes.func.isRequired,
  txtLen: PropTypes.number,
};

ShowMorePure.defaultProps = {
  isExpanded: false,
  txtLen: 100,
};

export default ShowMorePure;
