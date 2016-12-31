'use strict';
import React from 'react';
import Modal from 'react-modal';

import EventEditingModalStyles from '../constants/json/EventEditingModalStyles.json';
import ImageThumbnail from './ImageThumbnail';


export default class EditEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.constructCurrentFormattedDate = this.constructCurrentFormattedDate.bind(this);
    this.loadSelectedImages = this.loadSelectedImages.bind(this);
    this.readInNewImage = this.readInNewImage.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  constructCurrentFormattedDate() {
    const DATE = new Date();
    return `${DATE.getUTCMonth() + 1}/${DATE.getUTCDate()}/${DATE.getUTCFullYear()}`;
  }

  loadSelectedImages(evt) {
    const [Images, OutputBin] = [evt.target.files, this.refs.fileContainer];

    // Loop through selected images and render as thumbnails:
    for (var i = 0, currImg; currImg = Images[i]; i++) {
      // Secondary check to ensure only allowable MIME types pass through for image processing:
      if (!/image(\/.*)?/.test(currImg.type)) { continue; }
      this.readInNewImage(currImg, OutputBin);
    }
  }

  readInNewImage(file, output) {
    (function(file) {
      let Reader = new FileReader();
      Reader.onload = (e) => {
        // let newImage = document.createElement('IMG');
        // newImage.setAttribute('src', Reader.result);
        let newImage = (<ImageThumbnail src={ Reader.result } title={ escape(file.name) } />);
        output.insertBefore(newImage, null);
      };

      // Read in the image file as a data URL:
      Reader.readAsDataURL(file);
    })(file);
  }

  renderForm() {
    let form = (
      <form>
        <fieldset>
          <label htmlFor="title-inpt">Title</label>
          <input
            id="title-inpt"
            type="text"
            defaultValue={ this.props.modalData ? this.props.modalData.name : 'Working Title' }
            required />
        </fieldset>

        <fieldset>
          <label htmlFor="date-inpt">Date</label>
          <input
            id="date-inpt"
            type="date"
            defaultValue={ this.props.modalData ? this.props.modalData.date : this.constructCurrentFormattedDate() } />

          <label htmlFor="location-inpt">Location</label>
          <input
            id="location-inpt"
            type="text"
            defaultValue={ this.props.modalData ? this.props.modalData.location : 'Oklahoma City, OK' } />
        </fieldset>

        <fieldset>
          <label htmlFor="description-inpt">Description</label>
          <textarea
            id="description-inpt"
            placeholder="Event description">
            { this.props.modalData ? this.props.modalData.description : 'Event description' }
          </textarea>
        </fieldset>

        <fieldset id="editing-modal-pics">
          <div className="dropzone"></div>
          <input
            id="file-upload-btn"
            type="file"
            accept="image/*"
            onChange={ this.loadSelectedImages }
            multiple />
          <output
            htmlFor="file-upload-btn"
            ref="fileContainer">
          </output>
        </fieldset>
      </form>
    );
    return form;
  }

  componentDidMount() {
    // this.renderForm();
  }

  render() {
    return (
      <Modal
        ref="eventModal"
        isOpen={ this.props.modalStatus }
        style={ EventEditingModalStyles }>
        <i
          className="close-btn"
          onClick={ this.props.toggleModal }>
          &times;
        </i>
        { this.renderForm() }
      </Modal>
    );
  }
};


// TimelineEvent Component props:   evt, evtName, evtLocation, evtAlign, evtDescription, evtNote,
//        SEED_DATA Input Fields:      , name   ,    location,         , description   , type, date
