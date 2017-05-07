'use strict';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import EventEditingModalStyles from '../constants/json/EventEditingModalStyles.json';
import FileUploadAPI from './FileUploadAPI';
import { updateSingleEvent } from '../actions/asyncActions';

import GMap from './GMap';
import EventTag from './EventTag';


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
  state => ({
    eventEditingModalData: state.eventEditingModalData,
    eventEditingModalState: state.eventEditingModalState,
    initialValues: state.eventEditingModalData,
  })
)
@reduxForm({
  validate,
  form: 'EditEventModalForm',
})
export default class EditEventModal extends Component {
  constructor(props) {
    super(props);
    this.fieldsetProps = {
      id: 'edit-evt-description-inpt',
      className: 'form-cont',
      placeholder: 'Event description',
      rows: '6'
    };

    this.inputFields = [
      {
        icon: 'title',
        label: 'name', // edit-evt-title-inpt
        name: 'name',  // edit-evt-title-inpt
        element: 'input',
        class: 'form-cont',
        type: 'text',
        title: 'Give this event a title',
        placeholder: 'West Coast Roadtrip',
        otherAttrs: {
          // ref={ (editEvtTitleInpt) => { this.editEvtTitleInpt = editEvtTitleInpt; }}
          // defaultValue: 'evtName',
          required: true,
          isRequiredField: true
        }
      }, {
        icon: 'event',  // calendar
        label: 'date',  // edit-evt-date-inpt
        label: 'date',  // edit-evt-date-inpt
        element: 'input',
        class: 'form-cont',
        type: 'date',
        title: 'When did this event occur?',
        placeholder: '03/15/2016',
        otherAttrs: {
          // ref={ (editEvtDateInpt) => { this.editEvtDateInpt = editEvtDateInpt; }},
          isRequiredField: true,
        }
      }, {
        icon: 'place',  // map-marker
        label: 'location',  // edit-evt-location-inpt
        name: 'location',   // edit-evt-location-inpt
        element: 'input', 
        class: 'form-cont',
        type: 'text',
        title: 'Include a location for this event?',
        placeholder: 'San Francisco, CA',
        otherAttrs: {
          // ref={ (editEvtLocationInpt) => { this.editEvtLocationInpt = editEvtLocationInpt; }},
          isRequiredField: false,
          // defaultValue: 'evtLocation',
        }
      }, {
        icon: 'subject', // list-alt
        label: 'description', // edit-evt-description-inpt
        name: 'description',  // edit-evt-description-inpt
        element: 'textarea',
        class: 'form-cont',
        type: 'text',
        title: 'Provide details for event',
        placeholder: 'Event Description',
        otherAttrs: {
          // ref={ (editEvtDescriptionInpt) => { this.editEvtDescriptionInpt = editEvtDescriptionInpt; }},
          isRequiredField: false,
          // defaultValue: 'evtDescription',
          rows: 6,
        }
      }, {
        icon: 'label', // tags
        label: 'tags',  // edit-evt-tags-inpt
        name: 'tags',   // edit-evt-tags-inpt
        element: 'select',
        class: 'form-cont',
        type: 'text',
        title: 'Include tags for categorizing this event',
        placeholder: 'Event Tags',
        otherAttrs: {
          // ref={ (editEvtTagsInpt) => { this.editEvtTagsInpt = editEvtTagsInpt; }},
          isRequiredField: false,
          contentEditable: true,
        }
      }
    ];
  }

  static propTypes = {
    modalData: PropTypes.object,
    modalStatus: PropTypes.bool,
    toggleModal: PropTypes.func
  };

  componentDidMount() {
    console.log('fETCH TAGS:', this.props);
    // this.props.fetchTags();
  }

  constructCurrentFormattedDate() {
    const DATE = new Date();
    return `${DATE.getUTCMonth() + 1}/${DATE.getUTCDate()}/${DATE.getUTCFullYear()}`;
  }

  stageImagesForUpload(imgs) {
    // this.set
  }

  updateSingleEvent(name, date, location, description) {
    const updatedData = {
      name: this.editEvtTitleInpt.value,
      date: this.editEvtDateInpt.value,
      location: this.editEvtLocationInpt.value,
      description: this.editEvtDescriptionInpt.value
    };
    const newEvtData = Object.assign({}, this.props.eventEditingModalData, updatedData);
    this.props.updEvt(newEvtData);
    this.props.toggleModal();
  }

  onSubmit(values) {
    console.log(`
      *****************************
      EDIT EVENT MODAL FORM DATA SUBMITTED
      *****************************
    `);
    console.log(values);
  }

  componentWillReceiveProps(nextProps) {
    const self = this,
          editEvtDate = nextProps.eventEditingModalData.date;

    if (this.props.modalStatus !== nextProps.modalStatus && nextProps.modalStatus) {
      setTimeout(function() {
        self.editEvtDateInpt.valueAsDate = new Date(editEvtDate);
      }, 200);
    }
  }

