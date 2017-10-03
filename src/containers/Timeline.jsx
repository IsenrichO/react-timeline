import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { classes, ClassNamesPropType } from 'aesthetic';
import BatchActionButtons, { ButtonControls } from '../components/ButtonControls';
import ConfirmDeletionModal from '../components/ConfirmDeletionModal';
import EditEventModal from '../components/EditEventModal';
import AppBar from '../components/partials/AppBar';
// import NewEventModal from '../components/NewEventModal';
import styler from '../style/styler';
import TLEvent from '../components/TLEvent';
import Utils from '../utilities/index';
import {
  addEventToBatchSelection,
  allowBatchSelection,
  clearBatchSelection,
  logEventModalData,
  setNewBckgImage,
  toggleEventModal,
} from '../actions/index';
import {
  addSingleEvent,
  deleteBatchEvents,
  deleteSingleEvt,
  fetchAllCloudinary,
  fetchAllEventTags,
  fetchCloudinaryImageData,
  updateSingleEvent,
  uploadToCloudinary,
} from '../actions/asyncActions';

@styler(({ colors }) => ({
  timeline: {
    display: 'table',
    height: '100%',
    listStyle: 'none',
    margin: ['10vh', 'auto'],
    maxWidth: 1450,
    padding: 0,
    position: 'relative',
    // top: '10vh',
    width: '75vw',

    '&:before': {
      backgroundColor: colors.white.primary,
      borderRadius: '1rem',
      bottom: '2rem',
      content: '""',
      height: 'auto',
      left: '50%',
      marginLeft: -2.5,
      position: 'absolute',
      top: '2rem',
      width: 5,
      webkitFilter: `drop-shadow(0 0 7.5px ${colors.grey.medium})`,
      filter:       `drop-shadow(0 0 7.5px ${colors.grey.medium})`,
    },
  },
  tlEventBeginning: {
    display: 'table-header-group',
    font: {
      family: '"Material Icons", sans serif',
      lineHeight: 1,
      size: '3rem',
      stretch: 'normal',
      style: 'normal',
      variant: 'normal',
      weight: 'bold',
    },
    marginBottom: 0,
    textAlign: 'center',
    width: '100%',
  },
  tlEventEnd: {
    display: 'table-footer-group',
    font: {
      family: '"Material Icons", sans serif',
      lineHeight: 1,
      size: '3rem',
      stretch: 'normal',
      style: 'normal',
      variant: 'normal',
      weight: 'bold',
    },
    marginBottom: 0,
    textAlign: 'center',
    width: '100%',
  },
  tlMarkerBeginning: {
    backgroundColor: colors.white.background,
    border: {
      color: colors.white.background,
      radius: '50%',
      style: 'solid',
      width: 2,
    },
    boxShadow: {
      blur: 8,
      color: colors.black.backgroundSemiOp,
      inset: null,
      spread: null,
      x: 0,
      y: 0,
    },
    font: 'inherit',
    marginBottom: '10vh',
    padding: '0.5rem',
    position: 'relative',
    top: 0,
  },
  tlMarkerEnd: {
    backgroundColor: colors.white.background,
    border: {
      color: colors.white.background,
      radius: '50%',
      style: 'solid',
      width: 2,
    },
    boxShadow: {
      blur: 8,
      color: colors.black.backgroundSemiOp,
      inset: null,
      spread: null,
      x: 0,
      y: 0,
    },
    font: 'inherit',
    padding: '0.5rem',
    position: 'relative',
    top: 0,
  },
}))
@connect(
  ({
    seedDataAggregator,
    eventEditingModalData, eventEditingModalState,
    batchSelectionState, batchSelectionItems,
    cloudinaryImageStore,
    form,
  }) => ({
    batchSelectionItems,
    batchSelectionState,
    cloudinaryImageStore,
    eventEditingModalData,
    eventEditingModalState,
    form,
    seedDataAggregator,
  }),
  (dispatch) => bindActionCreators({
    addEventToBatchSelection,
    addSingleEvent,
    allowBatchSelection,
    clearBatchSelection,
    deleteBatchEvents,
    deleteSingleEvt,
    fetchAllCloudinary,
    fetchAllEventTags,
    fetchCloudinaryImageData,
    logEventModalData,
    setNewBckgImage,
    toggleEventModal,
    updateSingleEvent,
    uploadToCloudinary,
  }, dispatch),
)
export default class Timeline extends Component {
  static displayName = 'Timeline';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    seedData: PropTypes.array.isRequired,
  };

  static defaultProps = {
    seedData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      confirmModal: false,
      confirmationEvt: null,
      newModal: false,
    };
  }

  componentDidMount() {
    // $(window).on('scroll resize', this.checkViewAndAnimate);
    // setTimeout(() => {
    //   window.scroll(0, 1);
    // }, 500);
  }

  getMyImgs(uuid) {
    const imgStore = this.props.cloudinaryImageStore;
    return !!imgStore.hasOwnProperty(uuid) && !!imgStore[uuid].images.length
      ? imgStore[uuid].images
      : null;
  }

  checkViewAndAnimate() {
    const [$winHeight, $winScrollTop] = [$(window).height(), $(window).scrollTop()],
          $winBottom = ($winHeight + $winScrollTop);

    $.each($('.tl-event-panel'), function(index, el) {
      const $el = $(this),
            [$elHeight, $elOffsetTop] = [$el.outerHeight(), $el.offset().top],
            $elBottom = ($elHeight + $elOffsetTop);

      if (($elOffsetTop <= $winBottom) && ($elBottom >= $winScrollTop)) {
        $el.offset().top < window.innerHeight
          ? setTimeout(() => $el.addClass('in-view'), (index * 1000) + 650)
          : $el.addClass('in-view');
      }
    });
  }

  cacheInLocalStorage(data) {
    for (let key in data) {
      window.localStorage.set('uuid', JSON.stringify(data[key]));
    }
  }

  toggleModal() {
    this.props.toggleEventModal();
    !this.props.eventEditingModalState
      ? $('body').addClass('modal-active')
      : $('body').removeClass('modal-active');
  }

  // An alternative class method for toggling the modal display, here wrapped in
  //  a Window timer. This could be useful as a callback for deactivating the modal
  //  while allowing said modal to undergo a CSS animation out of frame.
  toggleModalWithDelay() {
    setTimeout(() => {
      this.props.toggleEventModal();
      !this.props.eventEditingModalState
        ? $('body').addClass('modal-active')
        : $('body').removeClass('modal-active');
    }, 1200);
  }

  confirmDeletionEvt(confirmationEvt) {
    this.setState({ confirmationEvt });
  }

  getTags() {
    this.props.fetchAllEventTags();
  }

  renderOrderedEvents(events) {
    // let imageStore = new Promise((resolve, reject) =>
    //   resolve(this.props.fetchAllCloudinary())
    // )
    // .then(res => {
    //   console.log('Promise res:', res);
    //   return res;
    // });
    const imageStore = this.props.cloudinaryImageStore;
    const self = this;
    console.log('STORE OF IMAGESSSSS:', imageStore);
    return events.map((evt, index) => {
      let attrs;
      if (imageStore.hasOwnProperty(evt.uuid)) {
        attrs = { imageData: imageStore[evt.uuid] || [] };
      }
      // console.log('IMAGE STORE:', imageStore);

      return (
        <TLEvent
          {...attrs}
          addEventToFavorites={() => Utils.addEventToFavorites(this.props.updateSingleEvent, evt)}
          addSelectionToBatch={(evtUuid) => this.props.addEventToBatchSelection(evtUuid)}
          batchSelectionState={this.props.batchSelectionState}
          cloudinaryImageStore={this.props.cloudinaryImageStore}
          confirmDeleteModal={() => this.setState({ confirmModal: true })}
          confirmDeletionEvt={::this.confirmDeletionEvt}
          deleteEvt={() => this.props.deleteSingleEvt(evt)}
          evt={{...evt}}
          evtAlign={new Array('', 'Invert')[index % 2]}
          getMyImgs={::self.getMyImgs}
          getStarGlyphClass={Utils.getStarGlyphClass(this.props.seedDataAggregator, evt.uuid)}
          hasMultipleTags={Utils.hasMultipleTags(this.props.seedDataAggregator, evt.uuid)}
          index={index}
          isInBatch={this.props.batchSelectionItems.includes(evt.uuid)}
          isInverted={index % 2 ? true : false}
          key={`Evt_${evt.name}_${index}`}
          logModalData={(data) => this.props.logEventModalData(data)}
          toggleModal={::this.toggleModal}
        />
      );
    });
  }

  cliccc(evt) {
    evt.preventDefault();
    return this.props.uploadToCloudinary(this.upldBtn.files[0], this.upldBtn.value);
  }

  setNeww = (imgUrl) => this.props.setNewBckgImage(imgUrl);

  injectEditingModal() {
    if (this.props.eventEditingModalState) {
      return (
        <EditEventModal
          cloudinaryImageStore={this.props.cloudinaryImageStore}
          fetchTags={::this.getTags}
          modalData={this.props.eventEditingModalData}
          modalStatus={this.props.eventEditingModalState}
          setNeww={::this.setNeww}
          toggleModal={::this.toggleModal}
          updEvt={(evtData) => this.props.updateSingleEvent(evtData)}
          uploadToCloudinary={this.props.uploadToCloudinary}
        />
      );
    }
  }

  render() {
    const { classNames } = this.props;

    return (
      <div>
        <AppBar />
        <ul className={classNames.timeline}>
          <li className={classNames.tlEventBeginning}>
            <i
              className={classes(
                'material-icons',
                classNames.tlMarkerBeginning,
              )}
            >
              timeline
            </i>
          </li>
          {::this.renderOrderedEvents(Utils.orderTimelineEvents(this.props.seedData))}
          <li className={classNames.tlEventEnd}>
            <i
              className={classes(
                'material-icons',
                classNames.tlMarkerEnd,
              )}
            >
              more_vert
            </i>
          </li>
        </ul>

        {this.injectEditingModal()}
        <BatchActionButtons
          batchSelectionState={this.props.batchSelectionState}
          batchSelectionItems={this.props.batchSelectionItems}
          toggleBatchSelection={(bool = undefined) => this.props.allowBatchSelection(bool)}
          deleteBatchEvents={this.props.deleteBatchEvents}
          clearBatchSelection={this.props.clearBatchSelection}
        />
        <ButtonControls
          toggleModal={() => this.setState({ newModal: !this.state.newModal })}
          toggleBatchSelection={(bool = undefined) => this.props.allowBatchSelection(bool)}
        />
        <ConfirmDeletionModal
          modalStatus={this.state.confirmModal}
          disableModal={() => this.setState({ confirmModal: !this.state.confirmModal })}
          // confirmDeletionEvt={this.state.confirmDeletionEvt}
          deleteEvt={() => this.props.deleteSingleEvt(this.state.confirmationEvt)}
        />
      </div>
    );
  }
}

/*
<EditEventModal
  modalData={ this.props.eventEditingModalData }
  modalStatus={ this.props.eventEditingModalState }
  toggleModal={ ::this.toggleModal }
  updEvt={ (evtData) => this.props.updateSingleEvent(evtData) }
  uploadToCloudinary={ this.props.uploadToCloudinary }
  cloudinaryImageStore={ this.props.cloudinaryImageStore }
  fetchTags={ ::this.getTags }
  setNeww={ ::this.setNeww } />

<NewEventModal
  modalStatus={ this.state.newModal }
  toggleModal={ () => this.setState({ newModal: !this.state.newModal }) }
  addSingleEvent={ (evtData) => this.props.addSingleEvent(evtData) }
  uploadToCloudinary={ this.props.uploadToCloudinary } /> 
*/
