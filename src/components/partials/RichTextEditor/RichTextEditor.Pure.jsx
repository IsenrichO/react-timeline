// @flow
import React, { Component }          from 'react';
import PropTypes                     from 'prop-types';
import { ClassNamesPropType }        from 'aesthetic';
import update                        from 'immutability-helper';
import { debounce }                  from 'lodash';
import { createEditorState, Editor } from 'medium-draft';
import mediumDraftExporter           from 'medium-draft/lib/exporter';

// Import custom sidebar button components:
import { CustomImageSideButton }     from './EditorSideButtons';

// Import the associated styles for `medium-draft`:
import 'medium-draft/lib/index.css';

type Props = {
  richText?: string,
  theme?: string,
};

export default class RichTextEditorPure extends Component<Props> {
  static displayName = 'RichTextEditor';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    richText: PropTypes.string,
    theme: PropTypes.string,
    updateRichText: PropTypes.func.isRequired,
  };

  static defaultProps = {
    richText: '',
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const { richText } = props;

    this.state = {
      editorState: createEditorState(richText), // For non-empty content
    };

    this.delayedUpdateTimer = null;
    this.delayStoreUpdate = debounce(::this.delayStoreUpdate, 2500, {
      leading: false,
      trailing: true,
    });
    this.handleRichTextEdits = ::this.handleRichTextEdits;

    this.sideButtons = [{
      component: CustomImageSideButton,
      title: 'Image',
    }];
  }

  componentDidMount() {
    return this.richTextEditorEl.focus();
  }

  componentWillUnmount() {
    return clearTimeout(this.delayedUpdateTimer);
  }

  delayStoreUpdate() {
    const { updateRichText } = this.props;
    const { editorState } = this.state;

    // this.delayedUpdateTimer = setTimeout(() => {
    // }, 2500);
    const renderedHtml = mediumDraftExporter(editorState.getCurrentContent());
    console.log({ renderedHtml });
    updateRichText(renderedHtml);
  }

  handleRichTextEdits(newEditorState) {
    return this.setState(update(this.state, {
      editorState: { $set: newEditorState },
    }), this.delayStoreUpdate);
  }

  render() {
    const { classNames } = this.props;
    const { editorState } = this.state;

    return (
      <section className={classNames.richTextEditorContainer}>
        <Editor
          ref={(richTextEditorEl) => { this.richTextEditorEl = richTextEditorEl; }}
          editorState={editorState}
          onChange={this.handleRichTextEdits}
        />
      </section>
    );
  }
}
