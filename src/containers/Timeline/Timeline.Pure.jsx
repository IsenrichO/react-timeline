// @flow
import React, { Component }                   from 'react';
import PropTypes                              from 'prop-types';
import { bindActionCreators }                 from 'redux';
import { connect }                            from 'react-redux';
import { classes, ClassNamesPropType }        from 'aesthetic';
import FontIcon                               from 'material-ui/Icon';
import update                                 from 'immutability-helper';
import { BatchActionButtons, ButtonControls } from '~/components/ButtonControls';
// import BatchActionButtons                  from '~/components/ButtonControls/BatchActionButtons';
import ConfirmDeletionPrompt                  from '~/components/partials/ConfirmDeletionPrompt';
import EditEventModal                         from '~/components/EditEventModal';
import AppBar                                 from '~/components/partials/AppBar';
// import NewEventModal                       from '~/components/N~dal';
import TimelineDialog                         from '~/components/views/TimelineDialog';
import TLEvent                                from '~/components/TLEvent';
import Utils                                  from '~/util';
import {
  BatchSelectActionCreatorPropTypes,
  BatchSelectActionCreators,
  BatchSelectStateInitializer,
  BatchSelectStatePropTypes,
}                                             from '~/state/batchSelectionItems';
import {
  CloudinaryActionCreatorPropTypes,
  CloudinaryActionCreators,
  CloudinaryStateInitializer,
  CloudinaryStatePropTypes,
}                                             from '~/state/cloudinaryImageStore';
import {
  EventModalActionCreatorPropTypes,
  EventModalActionCreators,
  EventModalStateInitializer,
  EventModalStatePropTypes,
}                                             from '~/state/eventModal';
import {
  TagsActionCreatorPropTypes,
  TagsActionCreators,
  TagsStateInitializer,
  TagsStatePropTypes,
}                                             from '~/state/tags';
import {
  SourceEventDataActionCreatorPropTypes,
  SourceEventDataActionCreators,
  SourceEventDataStateInitializer,
  SourceEventDataStatePropTypes,
}                                             from '~/state/sourceEventData';

/* FLOW TYPINGS */
type Props = {
  theme?: string,
  withOpenInterval?: boolean,
};

type State = {
  confirmModal: boolean,
  isEditEventInverted: boolean,
  newModal: boolean,
};

@connect(
  ({ batchSelectState, cloudinaryState, eventModalState, form, seedDataAggregator }) =>
    ({ batchSelectState, cloudinaryState, eventModalState, form, seedDataAggregator }),
  (dispatch) => ({
    batchSelectActions: bindActionCreators(BatchSelectActionCreators, dispatch),
    cloudinaryActions: bindActionCreators(CloudinaryActionCreators, dispatch),
    eventModalActions: bindActionCreators(EventModalActionCreators, dispatch),
    sourceEventDataActions: bindActionCreators(SourceEventDataActionCreators, dispatch),
    tagsActions: bindActionCreators(TagsActionCreators, dispatch),
  }),
)
export default class TimelinePure extends Component<Props, State> {
  static displayName = 'TimelineView';

  static propTypes = {
    batchSelectActions: BatchSelectActionCreatorPropTypes,
    batchSelectState: BatchSelectStatePropTypes,
    classNames: ClassNamesPropType.isRequired,
    cloudinaryActions: CloudinaryActionCreatorPropTypes,
    cloudinaryState: CloudinaryStatePropTypes,
    eventModalActions: EventModalActionCreatorPropTypes,
    eventModalState: EventModalStatePropTypes,
    seedData: SourceEventDataStatePropTypes,
    sourceEventDataActions: SourceEventDataActionCreatorPropTypes,
    sourceEventDataState: SourceEventDataStatePropTypes,
    tagsActions: TagsActionCreatorPropTypes,
    tagsState: TagsStatePropTypes,
    withOpenInterval: PropTypes.bool,
  };

  static defaultProps = {
    batchSelectActions: BatchSelectActionCreators,
    batchSelectState: BatchSelectStateInitializer,
    cloudinaryActions: CloudinaryActionCreators,
    cloudinaryState: CloudinaryStateInitializer,
    eventModalActions: EventModalActionCreators,
    eventModalState: EventModalStateInitializer,
    seedData: {},
    sourceEventDataActions: SourceEventDataActionCreators,
    sourceEventDataState: SourceEventDataStateInitializer,
    tagsActions: TagsActionCreators,
    tagsState: TagsStateInitializer,
    withOpenInterval: false,
  };

