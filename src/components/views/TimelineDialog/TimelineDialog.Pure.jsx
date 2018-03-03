// @flow
import React, { Component, Fragment }  from 'react';
import PropTypes                       from 'prop-types';
import { cx }                          from 'emotion';
import AppBar                          from 'material-ui/AppBar';
import Button                          from 'material-ui/Button';
import Dialog                          from 'material-ui/Dialog';
import IconButton                      from 'material-ui/IconButton';
import Toolbar                         from 'material-ui/Toolbar';
import CloseIcon                       from 'material-ui-icons/Close';
import FontAwesome                     from '@fortawesome/react-fontawesome';
import update                          from 'immutability-helper';
import Transition                      from '~/components/Material/Transition';
import { aesthetic }                   from '~/style/styler';
import { FixedBar, StyledDialogTitle } from './TimelineDialog.Styled';

/* FLOW TYPINGS */
type Props = {
  isOpen?: boolean,
  theme?: string,
};

type State = {
  isOpen: boolean,
};

export default class TimelineDialogPure extends Component<Props, State> {
  static displayName = 'FullScreenTimelineDialog';

  static propTypes = {
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const { theme } = props;

    this.handleDialogClose = ::this.toggleTimelineDialog(false);
    this.handleDialogOpen = ::this.toggleTimelineDialog(true);
    this.theme = aesthetic.themes[theme];
  }

  state = {
    isOpen: false,
  };

  toggleTimelineDialog = (open = true) => (evt) => this.setState(update(this.state, {
    isOpen: { $set: !!open },
  }));

  render() {
    const { classes } = this.props;
    const { isOpen } = this.state;
    const { colors } = this.theme;

    const dialogTitleId = 'resource-viewer-dialog-title';

    return (
      <Fragment>
        <FixedBar className="bottomBar">
          <Button>
            <FontAwesome
              className={cx('fullscreen-reveal-icon')}
              color={colors.red.primary}
              icon="angle-double-up"
              onClick={this.handleDialogOpen}
              size="4x"
            />
          </Button>
        </FixedBar>
        <Dialog
          fullScreen
          fullWidth
          aria-labelledby={dialogTitleId}
          onClose={this.handleDialogClose}
          open={isOpen}
          transition={Transition}
          transitionDuration={{
            enter: 750,
            exit: 350,
          }}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                aria-label="Close"
                color="inherit"
                onClick={this.handleDialogClose}
              >
                <CloseIcon />
              </IconButton>
              <StyledDialogTitle
                className={classes.dialogTitle}
                id={dialogTitleId}
                theme={this.theme}
                title="History Viewer"
              />
            </Toolbar>
          </AppBar>
        </Dialog>
      </Fragment>
    );
  }
}
