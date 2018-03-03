import React                                   from 'react';
import { addNewBlock, Block, ImageSideButton } from 'medium-draft';
import 'isomorphic-fetch';

export default class CustomImageSideButtonPure extends ImageSideButton {
  static displayName = 'MediumDraftCustomImageSidebarButton';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onFileSelection = ::this.onFileSelection;
  }

  /**
   * We will only check for first file and also whether it is an image or not.
   */
  onChange(evt) {
    const file = evt.target.files[0];

    if (file.type.indexOf('image/') === 0) {
      // This is a post request to server endpoint with image as `image`
      const formData = new FormData();
      formData.append('image', file);
      fetch('/your-server-endpoint', {
        body: formData,
        method: 'POST',
      }).then((response) => {
        if (response.status === 200) {
          // Assuming server responds with
          // `{ "url": "http://example-cdn.com/image.jpg"}`
          return response.json().then((data) => {
            if (data.url) {
              this.props.setEditorState(addNewBlock(
                this.props.getEditorState(),
                Block.IMAGE, {
                  src: data.url,
                },
              ));
            }
          });
        }
      });
    }

    return this.props.close();
  }

  onFileSelection(files) {
    return files.forEach((file) => this.onChange(file));
  }
}