  constructor(props) {
    super(props);

    this.confirmDeletionEvt = ::this.confirmDeletionEvt;
    this.getMyImgs = ::this.getMyImgs;
    this.getTags = ::this.getTags;
    this.setEventInvertedState = ::this.setEventInvertedState;
    this.toggleModal = ::this.toggleModal;
    // this.toggleTimelineDialog = ::this.toggleTimelineDialog;
  }

  state = {
    confirmModal: false,
    confirmationEvt: null,
    isEditEventInverted: false,
    newModal: false,
  };

  componentDidMount() {
    const { fetchAllEventTags } = this.props.tagsActions;
    return fetchAllEventTags();
  }

  // componentDidMount() {
  //   $(window).on('scroll resize', this.checkViewAndAnimate);
  //   setTimeout(() => {
  //     window.scroll(0, 1);
  //   }, 500);
  // }

  getMyImgs(uuid) {
    const { cloudinaryState } = this.props;
    return !!cloudinaryState.hasOwnProperty(uuid) && !!cloudinaryState[uuid].images.length
      ? cloudinaryState[uuid].images
      : null;
  }

  cacheInLocalStorage = (data) => {
    for (const key in data) {
      window.localStorage.set('uuid', JSON.stringify(data[key]));
    }
  };

  toggleModal() {
    const {
      eventModalActions: { toggleEventModal },
      eventModalState: { isModalOpen },
    } = this.props;

    toggleEventModal();
    !isModalOpen
      ? $('body').addClass('modal-active')
      : $('body').removeClass('modal-active');
  }

  // An alternative class method for toggling the modal display, here wrapped in
  //  a Window timer. This could be useful as a callback for deactivating the modal
  //  while allowing said modal to undergo a CSS animation out of frame.
  toggleModalWithDelay() {
    const {
      eventModalActions: { toggleEventModal },
      eventModalState: { isModalOpen },
    } = this.props;

    setTimeout(() => {
      toggleEventModal();
      !isModalOpen
        ? $('body').addClass('modal-active')
        : $('body').removeClass('modal-active');
    }, 1200);
  }

  confirmDeletionEvt(confirmationEvt) {
    this.setState(update(this.state, {
      confirmationEvt: { $set: confirmationEvt },
    }));
  }

  getTags() {
    const { fetchAllEventTags } = this.props.tagsActions;

    return fetchAllEventTags();
  }

  renderOrderedEvents(events) {
    const {
      batchSelectActions: { addEventToBatchSelection },
      batchSelectState: { isEnabled, items },
      cloudinaryActions: { setNewBackgroundImage },
      cloudinaryState,
      eventModalActions: { logEventModalData },
      seedDataAggregator,
      sourceEventDataActions: { deleteSingleEvt, updateSingleEvent },
    } = this.props;

    // let imageStore = new Promise((resolve, reject) =>
    //   resolve(this.props.fetchAllCloudinary())
    // )
    // .then(res => {
    //   console.log('Promise res:', res);
    //   return res;
    // });

    // const imageStore = this.props.cloudinaryImageStore;
    const self = this;

    return events.map((evt, index) => {
      let attrs;
      if (cloudinaryState.hasOwnProperty(evt.uuid)) {
        attrs = { imageData: cloudinaryState[evt.uuid] || [] };
      }

      return (
        <TLEvent
          {...attrs}
          key={`TimelineEvent${evt.uuid}`}
          withAlternation
          withPointer
          withToolbar
          addEventToFavorites={() => Utils.addEventToFavorites(updateSingleEvent, evt)}
          addSelectionToBatch={(evtUuid) => addEventToBatchSelection(evtUuid)}
          cloudinaryImageStore={cloudinaryState}
          confirmDeleteModal={() => this.setState({ confirmModal: true })}
          confirmDeletionEvt={this.confirmDeletionEvt}
          deleteEvt={() => deleteSingleEvt(evt)}
          evt={evt}
          getMyImgs={self.getMyImgs}
          hasMultipleTags={Utils.hasMultipleTags(seedDataAggregator, evt.uuid)}
          index={index}
          isBatchSelectMode={isEnabled}
          isInBatch={items.includes(evt.uuid.toLowerCase())}
          logModalData={(data) => logEventModalData(data)}
          setEventInvertedState={this.setEventInvertedState}
          setNewBackgroundImage={setNewBackgroundImage}
          toggleModal={this.toggleModal}
        />
      );
    });
  }

