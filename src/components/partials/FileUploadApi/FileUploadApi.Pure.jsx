import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import { flow, get, has, isEmpty, mapKeys, merge, pick } from 'lodash';
import update from 'immutability-helper';
import FileUploadGlyph from '../../../constants/svg/FileUploadGlyph_SVG';
import ImageReel from '../ImageReel';

export default class FileUploadApiPure extends Component {
  static displayName = 'FileUploadAPI';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    cloudinaryImageStore: PropTypes.objectOf(PropTypes.object),
    evt: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    }).isRequired,
    submittable: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
    uploadToCloudinary: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cloudinaryImageStore: {},
    submittable: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      imgReelShift: 0,
      uploads: {},
    };

    // this.createNewThumbnail = ::this.createNewThumbnail;
    this.handleDragEnter = ::this.handleDragEnter;
    this.handleDragOver = ::this.handleDragOver;
    this.handleFileSelect = ::this.handleFileSelect;
    this.loadSelectedImages = ::this.loadSelectedImages;
    this.readInThumbnailWithBckgImage = ::this.readInThumbnailWithBckgImage;
    this.registerNewThumbnailToState = ::this.registerNewThumbnailToState;
    this.triggerCloudinaryUpload = ::this.triggerCloudinaryUpload;
  }

  // componentDidMount() {
  //   const { cloudinaryImageStore: imgStore, evt: { uuid } } = this.props,
  //         uploadedImages = (imgStore.hasOwnProperty(uuid) && !!imgStore[uuid].images.length
  //           ? imgStore[uuid].images.map(img => img.secure_url)
  //           : null);

  //   if (!!uploadedImages) {
  //     this.renderUploadedCloudinaryImages(uploadedImages);
  //   }
  // }

  componentDidMount() {
    return this.initializeState();
  }

  getValidatedCloudinaryImages() {
    const {
      evt: { uuid },
      cloudinaryImageStore,
    } = this.props;

    return has(cloudinaryImageStore, uuid) && !isEmpty(get(cloudinaryImageStore, `${uuid}.images`, []))
      ? get(cloudinaryImageStore, `${uuid}.images`, [])
      : null;
  }

  initializeState() {
    return this.setState(update(this.state, {
      images: { $set: this.getValidatedCloudinaryImages() },
    }));
  }

  registerNewThumbnailToState(img, imageMetaData) {
    const newThumb = {
      isHeroImg: false,
      resource_type: 'image',
      secure_url: img,
      ...imageMetaData,
    };

    return this.setState(update(this.state, {
      images: { $push: [newThumb] },
    }));
  }

  preprocessImageDataObject = ({
    lastModified,
    lastModifiedDate,
    name,
    size,
    type: mimeType,
    webkitRelativePath,
  }, index) => {
    const baseImageUploadDefaults = {
      mimeType: 'image/png',
      name: `ImageUploadNo_${index}`,
      size: 10000,
    };

    return flow([
      (imageData = {}) => mapKeys(imageData, (value, key) => key.toLowerCase() === 'type' ? 'mimeType' : key),
      (transformedData = {}) => merge(baseImageUploadDefaults, transformedData),
    ])({ lastModified, lastModifiedDate, mimeType, name, size, webkitRelativePath });
  };

  // Appends a `.thumb` <div> with nested a <img> element to specified output target:
  readInThumbnailWithImageElement = (file, index, output) => {
    (function(imageFile) {
      const Reader = new FileReader();
      Reader.onload = (evt) => {
        const newThumb = document.createElement('DIV');
        newThumb.className = 'thumb';
        newThumb.innerHTML = (`
          <img \
            src='${evt.target.result}'\
            alt='ThumbnailImage_${index}:\t${escape(imageFile.name)}'\
            title='${imageFile.name.replace(/['"]/gm, '')}'\
          />`
        );
        output.insertBefore(newThumb, null);
      };
      // Read in the image file as a data URL:
      Reader.readAsDataURL(imageFile);
    })(file);
  };

  // Appends a `.thumb` <div> with `background-image` property-value pair to output target:
  readInThumbnailWithBckgImage(file, index, output) {
    const self = this;

    return (function(imageFile) {
      const Reader = new FileReader();
      Reader.onload = (evt) => {
        const uploads = Object.assign({}, self.state.uploads, { [imageFile.name]: evt.target.result });
        self.setState(update(self.state, {
          uploads: { $set: uploads },
        }));

        self.registerNewThumbnailToState(
          evt.target.result,
          self.preprocessImageDataObject(imageFile, index),
        );
      };

      // Read in the image file as a data URL:
      Reader.readAsDataURL(imageFile);
    })(file);
  }


  // Event handler for the HTML5 drag-n-drop API implementation:
  handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    const [Images, OutputBin] = [evt.dataTransfer.files, this.fileContainer];

    // Loop over `Images`, a FileList of constituent File objects:
    for (var i = 0, currImg; currImg = Images[i]; i++) {
      // Secondary check to ensure only allowable MIME types pass through for image processing:
      if (!(/image(\/.*)?/).test(currImg.type)) continue;
      this.readInThumbnailWithBckgImage(currImg, i, OutputBin);
    }
  }

  // Event handler for the dragEnter event; terminates the bubbling phase:
  handleDragEnter = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
  };

  // Event handler for the dragOver event; terminates the bubbling phase:
  handleDragOver = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';

    return null;
  };

  triggerCloudinaryUpload(evt) {
    evt.preventDefault();
    const { evt: sourceEvt, uploadToCloudinary } = this.props;

    const files = Array.from(this.fileUploadsInpt.files);
    // files.forEach((file, index, fileList) => );
    for (var i = 0; i < files.length; i++) {
      uploadToCloudinary(sourceEvt, files[i], this.state.uploads[files[i].name]);
    }
  }

  // Loops through selection of files and asynchronously executes callback on each:
  loadSelectedImages(evt, cb) {
    const [Images, OutputBin] = [evt.target.files, this.fileContainer];

    // Loop through selected images and render as thumbnails:
    for (let i = 0, currImg; currImg = Images[i]; i++) {
      // Secondary check to ensure only allowable MIME types pass through for image processing:
      if (!(/image(\/.*)?/).test(currImg.type)) continue;
      this.readInThumbnailWithBckgImage(currImg, i, OutputBin);
    }
  }

  // 
  renderUploadedCloudinaryImages(imgUrls = null) {
    if (!imgUrls || !imgUrls.length) return null;

    const [Images, OutputBin] = [imgUrls, this.fileContainer];
    for (let i = 0, currImg; currImg = Images[i]; i++) {
      this.createNewThumbnail(currImg, OutputBin);
    }
  }

  // 
  renderSubmitButton() {
    return (
      <input
        ref={(submitUploadsBtn) => { this.submitUploadsBtn = submitUploadsBtn; }}
        name="submit-btn"
        onClick={this.triggerCloudinaryUpload}
        type="submit"
      />
    );
  }

  render() {
    const {
      classNames,
      evt: { uuid },
      submittable,
    } = this.props;
    const { images: collectedImages } = this.state;

    return (
      <fieldset className={classNames.formFieldset}>
        <div
          className={classNames.dropzone}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDrop={this.handleFileSelect}
        >
          <div className={classNames.dropzoneBox}>
            <label htmlFor="file-upload-btn">
              <FileUploadGlyph />
            </label>
            <input
              ref={(fileUploadsInpt) => { this.fileUploadsInpt = fileUploadsInpt; }}
              multiple
              accept="image/*"
              className={classNames.fileUploadButton}
              id="file-upload-btn"
              name="files[]"
              onChange={this.loadSelectedImages}
              type="file"
            />
            <div className={classNames.directiveText}>
              {[
                <label
                  key="FileUploadSVG_Glyph"
                  htmlFor="file-upload-btn"
                >
                  <strong>Pick your files</strong>
                </label>,
                ' or drop them here',
              ]}
            </div>

            <ImageReel
              {...this.props}
              images={collectedImages}
              uuid={uuid}
            />

            {!!submittable && this.renderSubmitButton()}
          </div>
        </div>
      </fieldset>
    );
  }
}
