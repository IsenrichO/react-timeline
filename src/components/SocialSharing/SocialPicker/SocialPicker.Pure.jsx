// @flow
import React, { cloneElement, Component }  from 'react';
import PropTypes                           from 'prop-types';
import { ClassNamesPropType }              from 'aesthetic';
import update                              from 'immutability-helper';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
}                                          from 'material-ui/Dialog';
import Button                              from 'material-ui/Button';
import SlideTransition                     from 'material-ui/transitions/Slide';
import { isString }                        from 'lodash';
import SocialShareComponent                from '../ShareComponent';
import { order as socialShareRenderOrder } from '~/constants/json/SocialMedia.json';
import { toPartitions }                    from '~/util/functional';
import { childrenPropTypes }               from '~/util/TypeChecking';

type Props = {
  theme?: string,
};

const Transition = (props) => (
  <SlideTransition
    {...props}
    direction="up"
  />
);

export default class SocialPickerPure extends Component<Props> {
  static displayName = 'SocialPickerPure';

  static propTypes = {
    children: childrenPropTypes,
    classNames: ClassNamesPropType,
    theme: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    classNames: {},
    theme: 'base',
  };

  constructor(props) {
    super(props);

    this.toggleDisplayState = ::this.toggleDisplayState;
    this.handleOpen = this.toggleDisplayState();
    this.handleClose = this.toggleDisplayState(false);
  }

  state = {
    isOpen: false,
    isShowingMore: false,
  };

  toggleDisplayState = (shouldOpen = true) => () =>
    this.setState(update(this.state, {
      isOpen: { $set: !!shouldOpen },
    }));

  toggleSocialShareVisibility = () =>
    this.setState(update(this.state, {
      $toggle: ['isShowingMore'],
    }));

  renderShareMediaRow(mediaList = [], rowKey = 'Primary') {
    const { classNames } = this.props;

    return (
      <div
        key={`ShareMediaRow__${isString(rowKey) ? `${rowKey}Row` : `SecondaryRow${rowKey}`}`}
        className={classNames.socialShareRow}
      >
        {mediaList.map((medium) => (
          <SocialShareComponent
            key={`SocialShareComponent__${medium}`}
            socialMedium={medium}
            url={window.location.href}
          />
        ))}
      </div>
    );
  }

  render() {
    const { children, classNames } = this.props;
    const { isOpen, isShowingMore } = this.state;

    const [primaryShareMedia, ...secondaryShareMedia] = toPartitions(socialShareRenderOrder, 4);

    return (
      <div>
        {cloneElement(children, {
          onClick: this.handleOpen,
        })}
        <Dialog
          fullWidth
          aria-describedby="social-share-dialog-description"
          aria-labelledby="social-share-dialog-title"
          className={classNames.socialShareDialogContainer}
          maxWidth="sm"
          open={!!isOpen}
          PaperProps={{ elevation: 4 }}
          transition={Transition}
          // bodyClassName={classNames.socialShareDialogBody}
          // onRequestClose={this.handleClose}
        >
          <DialogTitle
            className={classNames.socialShareDialogTitle}
            id="social-share-dialog-title"
          >
            Share Event
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="social-share-dialog-description">
              Share your event with your friends and family on the mediums you prefer!
            </DialogContentText>
            {[
              this.renderShareMediaRow(primaryShareMedia),
              !!isShowingMore && secondaryShareMedia
                .map((mediaList, index) => this.renderShareMediaRow(mediaList, index)),
            ]}
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={this.toggleSocialShareVisibility}
            >
              {`Show ${!!isShowingMore ? 'Less' : 'More'}`}
            </Button>
            <Button
              color="primary"
              onClick={this.handleClose}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// <div
//   className={classNames.showMoreToggle}
//   onClick={this.toggleSocialShareVisibility}
//   role="button"
//   tabIndex={0}
// >
//   {range(3).map((item, index) => (
//     <span
//       key={`showMoreToggleDot__${index + 1}`}
//       className={classNames.showMoreToggleDot}
//     >
//       &middot;
//     </span>
//   ))}
// </div>