  setEventInvertedState(isEventInverted = false) {
    return this.setState(update(this.state, {
      isEditEventInverted: { $set: isEventInverted },
    }));
  }

  cliccc(evt) {
    evt.preventDefault();

    const { uploadToCloudinary } = this.props.cloudinaryActions;
    return uploadToCloudinary(this.upldBtn.files[0], this.upldBtn.value);
  }

  checkViewAndAnimate = () => {
    // const [winHeight, winScrollTop] = [window.innerHeight, window.scrollTop];
    const [$winHeight, $winScrollTop] = [$(window).height(), $(window).scrollTop()];
    const $winBottom = ($winHeight + $winScrollTop);

    $.each($('.tl-event-panel'), function(index, el) {
      const $el = $(this);
      const [$elHeight, $elOffsetTop] = [$el.outerHeight(), $el.offset().top];
      const $elBottom = ($elHeight + $elOffsetTop);

      if (($elOffsetTop <= $winBottom) && ($elBottom >= $winScrollTop)) {
        $el.offset().top < window.innerHeight
          ? setTimeout(() => $el.addClass('in-view'), (index * 1000) + 650)
          : $el.addClass('in-view');
      }
    });
  };

  injectEditingModal() {
    const {
      cloudinaryActions: { uploadToCloudinary },
      cloudinaryState,
      eventModalState: { eventData, isModalOpen },
      sourceEventDataActions: { updateSingleEvent },
    } = this.props;
    const { isEditEventInverted } = this.state;

    return !!isModalOpen && (
      <EditEventModal
        cloudinaryImageStore={cloudinaryState}
        fetchTags={this.getTags}
        isInverted={isEditEventInverted}
        modalData={eventData}
        modalStatus={isModalOpen}
        setNeww={this.setNeww}
        toggleModal={this.toggleModal}
        updateEvent={(evtData) => updateSingleEvent(evtData)}
        uploadToCloudinary={uploadToCloudinary}
      />
    );
  }

  render() {
    const {
      batchSelectActions: { allowBatchSelection, clearBatchSelection },
      batchSelectState: { isEnabled, items },
      classNames,
      seedData,
      sourceEventDataActions: { deleteSingleEvt, deleteBatchEvents },
      withOpenInterval,
    } = this.props;
    const { confirmationEvt, confirmModal, newModal } = this.state;

    return (
      <div>
        <AppBar />
        <ul
          className={classes(
            classNames.timeline,
            !!withOpenInterval && classNames.timelineWithOpenInterval,
          )}
        >
          <li className={classNames.tlEventBeginning}>
            <FontIcon
              className={classes(
                'material-icons',
                classNames.tlMarkerBeginning,
              )}
            >
              timeline
            </FontIcon>
          </li>
          {[
            this.renderOrderedEvents(Utils.orderTimelineEvents(seedData)),
            !withOpenInterval && (
              <li
                key="timelineEndingMarker"
                className={classNames.tlEventEnd}
              >
                <FontIcon
                  className={classes(
                    'material-icons',
                    classNames.tlMarkerEnd,
                  )}
                >
                  more_vert
                </FontIcon>
              </li>
            ),
          ]}
        </ul>

        <TimelineDialog />

        {this.injectEditingModal()}
        <BatchActionButtons
          batchSelectionItems={items}
          classNames={classNames}
          clearBatchSelection={clearBatchSelection}
          deleteBatchEvents={deleteBatchEvents}
          isBatchSelectMode={isEnabled}
          toggleBatchSelection={(bool = undefined) => allowBatchSelection(bool)}
        />
        <ButtonControls
          toggleBatchSelection={(bool = undefined) => allowBatchSelection(bool)}
          toggleModal={() => this.setState({ newModal: !newModal })}
        />
        <ConfirmDeletionPrompt
          // confirmDeletionEvt={this.state.confirmDeletionEvt}
          deleteEvt={() => deleteSingleEvt(confirmationEvt)}
          disableModal={() => this.setState({ confirmModal: !confirmModal })}
          isPromptOpen={confirmModal}
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
