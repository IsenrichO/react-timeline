// @flow
import React                             from 'react';
import PropTypes                         from 'prop-types';
import { Link }                          from 'react-router-dom';
import { classes, ClassNamesPropType }   from 'aesthetic';
import { isEmpty, isFunction, isString } from 'lodash';
import Icon                              from 'material-ui/Icon';
import IconButton                        from 'material-ui/IconButton';
import Tooltip                           from 'material-ui/Tooltip';
import SocialPicker                      from '../../SocialSharing/SocialPicker';
import { aesthetic }                     from '~/style/styler';
import { keyFormatter }                  from '~/util/ComponentHelpers';
import { tlEventPropTypes }              from '~/util/TypeChecking';

type Props = {
  isInverted?: boolean,
  theme?: string,
};

const TLToolbarPure = ({
  classNames,
  confirmDeleteModal,
  confirmDeletionEvt,
  // deleteEvt,
  evt,
  isInverted,
  logModalData,
  setEventInvertedState,
  theme = 'base',
  toggleModal,
}: Props) => {
  const themeStyles = aesthetic.themes[theme];

  const toolbarButtonMap = [{
    clickHandler: null,
    icon: 'remove_red_eye',
    link: `/events/edit/${evt.uuid}`,
    tooltip: 'View Event',
    wrapper: null,
  }, {
    clickHandler() {
      logModalData(evt);
      setEventInvertedState(!!isInverted);
      toggleModal();
    },
    icon: 'mode_edit',
    link: null,
    tooltip: 'Quick Edit',
    wrapper: null,
  }, {
    clickHandler: null,
    icon: 'share',
    link: null,
    tooltip: 'Share',
    wrapper: SocialPicker,
  }, {
    clickHandler() {
      confirmDeletionEvt(evt);
      confirmDeleteModal();
      // deleteEvt(evt);
    },
    icon: 'delete_forever',
    link: null,
    tooltip: 'Remove Event',
    wrapper: null,
  }];

  const renderToolbarButtons = toolbarButtonMap
    .map(({ clickHandler, icon, link, tooltip, wrapper: Wrapper }) => {
      const toolbarButton = (
        <Tooltip
          key={keyFormatter(tooltip, 'tooltip')}
          classes={{
            tooltipOpen: classNames.tlToolbarTooltipNoWrap,
          }}
          className={classNames.tlToolbarTooltip}
          id={`toolbar-button-${icon}-tooltip`}
          placement={!!isInverted
            ? 'top-start'
            : 'top-end'
          }
          title={tooltip}
        >
          <IconButton
            className={classNames.tlToolbarIconButton}
            onClick={isFunction(clickHandler)
              ? clickHandler
              : Function.prototype
            }
          >
            <Icon
              className={classes(
                'material-icons',
                classNames.toolbarFontIcon,
              )}
            >
              {icon}
            </Icon>
          </IconButton>
        </Tooltip>
      );

      return !isEmpty(link) && isString(link) ? (
        <Link
          children={toolbarButton}
          key={Math.random()}
          to={link}
        />
      ) : !isEmpty(Wrapper) ? (
        <Wrapper key={Math.random()}>
          {toolbarButton}
        </Wrapper>
      ) : toolbarButton;
    });

  return (
    <div
      className={classes(
        'tlToolbar', // Creates global '.tlToolbar' class accessible inside the scoped `tlEventPanel:hover` selector
        classNames.tlToolbar,
        !!isInverted && classNames.inverted,
      )}
    >
      {renderToolbarButtons}
    </div>
  );
};

TLToolbarPure.displayName = 'TimelineEventToolbar';

TLToolbarPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  confirmDeleteModal: PropTypes.func.isRequired,
  confirmDeletionEvt: PropTypes.func.isRequired,
  deleteEvt: PropTypes.func.isRequired,
  evt: tlEventPropTypes.isRequired,
  isInverted: PropTypes.bool,
  logModalData: PropTypes.func.isRequired,
  setEventInvertedState: PropTypes.func.isRequired,
  theme: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};

TLToolbarPure.defaultProps = {
  deleteEvt() {},
  isInverted: false,
  theme: 'base',
};

export default TLToolbarPure;
