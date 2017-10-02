import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isEmpty, isString } from 'lodash';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import styler, { aesthetic } from '../../../style/styler';
import { THEME_RED } from '../../../style/theming/base';

const getIconButtonStyles = ({ colors, fonts, keywords }) => ({
  backgroundColor: colors.white.primary,
  border: keywords.none,
  borderRadius: '50%',
  boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.175)',
  fontFamily: fonts.face.neue,
  fontSize: '1.7rem',
  fontStretch: 'normal',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 700,
  height: '2.5rem',
  lineHeight: 1.5,
  marginBottom: '1rem',
  textAlign: 'center',
  width: '2.5rem',
});

const TLToolbarPure = ({
  classNames,
  confirmDeleteModal,
  confirmDeletionEvt,
  // deleteEvt,
  evt,
  inverted,
  logModalData,
  theme = 'base',
  toggleModal,
}) => {
  const themeStyles = aesthetic.themes[theme];
  const buttonStyles = {
    height: '2.5rem',
    marginBottom: '2rem',
    padding: 0,
    width: '2.5rem',
    zIndex: 1,
  };

  const toolbarButtonMap = [{
    clickHandler: null,
    icon: 'remove_red_eye',
    link: `/events/edit/${evt.uuid}`,
    tooltip: 'View Event',
  }, {
    clickHandler() {
      logModalData(evt);
      toggleModal();
    },
    icon: 'mode_edit',
    link: null,
    tooltip: 'Quick Edit',
  }, {
    clickHandler: null,
    icon: 'share',
    link: null,
    tooltip: 'Share',
  }, {
    clickHandler() {
      confirmDeletionEvt(evt);
      confirmDeleteModal();
      // deleteEvt(evt);
    },
    icon: 'delete_forever',
    link: null,
    tooltip: 'Remove Event',
  }];

  const renderToolbarButtons = toolbarButtonMap.map(({ clickHandler, icon, link, tooltip }) => {
    const toolbarButton = (
      <IconButton
        iconStyle={getIconButtonStyles(themeStyles)}
        onClick={clickHandler}
        style={buttonStyles}
        tooltip={tooltip}
        tooltipPosition={`top-${!!inverted ? 'right' : 'left'}`}
        tooltipStyles={{ zIndex: 2 }}
      >
        <FontIcon
          className={classes(
            'material-icons',
            classNames.toolbarFontIcon,
          )}
          hoverColor={themeStyles.colors.white.primary}
        >
          {icon}
        </FontIcon>
      </IconButton>
    );

    return !isEmpty(link) && isString(link) ? (
      <Link
        children={toolbarButton}
        to={link}
      />) : toolbarButton;
  });

  return (
    <div
      className={classes(
        'tlToolbar',  // Creates global '.tlToolbar' class accessible inside the scoped `tlEventPanel:hover` selector
        classNames.tlToolbar,
        inverted && classNames.inverted,
      )}
    >
      {renderToolbarButtons}
    </div>
  );
};

TLToolbarPure.displayName = 'TLToolbar';

TLToolbarPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  confirmDeleteModal: PropTypes.func.isRequired,
  confirmDeletionEvt: PropTypes.func.isRequired,
  deleteEvt: PropTypes.func.isRequired,
  evt: PropTypes.object.isRequired,
  inverted: PropTypes.bool.isRequired,
  logModalData: PropTypes.func.isRequired,
  theme: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};

TLToolbarPure.defaultProps = {
  confirmDeleteModal() {},
  confirmDeletionEvt() {},
  deleteEvt() {},
  inverted: false,
  logModalData() {},
  theme: 'base',
  toggleModal() {},
};

export default TLToolbarPure;
