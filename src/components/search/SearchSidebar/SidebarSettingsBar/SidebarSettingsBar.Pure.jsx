import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import CollapseMenuIcon from 'material-ui/svg-icons/navigation/chevron-left';
import ExpandMenuIcon from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';
import { aesthetic } from '../../../../style/styler';

const SidebarSettingsBarPure = ({ classNames, clickHandler, isSidebarExpanded, theme, ...props }) => {
  const { colors: baseThemeColors } = aesthetic.themes[theme];

  return (
    <footer className={classNames.sidebarSettingsBar}>
      <IconButton
        className={classNames.collapseSidebarButton}
        iconStyle={{
          fill: baseThemeColors.white.pure,
          height: 48,
          width: 48,
        }}
        onClick={clickHandler}
        style={{
          height: 64,
          padding: 8,
          width: 64,
        }}
        tooltip={
          <span className={classNames.sidebarCloseIconTooltip}>
            {`${!!isSidebarExpanded ? 'Collapse' : 'Expand'} Menu`}
          </span>
        }
        tooltipPosition="top-right"
        tooltipStyles={{
          left: '100%',
          transform: 'translateY(50%)',
          zIndex: 30,
        }}
      >
        {!!isSidebarExpanded
          ? (<CollapseMenuIcon />)
          : (<ExpandMenuIcon />)
        }
      </IconButton>
    </footer>
  );
};

SidebarSettingsBarPure.displayName = 'SidebarSettingsBar';

SidebarSettingsBarPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  clickHandler: PropTypes.func.isRequired,
  isSidebarExpanded: PropTypes.bool,
  theme: PropTypes.string,
};

SidebarSettingsBarPure.defaultProps = {
  isSidebarExpanded: true,
  theme: 'base',
};

export default SidebarSettingsBarPure;
