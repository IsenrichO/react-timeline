import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';

const NumericSignifierPure = ({ classNames, numeral }) => (
  <div className={classNames.numericSignifierContainer}>
    {Number.parseInt(numeral, 10) || 1}
  </div>
);

NumericSignifierPure.displayName = 'NumericSignifier';

NumericSignifierPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  numeral: PropTypes.number,
};

NumericSignifierPure.defaultProps = {
  numeral: 1,
};

export default NumericSignifierPure;
