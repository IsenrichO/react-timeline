// @flow
import React                  from 'react';
import PropTypes              from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import IconButton             from 'material-ui/IconButton';
import Tooltip                from 'material-ui/Tooltip';
import CollapseMenuIcon       from 'material-ui-icons/ChevronLeft';
import ExpandMenuIcon         from 'material-ui-icons/ChevronRight';
import { aesthetic }          from '~/style/styler';

type Props = {
  isSidebarExpanded?: boolean,
  theme?: string,
};

const SidebarSettingsBarPure = ({
  classNames,
  clickHandler,
  isSidebarExpanded,
  theme,
  ...rest
}: Props) => {
  const { colors } = aesthetic.themes[theme];
  const sidebarToggleId = 'sidebar-chevron-toggle-icon';
  const toggleIconProps = {
    className: classNames.sidebarToggleIcon,
    fontSize: true,
    nativeColor: colors.white.pure,
    titleAccess: `${!!isSidebarExpanded ? 'Collapse' : 'Expand'} Icon`
  };

  return (
    <footer className={classNames.sidebarSettingsBar}>
      <Tooltip
        enterDelay={350}
        id={sidebarToggleId}
        placement="right-start"
        title={
          <span className={classNames.sidebarCloseIconTooltip}>
            {`${!!isSidebarExpanded ? 'Collapse' : 'Expand'} Menu`}
          </span>
        }
      >
        <IconButton
          aria-describedby={sidebarToggleId}
          aria-label="Sidebar Toggle"
          className={classNames.collapseSidebarButton}
          onClick={clickHandler}
        >
          {!!isSidebarExpanded
            ? (<CollapseMenuIcon {...toggleIconProps} />)
            : (<ExpandMenuIcon {...toggleIconProps} />)
          }
        </IconButton>
      </Tooltip>
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
