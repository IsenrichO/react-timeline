// @flow
import React     from 'react';
import PropTypes from 'prop-types';
import Fade      from 'material-ui/transitions/Fade';
import Grow      from 'material-ui/transitions/Grow';
import Slide     from 'material-ui/transitions/Slide';

/* FLOW TYPINGS */
type Props = {
  direction?: string,
  in?: boolean,
  timeout?: number,
};

const TransitionPure = ({
  type: TransitionType,
  ...rest
}: Props) => (
  <TransitionType {...rest} />
);

TransitionPure.displayName = 'MaterialTransition';

TransitionPure.propTypes = {
  direction: PropTypes.oneOf([
    'down',
    'left',
    'right',
    'up',
  ]),
  in: PropTypes.bool,
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  type: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([
      Fade,
      Grow,
      Slide,
    ]),
  ]),
};

TransitionPure.defaultProps = {
  direction: 'up',
  in: null,
  timeout: {
    enter: 3750,
    exit: 250,
  },
  type: Slide,
};

export default TransitionPure;
