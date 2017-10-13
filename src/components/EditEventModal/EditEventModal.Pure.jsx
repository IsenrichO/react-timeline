import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import EventEditingModalStyles from '../../constants/json/EventEditingModalStyles.json';
import TitleBlockInput from '../InputGroups/TitleBlockInput';
import FileUploadAPI from '../partials/FileUploadApi';
import { updateSingleEvent } from '../../state/sourceEventData';
import { EventModalStateInitializer, EventModalStatePropTypes } from '../../state/eventModal';
import CloseButton from '../Atomic/CloseButton';
import GMap from '../GMap';
import EventTag from '../EventTag';

function validate(values) {
  const errors = {};

  // switch(true) {
  //   case (!values.title || !/\w/.exec(values.title)):
  //     errors.title = 'This event needs a title';
  //   default:
  //     break;
  // }

  if (!values.title || !/\w/.exec(values.title)) errors.title = 'This event needs a title';

  return errors;
};

@connect(
  ({ eventModalState, form: { EventModalForm } }) => ({
    eventModalState,
    initialValues: eventModalState.eventData,
    rdxForm: EventModalForm,
  }),
)
@reduxForm({
  form: 'EventModalForm',
  validate,
})
export default class EditEventModal extends Component {
  static propTypes = {
    eventModalState: EventModalStatePropTypes,
    toggleModal: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    eventModalState: EventModalStateInitializer,
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
        required: true,
        isRequired: true,
      },
    }, {
      icon: 'event',  // calendar
      label: 'date',  // edit-evt-date-inpt
      label: 'date',  // edit-evt-date-inpt
      element: 'input',
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
      icon: 'place',  // map-marker
      label: 'location',  // edit-evt-location-inpt
      name: 'location',   // edit-evt-location-inpt
      element: 'input', 
      class: 'form-cont',
      type: 'text',
      title: 'Include a location for this event?',
      placeholder: 'San Francisco, CA',
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
      element: 'select',
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
  }


  componentDidMount() {
    console.log('fETCH TAGS:', this.props);
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

  stageImagesForUpload(imgs) {
    // this.set
  }

  updateSingleEvent() {
    const {
      eventModalState: { eventData },
      rdxForm: { values: { name, date, location, description } },
      toggleModal,
      updateEvent,
    } = this.props; // = this.props.rdxForm.values;

    updateEvent({ ...eventData, name, date, location, description });
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
      />
    );
  }

  onKeyPress(key) {
    const tagDelimiters = [' ', ',', 'Enter'];
    // return tagDelimiters.includes(key);
  }

  reduxFormField(field, yolo = false) {
    const labelAttr = `edit-evt-${field.label}-inpt`;

    return (
      <Field
        key={`evt-modal-${field.label}-inpt`}
        label={labelAttr}
        name={field.label}
        other={{ ...field }}
        yolo={!!yolo}
        component={this.renderField}
      />
    );
  }

  renderField({ input, label: id, name, other, meta: { touched, error }, yolo = false}) {
    name = other.name;
    const { ctxAttrs, otherAttrs } = other;
    console.log('\n\nFIELD State:', 'input:', input, 'id:', id, 'name:', name, 'other:', other);

    const FormElementMap = new Map([
      ['input', (attrs) => <input { ...attrs } />],
      ['textarea', (attrs) => <textarea { ...attrs }></textarea>],
      ['select', (attrs) => <select { ...attrs }></select>]
    ]);

    const { icon, label, class: className, type, title, placeholder } = other;
    const attrs = { id, className, name, type, title, placeholder };
    const cn = `form-group ${touched && error ? 'has-danger' : ''}`;

    if (!!yolo) {
      return (
        <TitleBlockInput
          attrs={attrs}
          ctxAttrs={ctxAttrs}
          error={error}
          id={id}
          input={input}
          isRequired={otherAttrs.isRequired}
          otherAttrs={otherAttrs}
          touched={touched}
        />
      );
    }

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
  }

  render() {
    const {
      classNames,
      eventModalState: { eventData, isModalOpen },
      handleSubmit,
      pristine,
      reset,
      submitting,
      toggleModal,
    } = this.props;

    return (
      <Modal
        contentLabel="EditEventModal"
        isOpen={isModalOpen}
        style={EventEditingModalStyles}
        ref={(editEventModal) => { this.editEventModal = editEventModal; }}
      >
        <div className={classNames.modalWrapper}>
          <CloseButton
            className={classNames.closeButton}
            clickHandler={toggleModal}
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
                this.reduxFormField(this.inputFields[1]),
                this.reduxFormField(this.inputFields[2])
              ]}
              <GMap
                lat={45.5231}
                lng={122.6765}
              />
            </fieldset>

            <fieldset className={classNames.formFieldset}>
              {this.reduxFormField(this.inputFields[3])}
            </fieldset>

            <fieldset className={classNames.formFieldset}>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-tags" />
                </span>
                <label htmlFor="edit-evt-tags-inpt" />
                <select
                  id="tags-input-box"
                  className="form-cont"
                  contentEditable={ true }
                  ref={(editEvtTagsInpt) => { this.editEvtTagsInpt = editEvtTagsInpt; }}>
                </select>
              </div>
              <output>{ /* ::this.prepopulateTags([evtTags]) */ 'Just me' }</output>
            </fieldset>

            <FileUploadAPI
              evt={this.props.modalData}
              submittable={true}
              uploadToCloudinary={this.props.uploadToCloudinary}
              cloudinaryImageStore={this.props.cloudinaryImageStore}
              setNeww={this.props.setNeww}
            />

            <fieldset className={classNames.formFieldset}>
              <button
                className="form-btn"
                type="submit"
                name="updateEvtBtn"
                onClick={::this.updateSingleEvent }
                disabled={pristine || submitting}
              >
                Update Event
              </button>
              <button
                className="form-btn"
                type="button"
                name="resetFieldsBtn"
                onClick={reset}
              >
                Clear Form
              </button>
            </fieldset>
          </form>
        </div>
      </Modal>
    );
  }
};

// <i
//   className={classNames.closeButton}
//   onClick={toggleModal}
// >
//   &times;
// </i>

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
