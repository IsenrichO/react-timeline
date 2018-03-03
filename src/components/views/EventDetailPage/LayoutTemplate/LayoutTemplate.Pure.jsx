// @flow
import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import { classes }              from 'aesthetic';
import { range, sum }           from 'lodash';
import LayoutTemplateDropTarget from '../ContentToolbar/LayoutTemplateDropTarget';

type Props = {
  theme?: string,
};

export default class LayoutTemplatePure extends Component<Props> {
  static displayName = 'EDP_LayoutTemplate';

  static propTypes = {
    template: PropTypes.shape({
      caption: PropTypes.string.isRequired,
      config: PropTypes.arrayOf(
        PropTypes.shape({
          fractions: PropTypes.number.isRequired,
          isSquare: PropTypes.bool,
          weights: PropTypes.arrayOf(PropTypes.number).isRequired,
        }),
      ).isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'base',
  };

  renderTemplateBlocks() {
    const {
      classNames,
      template: { config },
    } = this.props;

    return config.map(({ fractions, isSquare = false, weights = [1] }, index) => (
      <div
        key={`templateTableRow__${index + 1}`}
        className={classNames.templateRow}
      >
        {range(0, Math.max(1, fractions)).map((blockNum) => (
          <LayoutTemplateDropTarget
            key={`templateTableRow__${index + 1}__Block__${blockNum}`}
            passedClasses={classes(
              classNames.templateBlock,
              isSquare && classNames.templateSquareBlock,
            )}
            style={{
              width: fractions > 1
                ? `calc(${(100 / (fractions === 1 ? 1 : sum(weights))) * weights[blockNum]}% - ${((fractions - 1) * 20) / fractions}px)`
                : '100%',
            }}
          />
        ))}
      </div>
    ));
  }

  render() {
    const { classNames } = this.props;

    return (
      <div className={classNames.templateContainer}>
        {this.renderTemplateBlocks()}
      </div>
    );
  }
}
