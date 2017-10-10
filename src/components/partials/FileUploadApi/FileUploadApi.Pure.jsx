import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import FileUploadGlyph from '../../../constants/svg/FileUploadGlyph_SVG';
import ImageReel from '../ImageReel';

export default class FileUploadApiPure extends Component {
  static displayName = 'FileUploadAPI';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    cloudinaryImageStore: PropTypes.objectOf(PropTypes.object),
    submittable: PropTypes.bool,
    uploadToCloudinary: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cloudinaryImageStore: {},
    submittable: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      imgReelShift: 0,
      uploads: {},
    };

    this.createNewThumbnail = ::this.createNewThumbnail;
    this.handleDragEnter = ::this.handleDragEnter;
    this.handleDragOver = ::this.handleDragOver;
    this.handleFileSelect = ::this.handleFileSelect;
    this.loadSelectedImages = ::this.loadSelectedImages;
    this.readInThumbnailWithBckgImage = ::this.readInThumbnailWithBckgImage;
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
    (function(imageFile) {
      const Reader = new FileReader();
      Reader.onload = (evt) => {
        const uploads = Object.assign({}, self.state.uploads, { [imageFile.name]: evt.target.result });
        self.setState({ uploads });
        self.createNewThumbnail(evt.target.result, output);
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

  // 
  triggerCloudinaryUpload(evt) {
    evt.preventDefault();
    const { evt: sourceEvt, uploadToCloudinary } = this.props;

    const files = Array.from(this.fileUploadsInpt.files);
    // files.forEach((file, index, fileList) => );
    for (var i = 0; i < files.length; i++) {
      uploadToCloudinary(sourceEvt, files[i], this.state.uploads[files[i].name]);
    }
  }

  // 
  chooseNewBckgPhoto = (evt) => {};

  // 
  createNewThumbnail(img, output) {
    const self = this;
    let $newThumb = $('<div />').addClass('thumb').css({ backgroundImage: `url(${img})` }),
        $thumbWrapper = $('<div />').addClass('thumb-wrapper'),
        $chooseBckgGlyph = $('<i class="material-icons bckg-select-opt">panorama_fish_eye</i>'),
        $removeThumbGlyph = $('<i class="glyphicon glyphicon-remove-circle" />');

    $thumbWrapper.append($chooseBckgGlyph, $removeThumbGlyph, $newThumb);
    output.insertBefore($thumbWrapper[0], null);

    $('.bckg-select-opt').click(function() {
      $(this)
        .closest('output')
        .find('.selected-bckg')
        .removeClass('selected-bckg')
        .text('panorama_fish_eye');

      $(this)
        .text($(this).hasClass('selected-bckg') ? 'panorama_fish_eye' : 'check_circle')
        .toggleClass('selected-bckg');

      let $bckgImgUrl = $(this)
        .siblings('.thumb')
        .css('backgroundImage')
        .replace(/^url\(["|'](.+)["|']\)$/i, '$1');
      // ie.log('$bckgImgUrl:', $bckgImgUrl);
      self.props.setNeww($bckgImgUrl);
    });

    $('.glyphicon').click(function() {
      $(this).closest('.thumb-wrapper').remove();
    });
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
        type="submit"
        name="submit-btn"
        onClick={this.triggerCloudinaryUpload}
      />
    );
  }

  render() {
    const {
      classNames,
      cloudinaryImageStore,
      evt: { uuid },
      submittable,
    } = this.props;

    const submissionInput = (!!submittable ? this.renderSubmitButton() : null);
    const ci = (cloudinaryImageStore.hasOwnProperty(uuid) && cloudinaryImageStore[uuid].images.length
      ? cloudinaryImageStore[uuid].images
      : null);

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
              type="file"
              onChange={this.loadSelectedImages}
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
              images={ci}
              uuid={uuid}
            />

            {submissionInput}
          </div>
        </div>
      </fieldset>
    );
  }
}
