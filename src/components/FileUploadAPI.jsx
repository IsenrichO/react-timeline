'use strict';
import React, { Component } from 'react';

import FileUploadGlyph from '../constants/svg/FileUploadGlyph_SVG';


export default class FileUploadAPI extends Component {
  constructor(props) {
    super(props);
    this.loadSelectedImages = this.loadSelectedImages.bind(this);
    this.readInThumbnailWithImageElement = this.readInThumbnailWithImageElement.bind(this);
    this.readInThumbnailWithBckgImage = this.readInThumbnailWithBckgImage.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  // Loops through selection of files and asynchronously executes callback on each:
  loadSelectedImages(evt, cb) {
    const [Images, OutputBin] = [evt.target.files, this.fileContainer];

    // Loop through selected images and render as thumbnails:
    for (var i = 0, currImg; currImg = Images[i]; i++) {
      // Secondary check to ensure only allowable MIME types pass through for image processing:
      if (!/image(\/.*)?/.test(currImg.type)) { continue; }
      this.readInThumbnailWithBckgImage(currImg, i, OutputBin);
    }
  }

  // Appends a `.thumb` <div> with nested a <img> element to specified output target:
  readInThumbnailWithImageElement(file, index, output) {
    (function(file) {
      let Reader = new FileReader();
      Reader.onload = (e) => {
        let newThumb = document.createElement('DIV');
        newThumb.className = 'thumb';
        newThumb.innerHTML = (
          `<img \
            src='${e.target.result}'\
            alt='ThumbnailImage_${index}:\t${escape(file.name)}'\
            title='${file.name.replace(/['"]/gm, '')}' />`
        );
        output.insertBefore(newThumb, null);
      };
      // Read in the image file as a data URL:
      Reader.readAsDataURL(file);
    })(file);
  }

  // Appends a `.thumb` <div> with `background-image` property-value pair to output target:
  readInThumbnailWithBckgImage(file, index, output) {
    (function(file) {
      let Reader = new FileReader();
      Reader.onload = (evt) => {
        let $newThumb = $('<div />').addClass('thumb'),
            $thumbWrapper = $('<div />').addClass('thumb-wrapper'),
            $removeThumbGlyph = $('<i class="glyphicon glyphicon-remove-circle" />');
        $newThumb.css({ backgroundImage: `url(${evt.target.result})` });
        $thumbWrapper.append($removeThumbGlyph, $newThumb);
        output.insertBefore($thumbWrapper[0], null);
        $('.glyphicon').click(evt => {
          $(evt.currentTarget).parent('.thumb-wrapper').remove();
        });
      };
      // Read in the image file as a data URL:
      Reader.readAsDataURL(file);
    })(file)
  }

  // Event handler for the HTML5 drag-n-drop API implementation:
  handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    const [Images, OutputBin] = [evt.dataTransfer.files, this.fileContainer];
    console.log('FILES:', Images);

    // Loop over `Images`, a FileList of constituent File objects:
    for (var i = 0, currImg; currImg = Images[i]; i++) {
      // Secondary check to ensure only allowable MIME types pass through for image processing:
      if (!/image(\/.*)?/.test(currImg.type)) { continue; }
      this.readInThumbnailWithBckgImage(currImg, i, OutputBin);
    }
  }

  // Event handler for the dragEnter event; terminates the bubbling phase:
  handleDragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  // Event handler for the dragOver event; terminates the bubbling phase:
  handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }

  render() {
    const ImgLoader = this.readInThumbnailWithBckgImage;
    return (
      <fieldset className="dz-wrapper">
        <div
          className="dz"
          onDrop={ this.handleFileSelect }
          onDragEnter={ this.handleDragEnter }
          onDragOver={ this.handleDragOver }>
          <div className="dz-box">
            <label htmlFor="file-upload-btn">
              <FileUploadGlyph />
            </label>
            <input
              id="file-upload-btn"
              className="file-upload-btn"
              type="file"
              name="files[]"
              accept="image/*"
              onChange={ this.loadSelectedImages }
              multiple />
            <div className="d-full">
              {[
                <label
                  key={ `FileUploadSVG_Glyph` }
                  htmlFor="file-upload-btn">
                  <strong>Choose files</strong>
                </label>,
                ' or drop them here'
              ]}
            </div>
          </div>
        </div>
        <output
          htmlFor="file-upload-btn"
          ref={ (fileContainer) => { this.fileContainer = fileContainer; }}>
        </output>
      </fieldset>
    );
  }
};