  prepopulateTags(evtTags) {
    return evtTags.map((tag, index) =>
      <EventTag
        key={ `EventTag_${tag}_${index}` }
        tagTitle={ tag }
        index={ index } />
    );
  }

  onKeyPress(key) {
    const tagDelimiters = [' ', ',', 'Enter'];
    // return tagDelimiters.includes(key);
  }

  reduxFormField(field) {
    const labelAttr = `edit-evt-${field.label}-inpt`;

    return (
      <Field
        key={ `evt-modal-${field.label}-inpt` }
        label={ labelAttr }
        name={ field.label }
        other={{ ...field }}
        component={ this.renderField } />
    );
  }

  renderField({ input, label: id, name, other, meta: { touched, error }}) {
    name = other.name;
    console.log('\n\nFIELD State:', 'input:', input, 'id:', id, 'name:', name, 'other:', other);

    const FormElementMap = new Map([
      ['input', (attrs) => <input { ...attrs } />],
      ['textarea', (attrs) => <textarea { ...attrs }></textarea>],
      ['select', (attrs) => <select { ...attrs }></select>]
    ]);

    const { icon, label, class: className, type, title, placeholder } = other;
    const attrs = { id, className, name, type, title, placeholder };
    const cn = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={ `input-gr ${other.otherAttrs.isRequiredField ? 'required-field' : ''}` }>
        <span className="input-gr-addon">
          <i className="material-icons">{ icon }</i>
        </span>
        <label htmlFor={ id }>Label</label>
        <input
          { ...attrs }
          { ...input } />
        <span className="validation-msg">{ touched ? error : '' }</span>
      </div>
    );

    // return (
      // <div className="input-gr">
        // <span className="input-gr-addon">
          // <i className="material-icons">{ field.}
        // </span>
        // <label htmlFor={ field.label } />
        // <input
          // id={ field.label }
          // className="form-cont"
          // type="text"
          // // ref={ (editEvtTitleInpt) => { this.editEvtTitleInpt = editEvtTitleInpt; }}
          // title="Add a name for this event"
          // // defaultValue={ evtName }
          // { ...field.input }
          // required />
      // </div>
    // );
  }

  render() {
    // const {
    //   name: evtName,
    //   date: evtDate,
    //   location: evtLocation,
    //   description: evtDescription,
    //   type: evtTags
    // } = this.props.eventEditingModalData;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    console.log('\n\nEVENT EDITING MODAL DATA:', this.props.eventEditingModalData);

    // if (!this.props.initialValues.title) {
    //   return (<div>Loading...</div>);
    // }

    return (
      <Modal
        contentLabel={ `EditEventModal_` }
        isOpen={ this.props.modalStatus }
        style={ EventEditingModalStyles }
        ref={ (editEventModal) => { this.editEventModal = editEventModal; }}>
        <div className="modal-wrapper">
          <i
            className="close-btn"
            onClick={ this.props.toggleModal }>
            &times;
          </i>
          <form
            id="edit-event-form"
            action="/api/photos"
            method="post"
            encType="multipart/form-data"
            onSubmit={ handleSubmit(::this.onSubmit) }>
            <fieldset>
              { this.reduxFormField(this.inputFields[0]) }
            </fieldset>

            <fieldset>
              {[
                this.reduxFormField(this.inputFields[1]),
                this.reduxFormField(this.inputFields[2])
              ]}

              <GMap
                lat={ -34.397 }
                lng={ 150.644 } />
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-list-alt" />
                </span>
                <label htmlFor="edit-evt-description-inpt" />
                <textarea
                  { ...this.fieldsetProps }
                  ref={ (editEvtDescriptionInpt) => { this.editEvtDescriptionInpt = editEvtDescriptionInpt; }}
                  // defaultValue={ evtDescription }
                  />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-tags" />
                </span>
                <label htmlFor="edit-evt-tags-inpt" />
                <select
                  id="tags-input-box"
                  className="form-cont"
                  contentEditable={ true }
                  ref={ (editEvtTagsInpt) => { this.editEvtTagsInpt = editEvtTagsInpt; }}>
                </select>
              </div>
              <output>{ /* ::this.prepopulateTags([evtTags]) */ 'Just me' }</output>
            </fieldset>

            <FileUploadAPI
              evt={ this.props.modalData }
              submittable={ true }
              uploadToCloudinary={ this.props.uploadToCloudinary }
              cloudinaryImageStore={ this.props.cloudinaryImageStore }
              setNeww={ this.props.setNeww } />

            <fieldset>
              <button
                className="form-btn"
                type="submit"
                name="updateEvtBtn"
                // onClick={ ::this.updateSingleEvent }
                disabled={ pristine || submitting }>
                Update Event
              </button>
              <button
                className="form-btn"
                type="button"
                name="resetFieldsBtn"
                onClick={ reset }>
                Clear Form
              </button>
            </fieldset>
          </form>
        </div>
      </Modal>
    );
  }
};


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
