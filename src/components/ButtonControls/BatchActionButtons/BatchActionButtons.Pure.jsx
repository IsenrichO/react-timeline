import React                           from 'react';
import PropTypes                       from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import FontIcon                        from 'material-ui/Icon';
import IconButton                      from 'material-ui/IconButton';
import size                            from 'lodash/size';
import { aesthetic }                   from '~/style/styler';

const BatchActionButtonsPure = ({ classNames, isBatchSelectMode, theme, ...rest }) => {
  const { keywords: themeKeywords } = aesthetic.themes[theme || 'base'];

  const buttonsMap = [{
    action(props) {
      props.toggleBatchSelection();
      props.clearBatchSelection();
    },
    glyph: 'cancel',
    name: 'cancel-action',
    tooltip: 'Cancel Action',
  }, {
    action(props) {
      return props.deleteBatchEvents(props.batchSelectionItems);
    },
    glyph: 'delete_sweep',
    name: 'batch-delete',
    tooltip: 'Delete Items',
  }];

  const renderBatchActionButtons = buttonsMap.map(({ action, glyph, name, tooltip }, index) => (
    <IconButton
      key={`batchActionBtn_${name}`}
      className={classes(
        classNames.batchActionButton,
        !!isBatchSelectMode && classNames.batchActionButtonActive,
      )}
      disabled={(name === 'batch-delete') && !size(rest.batchSelectionItems)}
      onClick={() => action(rest)}
    >
      <FontIcon
        className={classes(
          'material-icons',
          classNames.batchActionButtonIcon,
        )}
        color={themeKeywords.inherit}
      >
        {glyph}
      </FontIcon>
    </IconButton>
  ));

  return !!isBatchSelectMode
    ? (<div>{renderBatchActionButtons}</div>)
    : null;
};

BatchActionButtonsPure.displayName = 'BatchActionButtons';

BatchActionButtonsPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  isBatchSelectMode: PropTypes.bool,
  theme: PropTypes.string,
};

BatchActionButtonsPure.defaultProps = {
  isBatchSelectMode: false,
  theme: 'base',
};

export default BatchActionButtonsPure;
