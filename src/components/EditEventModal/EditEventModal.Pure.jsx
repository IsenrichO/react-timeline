// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { classes, ClassNamesPropType } from 'aesthetic';
import update from 'immutability-helper';
import EventEditingModalStyles from '../../constants/json/EventEditingModalStyles.json';
import FileUploadAPI from '../partials/FileUploadApi';
import { updateSingleEvent } from '../../state/sourceEventData';
import { EventModalStateInitializer, EventModalStatePropTypes } from '../../state/eventModal';
import CloseButton from '../Atomic/CloseButton';
import FormButton from '../Atomic/FormButton';
import getInputGroup from '../InputGroups';
import GMap from '../GMap';
import EventTag from '../EventTag';

type Props = {
  isInverted?: boolean,
};

const validate = (values) => {
  const errors = {};

  // switch(true) {
  //   case (!values.title || !/\w/.exec(values.title)):
  //     errors.title = 'This event needs a title';
  //   default:
  //     break;
  // }

  if (!values.title || !(/\w/).exec(values.title)) errors.title = 'This event needs a title';

  return errors;
};

@connect(
  ({
    eventModalState,
    form: { EventModalForm },
  }) => ({
    eventModalState,
    initialValues: eventModalState.eventData,
    rdxForm: EventModalForm,
  }),
)
@reduxForm({
  form: 'EventModalForm',
  validate,
})
export default class EditEventModal extends Component<Props> {
  static displayName = 'EditEventModal';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    eventModalState: EventModalStatePropTypes,
    isInverted: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    submitting: PropTypes.bool,
    toggleModal: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    eventModalState: EventModalStateInitializer,
    isInverted: false,
    isModalOpen: false,
    submitting: false,
  };

  constructor(props) {
    super(props);

    this.coordinates = {
      portland: {
        lat: 45.5231,
        lng: -122.6765,
      },
      sydney: {
        lat: -33.8688,
        lng: 151.2093,
      },
    };

    // this.inputFields = [{
    //   element: 'INPUT',
    //   isRequired: true,
    //   label: 'Title',
    //   name: 'editEventTitleInput',
    //   placeholder: 'West Coast Roadtrip',
    //   title: 'Give this event a title',
    //   type: 'text',
    // }, {
    //   // element: '',
    //   isRequired: true,
    //   label: 'Date',
    //   name: 'editEventDateInput',
    //   placeholder: '03/15/2016',
    //   title: 'When did this event occur?',
    //   type: 'date',
    // }, {
    //   element: 'INPUT',
    //   isRequired: false,
    //   label: 'Location',
    //   placeholder: 'Portland, OR',
    //   title: 'Include a location for this event',
    //   type: 'text',
    // }, {
    //   element: 'TEXTAREA',
    //   isRequired: false,
    //   label: 'Description',
    //   placeholder: 'Record a memory or jot down some notes about this event. Here\'s your chance to wax nostalgic!',
    //   title: 'Provide event details',
    //   type: 'text',
    // }, {
    //   element: 'SELECT',
    //   isRequired: false,
    //   label: 'Tags',
    //   placeholder: 'Event tags',
    //   title: 'Include tags for categorizing this event',
    //   type: 'text',
    // }];

    this.inputFields = [{
      icon: 'title',
      label: 'name', // edit-evt-title-inpt
      name: 'name',  // edit-evt-title-inpt
      element: 'input',
      class: 'form-cont',
      type: 'text',
      title: 'Give this event a title',
      placeholder: 'West Coast Roadtrip',
      ctxAttrs: {},
      otherAttrs: {
        // ref={(editEvtTitleInpt) => { this.editEvtTitleInpt = editEvtTitleInpt; }}
        // defaultValue: 'evtName',
        isRequired: true,
      },
    }, {
      icon: 'event',  // calendar
      label: 'date',  // edit-evt-date-inpt
      label: 'date',  // edit-evt-date-inpt
      element: 'date',
      class: 'form-cont',
      type: 'date',
      title: 'When did this event occur?',
      placeholder: '03/15/2016',
      ctxAttrs: {},
      otherAttrs: {
        // ref={(editEvtDateInpt) => { this.editEvtDateInpt = editEvtDateInpt; }},
        isRequired: true,
      },
    }, {
      icon: 'pin_drop',  // map-marker
      label: 'location',  // edit-evt-location-inpt
      name: 'location',   // edit-evt-location-inpt
      element: 'geo',
      class: 'form-cont',
      type: 'text',
      title: 'Include a location for this event',
      placeholder: 'Portland, OR',
      ctxAttrs: {},
      otherAttrs: {
        // ref={(editEvtLocationInpt) => { this.editEvtLocationInpt = editEvtLocationInpt; }},
        isRequired: false,
        // defaultValue: 'evtLocation',
      },
    }, {
      icon: 'subject', // list-alt
      label: 'description', // edit-evt-description-inpt
      name: 'description',  // edit-evt-description-inpt
      element: 'textarea',
      class: 'form-cont',
      type: 'text',
      title: 'Provide details for event',
      placeholder: 'Event Description',
      ctxAttrs: { rows: 6 },
      otherAttrs: {
        // ref={(editEvtDescriptionInpt) => { this.editEvtDescriptionInpt = editEvtDescriptionInpt; }},
        isRequired: false,
        // defaultValue: 'evtDescription',
      },
    }, {
      icon: 'label', // tags
      label: 'tags',  // edit-evt-tags-inpt
      name: 'tags',   // edit-evt-tags-inpt
      element: 'tags',
      class: 'form-cont',
      type: 'text',
      title: 'Include tags for categorizing this event',
      placeholder: 'Event Tags',
      ctxAttrs: { contentEditable: true },
      otherAttrs: {
        // ref={(editEvtTagsInpt) => { this.editEvtTagsInpt = editEvtTagsInpt; }},
        isRequired: false,
      },
    }];

    this.state = {
      isClosing: false,
    };

    this.closeDrawer = ::this.closeDrawer;
    this.updateSingleEvent = ::this.updateSingleEvent;
  }


  componentDidMount() {
    // this.props.fetchTags();
  }

  componentWillReceiveProps({ eventModalState: nextEventModalState }) {
    const self = this;
    const { eventData, isModalOpen } = this.props;
    const { date: editEvtDate, isModalOpen: willModalBeOpen } = nextEventModalState.eventData;

    if ((isModalOpen !== willModalBeOpen) && willModalBeOpen) {
      setTimeout(function() {
        self.editEvtDateInpt.valueAsDate = new Date(editEvtDate);
      }, 200);
    }
  }

  constructCurrentFormattedDate() {
    const DATE = new Date();
    return `${DATE.getUTCMonth() + 1}/${DATE.getUTCDate()}/${DATE.getUTCFullYear()}`;
  }

  updateSingleEvent() {
    const {
      eventModalState: { eventData },
      rdxForm: { values: { date, description, location, name } },
      toggleModal,
      updateEvent,
    } = this.props; // = this.props.rdxForm.values;

    updateEvent({ ...eventData, date, description, location, name });
    toggleModal();
  }

  onSubmit(values) {
    console.log(`
      *****************************
      EDIT EVENT MODAL FORM DATA SUBMITTED
      *****************************
    `);
    console.log(values);
  }

  prepopulateTags(evtTags) {
    return evtTags.map((tag, index) =>
      <EventTag
        key={`EventTag_${tag}_${index}`}
        tagTitle={tag}
        index={index}
      />,
    );
  }

  onKeyPress(key) {
    const tagDelimiters = [' ', ',', 'Enter'];
    // return tagDelimiters.includes(key);
  }

  closeDrawer() {
    const { toggleModal } = this.props;

    return this.setState(update(this.state, {
      isClosing: { $set: true },
    }), () => setTimeout(toggleModal, 500));
  }

  reduxFormField(field, yolo = false) {
    const labelAttr = `edit-evt-${field.label}-inpt`;
    const { location } = this.props.eventModalState.eventData;
    const { change: rfChangeHandler } = this.props;
    // console.log('THIS.PROPS:', this.props);

    return (
      <Field
        key={`evt-modal-${field.label}-inpt`}
        changeHandler={rfChangeHandler}
        init={location}
        label={labelAttr}
        name={field.label}
        other={{ ...field }}
        yolo={!!yolo}
        component={this.renderField}
      />
    );
  }

  renderField({ changeHandler, input, init, label: id, name, other, meta, yolo = false}) {
    name = other.name;
    const { touched, error } = meta;
    const { ctxAttrs, otherAttrs } = other;
    // console.log({ input, other, meta });

    const FormElementMap = new Map([
      ['input', (attrs) => <input {...attrs} />],
      ['textarea', (attrs) => <textarea {...attrs} />],
      ['select', (attrs) => <select {...attrs} />],
    ]);

    const { icon, label, class: className, type, title, placeholder } = other;
    const attrs = { id, name, placeholder, title, type };
    const cn = `form-group ${touched && error ? 'has-danger' : ''}`;

    if (!!yolo) {
      return getInputGroup(other.element.toUpperCase())({
        changeHandler,
        error,
        id,
        init,
        input,
        touched,
      });
    }
    // <TitleBlockInput
    //   attrs={attrs}
    //   ctxAttrs={ctxAttrs}
    //   error={error}
    //   id={id}
    //   input={input}
    //   isRequired={otherAttrs.isRequired}
    //   otherAttrs={otherAttrs}
    //   touched={touched}
    // />

    return (
      <div className={`input-gr ${otherAttrs.isRequired ? 'required-field' : ''}`}>
        <span className="input-gr-addon">
          <i className="material-icons">{icon}</i>
        </span>
        <label htmlFor={id}>Label</label>
        {FormElementMap.get(other.element)({ ...attrs, ...input, ...ctxAttrs })}
        <span className="validation-msg">{touched ? error : ''}</span>
      </div>
    );

    // return (
    //   getInputGroup(other.element.toUpperCase())()
    // );
  }

  render() {
    const {
      classNames,
      eventModalState: { eventData, isModalOpen },
      handleSubmit,
      isInverted,
      pristine,
      reset,
      submitting,
      toggleModal,
    } = this.props;
    const { isClosing } = this.state;

    return (
      <div
        className={classes(
          classNames.editEventDrawer,
          classNames[`editEventDrawer${!!isInverted ? 'Left' : 'Right'}`],
          !!isClosing && classNames.editEventDrawerClose,
        )}
      >
        <div
          className={classes(
            classNames.scrollbarAlignment,
            classNames[`scrollbarAlignment${!!isInverted ? 'Left' : 'Right'}`],
          )}
        >
          <div className={classNames.modalWrapper}>
            <CloseButton
              className={classes(
                classNames.closeButton,
                classNames[`closeButtonPanel${!!isInverted ? 'Left' : 'Right'}`],
              )}
              clickHandler={this.closeDrawer} // {toggleModal}
            />
            <form
              action="/api/photos"
              className={classNames.editEventForm}
              encType="multipart/form-data"
              method="post"
              onSubmit={handleSubmit(::this.onSubmit)}
            >
              <fieldset className={classNames.formFieldset}>
                {this.reduxFormField(this.inputFields[0], true)}
              </fieldset>

              <fieldset className={classNames.formFieldset}>
                {[
                  this.reduxFormField(this.inputFields[1], true),
                  this.reduxFormField(this.inputFields[2], true),
                ]}
                <GMap
                  lat={45.5231}
                  lng={122.6765}
                />
              </fieldset>

              <fieldset className={classNames.formFieldset}>
                {this.reduxFormField(this.inputFields[3], true)}
              </fieldset>

              <fieldset className={classNames.formFieldset}>
                {this.reduxFormField(this.inputFields[4], true)}
              </fieldset>

              <FileUploadAPI
                submittable
                evt={this.props.modalData}
                uploadToCloudinary={this.props.uploadToCloudinary}
                cloudinaryImageStore={this.props.cloudinaryImageStore}
                setNeww={this.props.setNeww}
              />

              <fieldset className={classNames.formFieldset}>
                <FormButton
                  buttonText="Update Event"
                  clickHandler={this.updateSingleEvent}
                  isDisabled={pristine || submitting}
                  name="updateEventButton"
                  type="submit"
                />
                <FormButton
                  buttonText="Clear Form"
                  clickHandler={reset}
                  name="resetFieldsButton"
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// <fieldset className={classNames.formFieldset}>
//   <div className="input-gr">
//     <span className="input-gr-addon">
//       <i className="glyphicon glyphicon-tags" />
//     </span>
//     <label htmlFor="edit-evt-tags-inpt" />
//     <select
//       ref={(editEvtTagsInpt) => { this.editEvtTagsInpt = editEvtTagsInpt; }}
//       contentEditable
//       className="form-cont"
//       id="tags-input-box"
//     />
//   </div>
//   <output>{ /* ::this.prepopulateTags([evtTags]) */ 'Just me' }</output>
// </fieldset>

// <Modal
//   ref={(editEventModal) => { this.editEventModal = editEventModal; }}
//   contentLabel="EditEventModal"
//   isOpen={isModalOpen}
//   style={EventEditingModalStyles}
// >
// </Modal>

// <div className="input-gr">
//   <span className="input-gr-addon">
//     <i className="glyphicon glyphicon-list-alt" />
//   </span>
//   <label htmlFor="edit-evt-description-inpt" />
//   <textarea
//     { ...this.fieldsetProps }
//     ref={ (editEvtDescriptionInpt) => { this.editEvtDescriptionInpt = editEvtDescriptionInpt; }}
//     // defaultValue={ evtDescription }
//     />
// </div>

// ref: { (editEvtDescriptionInpt) => { this.editEvtDescriptionInpt = editEvtDescriptionInpt; }}
// defaultValue: { evtDescription }

// <form id="edit-event-form" action="/api/photos" method="post" encType="multipart/form-data">
//   <fieldset>
//     <div className="input-gr">
//       <span className="input-gr-addon">T</span>
//       <label htmlFor="edit-evt-title-inpt" />
//       <input
//         id="edit-evt-title-inpt"
//         className="form-cont"
//         type="text"
//         ref={ (editEvtTitleInpt) => { this.editEvtTitleInpt = editEvtTitleInpt; }}
//         title="Add a name for this event"
//         defaultValue={ evtName }
//         required />
//     </div>
//   </fieldset>

// <Field
//   label="edit-evt-title-inpt"
//   name="edit-evt-title-inpt"
//   component={ this.renderField } />
