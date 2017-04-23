'use strict';
import React, { Component } from 'react';
import FileUploadGlyph from '../constants/svg/FileUploadGlyph_SVG';
import ImageReel from './ImageReel';


export default class FileUploadAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: {},
      imgReelShift: 0
    };
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
    const self = this;
    (function(file) {
      let Reader = new FileReader();
      Reader.onload = (evt) => {
        const uploads = Object.assign({}, self.state.uploads, { [file.name]: evt.target.result });
        self.setState({ uploads });
        self.createNewThumbnail(evt.target.result, output);
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

    // Loop over `Images`, a FileList of constituent File objects:
    for (var i = 0, currImg; currImg = Images[i]; i++) {
      // Secondary check to ensure only allowable MIME types pass through for image processing:
      if (!/image(\/.*)?/.test(currImg.type)) { continue; }
      ::this.readInThumbnailWithBckgImage(currImg, i, OutputBin);
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

  // 
  triggerCloudinaryUpload(evt) {
    evt.preventDefault();
    console.log('\n\n\nFILES:', this.fileUploadsInpt.files);
    const [sourceEvt, files] = [this.props.evt, Array.from(this.fileUploadsInpt.files)];
    // files.forEach((file, index, fileList) => );
    for (var i = 0; i < files.length; i++) {
      this.props.uploadToCloudinary(sourceEvt, files[i], this.state.uploads[files[i].name]);
    }
  }

  // 
  chooseNewBckgPhoto(evt) {
  }

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
      console.log('$bckgImgUrl:', $bckgImgUrl);
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
      if (!/image(\/.*)?/.test(currImg.type)) { continue; }
      ::this.readInThumbnailWithBckgImage(currImg, i, OutputBin);
    }
  }

  // // Allows for smooth lateral panning of the image reel when enough images are present
  // //  as to overflow outside the containing element's side boundaries:
  // panReel() {
  //   const self = this;
  //   $('[class^="pan-"]').on('click', function(evt) {
  //     evt.stopPropagation();
  //     const $evtClass = $(evt.currentTarget).attr('class'),
  //           $wrapper = $(this).siblings('.img-reel'),
  //           $wrapperWidth = $wrapper.get(0).scrollWidth,
  //           $thumbs = $wrapper.find('.thumb-wrapper'),
  //           $sign = ($evtClass === 'pan-left' ? -1 : 1);


  //     console.log('REEL STATE PRE:', self.state);
  //     if (!self.state.lateralShift) {
  //       self.setState({ lateralShift: ($wrapperWidth / $thumbs.length) });
  //     }
  //     let lateralShift = (self.state.hasOwnProperty('lateralShift') && self.state.lateralShift);
  //     console.log('LATERAL SHIFT:', lateralShift);
      
  //     if (
  //       (self.state.imgReelShift == 0) && ($evtClass === 'pan-right')
  //       || ($(evt.currentTarget).siblings('.img-reel').width() + self.state.imgReelShift <= self.state.lateralShift) && ($evtClass === 'pan-left')
  //     ) return;
      
  //     self.setState({ imgReelShift: self.state.imgReelShift + ($sign * lateralShift) });
  //     console.log('REEL STATE POST:', self.state);

  //     $thumbs.css({
  //       transform: `translateX(${self.state.imgReelShift}px)`
  //     });
  //   });
  // }

  // 
  renderUploadedCloudinaryImages(imgUrls = null) {
    if (!imgUrls || !imgUrls.length) return null;

    const [Images, OutputBin] = [imgUrls, this.fileContainer];
    for (let i = 0, currImg; currImg = Images[i]; i++) {
      ::this.createNewThumbnail(currImg, OutputBin);
    }
  }

  // 
  renderSubmitButton() {
    return (
      <input
        type="submit"
        name="submit-btn"
        ref={ (submitUploadsBtn) => { this.submitUploadsBtn = submitUploadsBtn; }}
        onClick={ ::this.triggerCloudinaryUpload } />
    );
  }

  render() {
    console.log('FILE UPLOAD API props:', this.props);
    const submissionInput = (this.props.submittable ? this.renderSubmitButton() : null);
    const { cloudinaryImageStore, evt: { uuid }} = this.props;
    const ci = (cloudinaryImageStore.hasOwnProperty(uuid) && cloudinaryImageStore[uuid].images.length
      ? cloudinaryImageStore[uuid].images
      : null);

    return (
      <fieldset className="dz-wrapper">
        <div
          className="dz"
          onDrop={ ::this.handleFileSelect }
          onDragEnter={ ::this.handleDragEnter }
          onDragOver={ ::this.handleDragOver }>
          <div className="dz-box">
            <label htmlFor="file-upload-btn">
              <FileUploadGlyph />
            </label>
            <input
              id="file-upload-btn"
              className="file-upload-btn"
              type="file"
              name="files[]"
              ref={ (fileUploadsInpt) => { this.fileUploadsInpt = fileUploadsInpt; }}
              accept="image/*"
              onChange={ ::this.loadSelectedImages }
              multiple />
            <div className="d-full">
              {[
                <label
                  key={ `FileUploadSVG_Glyph` }
                  htmlFor="file-upload-btn">
                  <strong>Pick your files</strong>
                </label>,
                ' or drop them here'
              ]}
            </div>

            <ImageReel
              { ...this.props }
              cloudinaryImageStore={ ci }
              uuid={ uuid } />

            { submissionInput }
          </div>
        </div>
      </fieldset>
    );
  }
};



// <output
//   htmlFor="file-upload-btn"
//   // ref={ (fileContainer) => { this.fileContainer = fileContainer; }}
//   name="photos">
//   <div
//     className="pan-left"
//     onClick={ () => ::this.panReel() }>
//     <i className="material-icons">chevron_left</i>
//   </div>
//   <div
//     className="img-reel"
//     ref={ (fileContainer) => { this.fileContainer = fileContainer; }} />
//   <div
//     className="pan-right"
//     onClick={ () => ::this.panReel() }>
//     <i className="material-icons">chevron_right</i>
//   </div>
// </output>
