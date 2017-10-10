import React from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import FontIcon from 'material-ui/FontIcon';
import { aesthetic } from '../../../style/styler';

const TitleBlockInputPure = ({ attrs, classNames, ctxAttrs, error, id, input, isRequired, otherAttrs, theme = 'base', touched }) => (
  <div
    className={classes(
      classNames.inputGroup,
      !!isRequired && classNames.requiredField,
    )}
  >
    <span className={classNames.inputGroupAddon}>
      <FontIcon
        className={classes(
          'material-icons',
          classNames.titleBlockInputIcon,
        )}
        color={aesthetic.themes[theme].colors.red.primary}
      >
        title
      </FontIcon>
    </span>
    <label
      className={classNames.inputGroupLabel}
      htmlFor={id}
    >
      Label
    </label>
    <input
      contentEditable
      className={classes(
        'form-cont',
      )}
      id={id}
      name="name"
      placeholder="West Coast roadtrip"
      title={`Give this event a title${!!isRequired ? ' (REQUIRED)' : ''}`}
      type="text"
    />
    <span className={classNames.validationMessage}>{touched ? error : ''}</span>
  </div>
);

TitleBlockInputPure.displayName = 'TitleBlockInput';

TitleBlockInputPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  ctxAttrs: PropTypes.shape({
    rows: PropTypes.number,
  }),
  isRequired: PropTypes.bool,
  otherAttrs: PropTypes.shape({
    isRequiredField: PropTypes.bool,
  }),
};

TitleBlockInputPure.defaultProps = {
  ctxAttrs: null,
  isRequired: false,
  otherAttrs: {
    isRequiredField: false,
  },
};

export default TitleBlockInputPure;
