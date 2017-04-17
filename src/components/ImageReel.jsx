'use strict';
import React, { Component } from 'react';


export default class ImageReel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cims: [],
      uploads: {},
      imgReelShift: 0
    };
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT', this.props);
    console.log('\n\n\n\n\n\nGET MY IMAGES:', this.props.getMyImgs(this.props.uuid));
    
    const { cloudinaryImageStore: imgStore } = this.props;
    if (!!imgStore && Array.isArray(imgStore)) ::this._loadImagesToState(this.props);
    ::this.injectImages(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('COMPONENT WILL RECEIVE PROPS', nextProps);
    if (this.props.cloudinaryImageStore !== nextProps.cloudinaryImageStore) {
      ::this._loadImagesToState(nextProps);
      ::this.injectImages(nextProps);      
    }
  }

  _loadImagesToState(props) {
    this.setState({ cims: props.cloudinaryImageStore });
  }

  injectImages(props) {
    const { cloudinaryImageStore: imgStore, uuid } = props,
          { fileContainer: outputBin } = this;

    $(outputBin).empty();
    if (!imgStore || !imgStore.length || !uuid) {
      $(outputBin).addClass('no-content');
      return null;
    } else if ($(outputBin).hasClass('no-content')) {
      $(outputBin).removeClass('no-content');
    }

    const imgUrls = imgStore.map(img => img.secure_url);
    ::this.renderUploadedCloudinaryImages(imgUrls);
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

  // 
  renderUploadedCloudinaryImages(imgUrls = null) {
    if (!imgUrls || !imgUrls.length) return null;

    const [Images, OutputBin] = [imgUrls, this.fileContainer];
    for (let i = 0, currImg; currImg = Images[i]; i++) {
      ::this.createNewThumbnail(currImg, OutputBin);
    }
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

  // Allows for smooth lateral panning of the image reel when enough images are present
  //  as to overflow outside the containing element's side boundaries:
  panReel() {
    const self = this;
    $('[class^="pan-"]').on('click', function(evt) {
      evt.stopPropagation();
      const $evtClass = $(evt.currentTarget).attr('class'),
            $wrapper = $(this).siblings('.img-reel'),
            $wrapperWidth = $wrapper.get(0).scrollWidth,
            $thumbs = $wrapper.find('.thumb-wrapper'),
            $sign = ($evtClass === 'pan-left' ? -1 : 1);


      console.log('REEL STATE PRE:', self.state);
      if (!self.state.lateralShift) {
        self.setState({ lateralShift: ($wrapperWidth / $thumbs.length) });
      }
      let lateralShift = (self.state.hasOwnProperty('lateralShift') && self.state.lateralShift);
      console.log('LATERAL SHIFT:', lateralShift);
      
      if (
        (self.state.imgReelShift == 0) && ($evtClass === 'pan-right')
        || ($(evt.currentTarget).siblings('.img-reel').width() + self.state.imgReelShift <= self.state.lateralShift) && ($evtClass === 'pan-left')
      ) return;
      
      self.setState({ imgReelShift: self.state.imgReelShift + ($sign * lateralShift) });
      console.log('REEL STATE POST:', self.state);

      $thumbs.css({
        transform: `translateX(${self.state.imgReelShift}px)`
      });
    });
  }

  render() {
    return (
      <output
        htmlFor="file-upload-btn"
        // ref={ (fileContainer) => { this.fileContainer = fileContainer; }}
        name="photos">
        <div
          className="pan-left"
          onClick={ () => ::this.panReel() }>
          <i className="material-icons">chevron_left</i>
        </div>
        <div
          className="img-reel"
          data-fallback="No photos to display"
          ref={ (fileContainer) => { this.fileContainer = fileContainer; }} />
        <div
          className="pan-right"
          onClick={ () => ::this.panReel() }>
          <i className="material-icons">chevron_right</i>
        </div>
      </output>
    );
  }
};
