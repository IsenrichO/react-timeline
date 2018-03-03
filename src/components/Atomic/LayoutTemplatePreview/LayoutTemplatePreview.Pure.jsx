// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isArray, isEmpty, range, sum } from 'lodash';

type Props = {
  caption: string,
  label: string,
  theme?: string,
};

const LayoutTemplatePreviewPure = ({
  caption,
  classNames,
  handleTemplateSelection,
  label,
  templateConfig,
}: Props) => {
  const renderTemplateBlock = (config = []) => config
    .map(({ fractions, isSquare = false, weights = [1] }, index) => (
      <div
        key={`templateTableRow__${index + 1}`}
        className={classNames.templateTableRow}
      >
        {range(0, Math.max(1, fractions)).map((blockNum) => (
          <div
            key={`templateTableRow__${index + 1}__Block__${blockNum}`}
            className={classes(
              classNames.templateTableBlock,
              !!isSquare && classNames.templateTableSquareBlock,
            )}
            style={{
              width: fractions > 1
                ? `calc(${(100 / (fractions === 1 ? 1 : sum(weights))) * weights[blockNum]}% - ${((fractions - 1) * 8) / fractions}px)`
                : '100%',
            }}
          />
        ))}
      </div>
    ));

  return (
    <div
      className={classNames.layoutTemplateContainer}
      onClick={handleTemplateSelection}
      role="button"
      tabIndex={0}
    >
      <div className={classNames.layoutVisualizationContainer}>
        {isArray(templateConfig) && !isEmpty(templateConfig)
          ? renderTemplateBlock(templateConfig)
          : null
        }
      </div>
      <div className={classNames.layoutDescriptionContainer}>
        <h4 className={classNames.layoutTemplateLabel}>
          {label}
        </h4>
        <div className={classNames.layoutTemplateCaption}>
          {caption}
        </div>
      </div>
    </div>
  );
};

LayoutTemplatePreviewPure.displayName = 'LayoutTemplatePreview';

LayoutTemplatePreviewPure.propTypes = {
  caption: PropTypes.string,
  classNames: ClassNamesPropType.isRequired,
  handleTemplateSelection: PropTypes.func.isRequired,
  label: PropTypes.string,
  templateConfig: PropTypes.arrayOf(
    PropTypes.shape({
      fractions: PropTypes.number.isRequired,
      isSquare: PropTypes.bool,
      weights: PropTypes.arrayOf(
        PropTypes.number,
      ),
    }),
  ),
  theme: PropTypes.string,
};

LayoutTemplatePreviewPure.defaultProps = {
  caption: 'Layout',
  label: 'Custom layout',
  templateConfig: null,
  theme: 'base',
};

export default LayoutTemplatePreviewPure;
